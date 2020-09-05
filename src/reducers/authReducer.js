const INITIAL_STATE = {
  log: '',
  userID: '',
  loginLoading: false,
  userData: {},
  signUpLoading: false,
  loading: false,
};
import {
  LOGIN,
  LOGOUT,
  AUTOLOGIN,
  REGISTERATION,
  SETUSERDATA,
} from '../actions/types';

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
        userID: action.payload.id,
      };
    case AUTOLOGIN:
      return {
        ...state,
        userID: action.payload,
      };
    case SETUSERDATA:
      return {
        ...state,
        userData: action.payload,
      };
    case REGISTERATION:
      return {
        ...state,
        userData: action.payload,
        userID: action.payload.id,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: '',
        userData: {},
        userID: '',
      };
    default:
      return state;
  }
};

export default auth;
