import axios from "axios";
import { GET_VIDEOGAMES, GET_GENRES, FILTER_VIDEOGAMES_BY_GENRES, FILTER_CREATED_OR_EXISTED, ORDER_BY_RATING,  GET_NAME_VIDEOGAMES, GET_DETAIL } from "../Constants/ActionTypes";


// export function getVideogames(){
//   return async function(dispatch){
//     var json = axios.get('http://localhost:3001/videogames')
//     return dispatch({
//       type: GET_VIDEOGAMES,
//       payload: json.data 
//     })
//   }
// }


export function getVideogames(){
  return async function(dispatch){
    await axios.get('http://localhost:3001/videogames')
    .then(json => {
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: json.data
      })
    })
  }
}

export function getGenres(){
  return async function(dispatch){
    await axios.get('http://localhost:3001/genres')
    .then( data => {
      return dispatch({
        type: GET_GENRES,
        payload: data.data
      })
    })
  }
}

export function postVideogames(payload){
  return async function(dispatch){
    const resApi = await axios.post('http://localhost:3001/videogame', payload);
    //console.log('Soy el console de resApi', resApi)
    return resApi;
  }
}

// --> ACCIONES DE LOS FILTROS <-- //

//Esta filtra por generos los videojuegos 
//payload === value que nos va a llegar 
export function filterVideogamesByGenres(payload){
  return {
    type: FILTER_VIDEOGAMES_BY_GENRES,
    payload : payload //son los genre que tengo --->//Adventure
  }
}

export function filterCreatedOrExisted(payload){
  return {
    type: FILTER_CREATED_OR_EXISTED,
    payload
  }
}

export function orderByAscDesc(payload){
  return{
    type: ORDER_BY_RATING,
    payload: payload
  }
}


// --> ACCION BARRA DE BUSQUEDA <-- //
export function getNameVideogames(name) {
  //console.log('soy el console.log de getNameVideogames', name)
  return async function (dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/videogames?name=' + name)
      return dispatch ({
        type: GET_NAME_VIDEOGAMES,
        payload: json.data
      })
    } catch (error) {
      alert(error)
    }
  }
};

// --> ACCION PARA LOS DETAILS <-- //
export function getDetail(id){
  return async function(dispatch) {
    try {
      var json = await axios.get('http://localhost:3001/videogame/' + id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data
      })
    } catch(error) {
        console.log(error)
    }
  }
}

/*TODO  LO QUE ES LOGICA TRATA DE NO HACERLO EN LAS ACCIONES, TRATA DE DEJAR LA MENOR 
LOGICA ACA  Y SIEMPRE HACERLA EN EL REDUCER Y EN EL COMPONENTE */
