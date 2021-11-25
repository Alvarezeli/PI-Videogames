require('dotenv').config();
const { Router } = require ('express');
const axios = require('axios');
const router = Router();
const { API_KEY } = process.env;

//Me traigo las tablas de la base de datos
const { Videogame, Genre, videogame_genre } = require('../db.js');

/* - [ ] __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 */
router.get('/genres', (req, res) => {
  
})

module.exports = router;