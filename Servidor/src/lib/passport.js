const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const rows = await pool.query('SELECT * FROM users WHERE fullname = ?', [username]);
    if(rows.length > 0)
        {
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if(validPassword)
            {
                done(null, user);
            }else{
                done(null, false);
                console.log('Contraseña Incorrecta')
            }
        }else{
            return done(null, false, console.log('El usuario no existe'));
        }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'fullname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const{ fullname } = req.body;
    const newUser = {
      password,
      fullname

    };
    newUser.password = await helpers.encryptPassword(password);

    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where id = ?', [id]);
    done(null, rows[0]);
});