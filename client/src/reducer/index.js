import {
  GET_VIDEOGAMES,
  FILTER_VIDEOGAMES_BY_GENRES,
  GET_GENRES,
  FILTER_CREATED_OR_EXISTED,
  ORDER_BY_RATING,
} from "../Constants/ActionTypes";

const initialState = {
  videogames: [],
  genres: [],
  allVideogames: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allVideogames: action.payload,
      };

    case FILTER_VIDEOGAMES_BY_GENRES:
      const allVideogames = state.allVideogames; // [{action}, {adventure}]
      const gamesFilter =
        action.payload === "All"
          ? allVideogames
          : allVideogames.filter((game) =>
              game.genres.find((genre) => genre.name === action.payload)
            );
      //const gamesFilter = action.payload === 'All' ? allVideogames : allVideogames.filter(game => game.genres.includes(action.payload))
      return {
        ...state,
        videogames: gamesFilter,
      };

    case GET_GENRES:
      return {
        ...state, //Trae una copia de los valores del estado
        genres: action.payload,
      };

    case FILTER_CREATED_OR_EXISTED:
      const allVideogames2 = state.allVideogames;
      const createdOrExisted =
        action.payload === "created"
          ? allVideogames2.filter((game) => game.createdInDb)
          : allVideogames2.filter((game) => !game.createdInDb);
      return {
        ...state,
        videogames:
          action.payload === "all" ? state.allVideogames : createdOrExisted,
      };

    case ORDER_BY_RATING:
      let sortVideogames;
      switch (action.payload) {
        case "asc":
          sortVideogames = state.videogames.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: sortVideogames,
          };
        case "desc":
          sortVideogames = state.videogames.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: sortVideogames,
          };
        case "low_ToBest":
          sortVideogames = state.videogames.sort(function (a, b) {
            if (a.rating > b.rating) {
              return 1;
            }
            if (b.rating > a.rating) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: sortVideogames,
          };
        case "best_ToLow":
          sortVideogames = state.videogames.sort(function (a, b) {
            if (a.rating > b.rating) {
              return -1;
            }
            if (b.rating > a.rating) {
              return 1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: sortVideogames,
          };
        default:
          return state;
      }

    default:
      return state;
  }
}

export default rootReducer;
