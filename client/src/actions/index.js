import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GENRES,
  FILTER_VIDEOGAMES_BY_GENRES,
  FILTER_CREATED_OR_EXISTED,
  ORDER_BY_RATING,
  GET_NAME_VIDEOGAMES,
  GET_DETAIL,
} from "../Constants/ActionTypes";

export function getVideogames() {
  return function (dispatch) {
    axios
      .get("/videogames")
      .then((data) => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getGenres() {
  return function (dispatch) {
    axios
      .get("/genres")
      .then((response) => {
        dispatch({
          type: GET_GENRES,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function postVideogames(payload) {
  return async function (dispatch) {
    try {
      const resApi = await axios.post(
        "/videogame",
        payload
      );
    //  console.log("Soy el console de resApi", resApi);
      return resApi;
    } catch (error) {
      console.log(error.resApi);
    }
  };
}

// --> ACCIONES DE LOS FILTROS <-- //
//payload === value que nos va a llegar
export function filterVideogamesByGenres(payload) {
  return {
    type: FILTER_VIDEOGAMES_BY_GENRES,
    payload: payload, //son los genre que tengo --->//Adventure
  };
}

export function filterCreatedOrExisted(payload) {
  return {
    type: FILTER_CREATED_OR_EXISTED,
    payload,
  };
}

export function orderByAscDesc(payload) {
  return {
    type: ORDER_BY_RATING,
    payload: payload,
  };
}

// --> ACCION BARRA DE BUSQUEDA <-- //
export function getNameVideogames(name) {
  //console.log('soy el console.log de getNameVideogames', name)
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "/videogames?name=" + name
      );
      //console.log('soy barra de busqueda',json)
      return dispatch({
        type: GET_NAME_VIDEOGAMES,
        payload: json.data,
      });
    } catch (error) {
      alert('El juego no pudo ser encontrado', error);
    }
  };
}

// --> ACCION PARA LOS DETAILS <-- //
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/videogame/" + id);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// --> ASYNC AWAIT <-- //
// export function getVideogames() {
//   return async function (dispatch) {
//     try {
//       var json = await axios.get("http://localhost:3001/videogames");
//       return dispatch({
//         type: GET_VIDEOGAMES,
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// // --> .THEN CON FETCH <--
// export function getVideogames(){
//   return function(dispatch){
//     fetch.get("http://localhost:3001/videogames")
//     .then( response => response.json())
//     .then( json => {
//       dispatch({
//         type: GET_VIDEOGAMES,
//         payload: json
//       })
//     })
//    .catch((err) => {
//      console.log(err)
//    })
//   }
// }

/*TODO  LO QUE ES LOGICA TRATA DE NO HACERLO EN LAS ACCIONES, TRATA DE DEJAR LA MENOR 
LOGICA ACA  Y SIEMPRE HACERLA EN EL REDUCER Y EN EL COMPONENTE */
