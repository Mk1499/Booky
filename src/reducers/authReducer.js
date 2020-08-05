const INITIAL_STATE = {
  log: '',
  userToken: '',
  loginLoading: false,
  userInfo: {},
  signUpLoading: false,
  loading: false,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userToken: action.data.token,
      };
    default:
      return state;
  }
};

export default auth;
