const router = require('express').Router();
const axios = require('axios');
//Me traigo las tablas de la base de datos
const { Videogames, Genre, videogame_genre } = require('../db.js');

/* - [ ] __GET /videogames__:
- Obtener un listado de los videojuegos
- Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
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