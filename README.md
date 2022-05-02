# Individual Project - Henry Videogames
[![Netlify Status](https://api.netlify.com/api/v1/badges/172b7dbd-b96d-402c-99c6-461d4555fb5a/deploy-status)](https://app.netlify.com/sites/videogamesapp-eli/deploys)

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.

## Proyecto

El proyecto cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

El contenido de `client` fue creado usando: Create React App.

## Funciones

- Páginado
- Filtrado por género y creados en base de datos o traidos de la api.
- Ordenamiento Ascendente - Descendente.
- Detalle del videojuego elegido.
- Creación de un videojuego.
- Búsqueda de un videojuego. 

## Vistas del proyecto

<p>
      <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/home.png' height="45%" width="45%"/></a>
      <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/paginado.png' height="45%" width="45%"/></a>
      <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/detalle.png' height="45%" width="45%"/></a>
      <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/Captura%20de%20pantalla%202022-01-31%20192542.png' height="45%" width="45%"/></a>

</p>

### ¡Es responsive!

<p>
  <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/responsive.png' height="45%" width="45%"/></a>
   <a><img src='https://github.com/Alvarezeli/PI-Videogames/blob/main/client/src/assets/readme/responsive%20detail.png' height="45%" width="45%"/></a>
</p>
