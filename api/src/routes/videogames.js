require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
//Me traigo las tablas de la base de datos
const { Videogame, Genre, videogame_genre } = require("../db.js");
const { Op } = require("sequelize");
const router = Router();

//ENDPOINTS
/* - 

- GET https://api.rawg.io/api/games/{id}
https://api.rawg.io/api/games/witcher?key=b44e674330244a80bdca90e54415cb8b */


/* - [ ] __GET /videogames__:
- Obtener un listado de los videojuegos
- Debe devolver solo los datos necesarios para la ruta principal*/

//////////////OPERADORES OP /////////////
// [Op.like]: '%hat',                       // LIKE '%hat'
//[Op.substring]: 'hat',                   // LIKE '%hat%'

//////////// END POINTS ////////////////
//GET https://api.rawg.io/api/games
//GET https://api.rawg.io/api/games?search={game}


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
            [Op.iLike]: `%${req.query.name}%`, //iLike es case insensitive
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

- GET https://api.rawg.io/api/games/{id}

https://api.rawg.io/api/games/5505?key=b44e674330244a80bdca90e54415cb8

 */

router.get("/videogame/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //const id = req.params.id;
    //console.log('Llego por params:', typeof(id))
   
    //Busca en la api el id
    let searchApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    //res.json(searchApi.data.genres)
    if (searchApi.data.id) {
      //console.log('lo estoy intentando')
        res.json( {
          name: searchApi.data.name,
          id: searchApi.data.id,
          background_image: searchApi.data.background_image,
          genres: searchApi.data.genres.map((genre) => (genre.name)), //para que me devuelva todos los generos
          released: searchApi.data.released,
          rating: searchApi.data.rating,
          description: searchApi.data.description,
          platforms: searchApi.data.platforms.map((plat) => (plat.platform.name)),
     });
    };

    // Busca en la base de datos si tiene ese id
    let searchDb = await Videogame.findByPk(id);
    return searchDb.length ? res.json(searchDb) : res.status(404).send('El millito millines anduvo por aqui');
   
  } catch (error) {
    console.log(error)
    res.send(error)
  }
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
    createdInDb,
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
        createdInDb
      },
    });
    
    let genreDb = await Genre.findAll({
      where: { name : genres }
    });
    //Hacemos la vinculacion 
    newVideogame.addGenre(genreDb);

    (videogameCreated) ? res.send('El videojuego fue creado con exito') : res.send('El videojuego ya ha sido creado')
  } catch (error) {
    console.log(error);
    res.status(404).send("Uuups, los duendes otra vez");
  }
});

module.exports = router;
