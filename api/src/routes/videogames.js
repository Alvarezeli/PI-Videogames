require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
//Me traigo las tablas de la base de datos
const { Videogame, Genre, videogame_genre } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

////////////// OPERADORES OP /////////////
// [Op.like]: '%hat',                       // LIKE '%hat'
//[Op.substring]: 'hat',                   // LIKE '%hat%'

//////////// END POINTS ////////////////
//GET https://api.rawg.io/api/games
//GET https://api.rawg.io/api/games?search={game}

/// ---> GET /videogames <--- ///

router.get("/videogames", async (req, res) => {
  try {
    // --> LLEGA POR QUERY <-- //
    if (req.query.name) {
      try {
        //console.log(req.query.name)
      //Consultamos en la base de datos
      let datadb = await Videogame.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.name}%`
          },
        },
        limit: 15,
      });
      //Consultamos en la api
      //Va a contar los registros que contengan el name que me pasan por query
      let count = await Videogame.count({
        where: {
          name: {
            [Op.iLike]: `%${req.query.name}%`, 
          },
        },
      });
      //console.log(count)
      let rest = 15 - count;
      let dataApi = await axios.get(
        `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}&page_size=${rest}`
      );
      const { results } = dataApi.data;
      //Mapeamos los datos de result para que devuelva los datos que realmente necesitamos
      let arrDataApi = results.map((el) => {
        return {
          name: el.name,
          id: el.id,
          background_image: el.background_image,
          genres: el.genres.map((genre) => ({name: genre.name})), //para que me devuelva todos los generos
          released: el.released,
          rating: el.rating,
          description: el.description,
          platforms: el.platforms.map((plat) => plat.platform.name),
        };
      });

      //Union de los datos
      let dataAll = [...datadb, ...arrDataApi];
      return dataAll.length && res.json(dataAll)
      } catch (error) {
        res.sendStatus(404);
      }  
    }
    // ---> SI NO LLEGA POR QUERY <--- //
    //consulte a la base de datos
    let allDataDb = await Videogame.findAll({
      include: {model : Genre, attributes: ["name"], through: {attributes : []}},
      limit: 100,
    });

    let dataDataAll = [...allDataDb];

    //Consulta a la api
    let count = await Videogame.count({
      limit: 100,
    });
    // Se piden de la BD - los 100 variables de la API / 20 juegos que trae la api en cada vuelta
    let rest = Math.ceil((100 - count) / 20); // 5
    let contador = 1;
    while (contador <= rest) {
      const responseApi = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${contador}`
      );
      const { results } = responseApi.data;
      const infoApi = results.map((el) => {
        return {
          name: el.name,
          id: el.id,
          background_image: el.background_image,
          genres: el.genres.map((genre) => ({name: genre.name})), 
          released: el.released,
          rating: el.rating,
          description: el.description,
          platforms: el.platforms.map((plat) => plat.platform.name),
        };
      });
      dataDataAll = [...dataDataAll, ...infoApi]
      contador++;
    }

    res.json(dataDataAll.slice(0, 100));
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

/* - [ ] __GET /videogame/{idVideogame}__:
- GET https://api.rawg.io/api/games/{id}
 */

router.get("/videogame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //const id = req.params.id;
    //console.log('Llego por params:', typeof(id))
    // Busca en la base de datos si tiene ese id
    if (id) {
      const gameDb = await Videogame.findByPk(id, {
        include : [{
          model : Genre, 
          through : {attributes : []}
        }] 
      });
      if (gameDb) {
        return res.json(gameDb);
      } else {
        // //Busca en la api el id
        const searchApi = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );
        if (searchApi) {
          return res.json({
            name: searchApi.data.name,
            id: searchApi.data.id,
            background_image: searchApi.data.background_image,
            genres: searchApi.data.genres.map((genre) => ({name: genre.name})), //para que me devuelva todos los generos
            released: searchApi.data.released,
            rating: searchApi.data.rating,
            description: searchApi.data.description,
            platforms: searchApi.data.platforms.map(
              (plat) => plat.platform.name
            ),
          });
        }
      }
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

/* - [ ] __POST /videogame__: */
router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    genres,
    platforms,
    createdInDb,
    background_image,
  } = req.body;

  try {
    const [newVideogame, videogameCreated] = await Videogame.findOrCreate({
      where: { name: name },
      defaults: {
        name: name,
        description,
        released,
        rating,
        platforms,
        background_image,
        createdInDb,
      }
    });
    //console.log(genres)
    genres.map( async genre => {
     const [newGenre, genreBooleano] = await Genre.findOrCreate({
        where: { name : genre},
        defaults: { name : genre}
      })
      newVideogame.addGenre(newGenre)
    })

    videogameCreated
      ? res.send("El videojuego fue creado con exito")
      : res.send("El videojuego ya ha sido creado");
  } catch (error) {
    console.log(error);
    res.status(404).send("Uuups, los duendes otra vez");
  }
});

module.exports = router;
