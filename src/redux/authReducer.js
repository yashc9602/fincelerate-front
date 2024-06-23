const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token },
});

export const logout = () => ({
  type: LOGOUT,
});

export default authReducer;
