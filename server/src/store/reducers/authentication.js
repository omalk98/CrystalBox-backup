const initialState = {
  isAuthenticated: false,
  token: null,
  roles: []
};

const AuthenticationReducer = (state = initialState, action = null) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        token: action.payload.token,
        roles: action.payload.roles
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default AuthenticationReducer;
