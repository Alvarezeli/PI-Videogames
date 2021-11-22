const router = require('express').Router();
const axios = require('axios');
//Me traigo las tablas de la base de datos
const { Videogames, Genre, videogame_genre } = require('../db.js');

/* - [ ] __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 */

module.exports = router;