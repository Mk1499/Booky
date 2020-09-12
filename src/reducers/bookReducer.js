import {SETUSERDATA, SETBOOKREAD} from '../actions/types';

const INITIAL_STATE = {
  currentReadData: {
      book:{},
      lastPage:1
  },
};

const book = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETBOOKREAD:
      return {
        ...state,
        currentReadData: action.payload,
      };
    default:
      return INITIAL_STATE;
  }
};

export default book;
