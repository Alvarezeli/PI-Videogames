import { GET_VIDEOGAMES, FILTER_VIDEOGAMES_BY_GENRES, GET_GENRES } from "../Constants/ActionTypes";


const initialState = {
  videogames: [],
  genres: [],
  videogamesFilter: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

    case FILTER_VIDEOGAMES_BY_GENRES:
      const allVideogames = [...state.videogames]
      const gamesFilter = allVideogames.filter(game => game.genres.includes(action.payload))
      return{
          ...state,
          videogamesFilter : gamesFilter,
      } 

    case GET_GENRES:
      return {
        ...state, //Trae una copia de los valores del estado 
        genres: action.payload, 
        
      };

    default:
      return state;
  }
}

export default rootReducer;
