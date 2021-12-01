import axios from "axios";
import { GET_VIDEOGAMES, GET_GENRES, FILTER_VIDEOGAMES_BY_GENRES } from "../Constants/ActionTypes";

//acciones que vamos a realizar en el home.
export function getVideogames() {
  return async function (dispatch) {
      //aca es donde sucede la conexion entre el front y el back
      //El axios por default hace el get 
      var json = await axios.get('http://localhost:3001/videogames');
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data})  
  };
};

export function getGenres(){
  return async function (dispatch){
    var json = await axios.get('http://localhost:3001/genres');
    return dispatch({
      type: GET_GENRES,
      payload: json.data
    })
  }
}

// function pruebaThen(){
//   return async function(dispatch) {
//     await axios.get('http://localhost:3001/genres')
//     .then(data => {
//       return dispatch({
//         type: GET_GENRES,
//         payload: data.data
//       })
//     })
//   }
// }

//Esta filtra por generos los videojuegos 
//payload === value que nos va a llegar 
export function filterVideogamesByGenres(genre){
  return {
    type: FILTER_VIDEOGAMES_BY_GENRES,
    payload : genre //Adventure
  }
}

/*TODO  LO QUE ES LOGICA TRATA DE NO HACERLO EN LAS ACCIONES, TRATA DE DEJAR LA MENOR 
LOGICA ACA  Y SIEMPRE HACERLA EN EL REDUCER Y EN EL COMPONENTE */
