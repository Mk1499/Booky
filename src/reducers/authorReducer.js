import {SETAUTHORS, UPDATEFAVAUTHORS} from '../actions/types';

const INITIAL_STATE = {
  authors: [],
  favAuthorsIDs:[]
};

const author = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETAUTHORS:
      // console.log('Set Authors : ', action.payload);
      return {
        ...state,
        authors: action.payload ? action.payload : state.authors,
      };
    case UPDATEFAVAUTHORS:
      return {
        ...state,
        favAuthorsIDs:action.payload
      }
    default:
      return state;
  }
};

export default author;
