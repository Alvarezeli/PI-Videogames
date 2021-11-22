const { Router } = require('express');
//Me traigo las tablas de la base de datos
const { Videogames, Genre, videogame_genre } = require('../db.js');
// Importar todos los routers;
const videogames = require('./videogames');
const genres = require('./genres');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(videogames);
router.use(genres);

module.exports = router;
