USE database_links;

-- USERS TABLE
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL 
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users
     MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    NombreAlumno  VARCHAR(150) NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    Curso VARCHAR(30) NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    constraint fk_user foreign key (user_id) REFERENCES users(id)
);

ALTER TABLE links
	ADD PRIMARY KEY (id);
 ALTER TABLE links
	MODIFY id INT(11) NOT NULL auto_increment, auto_increment = 2;
describe links;    
    

-- LINKS TABLE
CREATE TABLE links(
    id INT(11) NOT NULL,
    NombreAlumno  VARCHAR(150) NOT NULL,
    NotaUno VARCHAR(5) NOT NULL,
    NotaDos VARCHAR(5) NOT NULL,
    NotaTres VARCHAR(5) NOT NULL,
    Promedio VARCHAR(5),
    Curso VARCHAR(30),
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    constraint fk_user foreign key (user_id) REFERENCES users(id)
);

ALTER TABLE links
	ADD PRIMARY KEY (id);
 ALTER TABLE links
	MODIFY id INT(11) NOT NULL auto_increment, auto_increment = 2;
describe links;    