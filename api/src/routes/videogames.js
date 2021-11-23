const router = require('express').Router();
const axios = require('axios');
//Me traigo las tablas de la base de datos
const { Videogames, Genre, videogame_genre } = require('../db.js');

//ENDPOINTS
/* - GET https://api.rawg.io/api/games
- GET https://api.rawg.io/api/games?search={game}
- GET https://api.rawg.io/api/genres
https://api.rawg.io/api/genres?key=b44e674330244a80bdca90e54415cb8b
- GET https://api.rawg.io/api/games/{id}
https://api.rawg.io/api/games/witcher?key=b44e674330244a80bdca90e54415cb8b */

//GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY

//Funciones controladoras  
//Traigo info de la api
const getvideogames = async () => {
  const apiUrl = await axios.get('https://api.rawg.io/api/games?API_KEY');
  const infoApi = await apiUrl.data.map(element => {
    return {
      name: element.name,
      id: element.id,
      background_image: element.background_image,
      genres: element.genres.map(genres => genres), //para que me devuelva todos los generos 
      released: element.released,
      rating: element.rating,
      description: element.description,
      platforms: element.platforms.map(platform => platform),
    };
  });
  return infoApi;  
};

//Traigo info de la  DB
const getDbinfo = async () => {
  return await Videogames.findAll({
    include: {
      model: Genre, 
      attributes: ['name'],
    }
  })
};

//Uno la informacion 
const getAllVideogames = async () => {
  const infoApi = await getvideogames(); //Si no la ejecuto no devuelve nada
  const dbInfo = await getDbinfo();
  //Ahora concateno ambas funciones
  const infoTotal = infoApi.concat(dbInfo);
  return infoTotal; 
}

//Me traigo 

/* - [ ] __GET /videogames__:
- Obtener un listado de los videojuegos
- Debe devolver solo los datos necesarios para la ruta principal*/






/*- [ ] __GET /videogames?name="..."__:
- Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
- Si no existe ningún videojuego mostrar un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
- Obtener el detalle de un videojuego en particular
- Debe traer solo los datos pedidos en la ruta de detalle de videojuego
- Incluir los géneros asociados.
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos
 */

module.exports = router;