import {SETGENRES} from '../actions/types';

const INITIAL_STATE = {
  genres: [],
};

const genre = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETGENRES:
      console.log('Set Genres : ', action.payload);
      return {
        ...state,
        genres: action.payload ? action.payload : state.genres,
      };

    default:
      return state;
  }
};

export default genre;
