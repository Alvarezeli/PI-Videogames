require('dotenv').config();
const { Router } = require ('express');
const axios = require('axios');
const { API_KEY } = process.env;
//Me traigo las tablas de la base de datos
const { Videogame, Genre, videogame_genre } = require('../db.js');
const router = Router();




////////END POINT///////
// GET https://api.rawg.io/api/genres

/* - [ ] __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
 */
router.get('/genres', async (req, res) => {
  try {
    //Agregamos a la base de datos
  let allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
  const { results } = allGenres.data;
  results.map(async element => {
    await Genre.findOrCreate({
      where : {
        name : element.name
      },
      defaults : {
        name : element.name
      }
    })
  })
   //Nos traemos lo que hay en la tabla Genre
   const allGenreDb = await Genre.findAll({
    attributes: ['id', 'name']
   })
  res.json(allGenreDb)
  } catch (error) {
    // console.log(error)
    res.status(404).send(error);
  }
}) 

module.exports = router;