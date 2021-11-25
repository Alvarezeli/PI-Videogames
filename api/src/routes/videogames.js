require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
//Me traigo las tablas de la base de datos
const { Videogame, Genre, videogame_genre } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

//ENDPOINTS
/* - GET https://api.rawg.io/api/games
- GET https://api.rawg.io/api/games?search={game}
- GET https://api.rawg.io/api/genres
https://api.rawg.io/api/genres?key=b44e674330244a80bdca90e54415cb8b
- GET https://api.rawg.io/api/games/{id}
https://api.rawg.io/api/games/witcher?key=b44e674330244a80bdca90e54415cb8b */

//GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY


/* - [ ] __GET /videogames__:
- Obtener un listado de los videojuegos
- Debe devolver solo los datos necesarios para la ruta principal*/

//////////////OPERADORES OP /////////////
// [Op.like]: '%hat',                       // LIKE '%hat'
//[Op.substring]: 'hat',                   // LIKE '%hat%'
router.get("/videogames", async (req, res) => {
  try {
    //Si me llega por query
    if (req.query.name) {
      //console.log(req.query.name)
      //Consultamos en la base de datos
      let datadb = await Videogame.findAll({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
        limit: 15,
      });
      //Consultamos en la api
      //Va a contar los registros que contengan el name que me pasan por query
      let count = await Videogame.count({
        where: {
          name: {
            [Op.like]: `%${req.query.name}%`,
          },
        },
      });
      //console.log(count)
      let rest = 15 - count;
      let dataApi = await axios.get(
        `https://api.rawg.io/api/games?search=${req.query.name}&key=${API_KEY}&page_size=${rest}`
      );
      const { results } = dataApi.data
      //Mapeamos los datos de result para que devuelva los datos que realmente necesitamos 
      let arrDataApi = results.map((el) => {
        return {
          name: el.name,
          id: el.id,
          background_image: el.background_image,
          genres: el.genres.map((genre) => (genre.name)), //para que me devuelva todos los generos
          released: el.released,
          rating: el.rating,
          description: el.description,
          platforms: el.platforms.map((plat) => (plat.platform.name)),
        };
      });
  
      //Union de los datos
      let dataAll = [...datadb, ...arrDataApi];
      return dataAll.length ? res.json(dataAll) : res.status(404).send('Que más quieres de mi');   
    }

    //Si no llega por query
    //consulte a la base de datos
    let allDataDb = await Videogame.findAll({
      limit: 100
    })

    //Consulta a la api
    let count = await Videogame.count({
      limit: 100
    });
    let rest = 100 - count;
    const responseApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${rest}`);
    const { results } = responseApi.data;
    const infoApi = results.map((el) => {
      return {
        name: el.name,
        id: el.id,
        background_image: el.background_image,
        genres: el.genres.map((genre) => (genre.name)), //para que me devuelva todos los generos
        released: el.released,
        rating: el.rating,
        description: el.description,
        platforms: el.platforms.map((plat) => (plat.platform.name)),
      };
    });

    let dataDataAll = [...allDataDb, ...infoApi];
    res.json(dataDataAll);
  } catch (error) {
    console.log(error)
    res.send(error);
  }
});



/* - [ ] __GET /videogame/{idVideogame}__:
- Obtener el detalle de un videojuego en particular
- Debe traer solo los datos pedidos en la ruta de detalle de videojuego
- Incluir los géneros asociados.
 */
router.get("/videogame:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
});

/* - [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos
 */
router.post("/videogame", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    genres,
    platforms,
    background_image,
  } = req.body;

  try {
    const [newVideogame, videogameCreated] = await Videogame.findOrCreate({
      where: { name: name.toLowerCase() },
      defaults: {
        name: name.toLowerCase(),
        description,
        released,
        rating,
        platforms,
        background_image,
      },
    });
    //Mapea sobre los elementos de genre
    genres.map(async (element) => {
      const [newGenres, genresCreated] = await Genre.findOrCreate({
        where: { nombre: genres },
        defaults: {
          nombre: genres,
        },
      });
      //Vinculacion: Va a crear un nuevo videojuego con los nuevos generos asignados
      newVideogame.addGenre(newGenres);
    })(videogameCreated)
      ? res.send(`El videojuego ${name} fue exitosamente creado`)
      : res.send(`El videogame ${name} ya ha sido creado`);
  } catch (error) {
    console.log(error);
    res.send("Uuups, los duendes otra vez");
  }
});

module.exports = router;
