import {UPDATEFAVBOOKS, SETBOOKREAD} from '../actions/types';

const INITIAL_STATE = {
  favBooksIDs: null,
  currentReadData: {
    book: {},
    lastPage: 1,
  }
};

const book = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATEFAVBOOKS:
      let favBooksIDs = action.payload;
      return {
        ...state,
        favBooksIDs: favBooksIDs,
      };
    case SETBOOKREAD:
      return {
        ...state,
        currentReadData: action.payload,
      };
    default:
      return state;
  }
};

export default book;
