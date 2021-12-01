import { GET_VIDEOGAMES, FILTER_VIDEOGAMES_BY_GENRES } from "../actions/index";

const initialState = {
  videogames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
      };

    case FILTER_VIDEOGAMES_BY_GENRES:
      const allVideogames = state.videogames
      const genresFiltered = action.payload === 'All' ? allVideogames : allVideogames.filter(game => game.genres === action.payload)
      return {
        ...state,
        videogames: genresFiltered
      };

    default:
      return state;
  }
}

export default rootReducer;
