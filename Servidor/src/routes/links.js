const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req,res)=>{
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req,res) => {
    const { NombreAlumno, Contraseña, Curso } = req.body;
    const newLink = {
        NombreAlumno,
        Contraseña,
        Curso,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    console.log(newLink);
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list', {links});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

module.exports = router;
