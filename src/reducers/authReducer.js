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
  UPDATEUSERIMG,
  LOGINLOADING,
} from '../actions/types';

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
        userID: action.payload.id,
        loginLoading: false,
      };
    case LOGINLOADING:
      return {
        ...state,
        loginLoading: action.payload,
      };
    case AUTOLOGIN:
      return {
        ...state,
        userID: action.payload,
        loginLoading: false,
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
        loginLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: '',
        userData: {},
        userID: '',
      };
    case UPDATEUSERIMG:
      return {
        ...state,
        userData: {...state.userData, photo: action.payload},
      };
    default:
      return state;
  }
};

export default auth;
