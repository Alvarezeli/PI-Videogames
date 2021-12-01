import axios from "axios";

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const FILTER_VIDEOGAMES_BY_GENRES = 'FILTER_VIDEOGAMES_BY_GENRES';


//acciones que vamos a realizar en el home.
export function getVideogames() {
  return async function (dispatch) {
      //aca es donde sucede la conexion entre el front y el back
      //El axios por default hace el get 
      var json = await axios.get('http://localhost:3001/videogames');
      console.log(json.data)
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data})  
  };
};

//Esta filtra por generos los videojuegos 
//payload === value que nos va a llegar 
export function filterVideogamesByGenres(payload){
  return {
    type: FILTER_VIDEOGAMES_BY_GENRES,
    payload
  }
}

/*TODO  LO QUE ES LOGICA TRATA DE NO HACERLO EN LAS ACCIONES, TRATA DE DEJAR LA MENOR 
LOGICA ACA  Y SIEMPRE HACERLA EN EL REDUCER Y EN EL COMPONENTE */
