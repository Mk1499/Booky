import {SETGENRES} from '../actions/types';

const intialState = {
  genres: [],
};

const genre = (state = intialState, action) => {
  switch (action.type) {
    case SETGENRES:
      console.log('Set Genres : ', action.payload);
      return {
        ...state,
        genres: action.payload,
      };

    default:
      return state;
  }
};

export default genre;
