import {SETAUTHORS} from '../actions/types';

const INITIAL_STATE = {
  authors: [],
};

const author = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETAUTHORS:
      console.log('Set Authors : ', action.payload);
      return {
        ...state,
        authors: action.payload ? action.payload : state.authors,
      };
    default:
      return state;
  }
};

export default author;
