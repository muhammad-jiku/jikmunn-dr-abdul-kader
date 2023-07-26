import {
  CLEAR_ERRORS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  SIGNIN_AUTH_FAILURE,
  SIGNIN_AUTH_REQUEST,
  SIGNIN_AUTH_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNUP_AUTH_FAILURE,
  SIGNUP_AUTH_REQUEST,
  SIGNUP_AUTH_SUCCESS,
} from '../constants/authConstant';

const initialState = {
  isAuthenticated: false,
  loading: false,
  token: localStorage.getItem('token'),
  // user: {},
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_AUTH_SUCCESS:
    case SIGNIN_AUTH_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload,
        // user: action.payload,
        error: null,
      };
    case SIGNUP_AUTH_FAILURE:
    case SIGNIN_AUTH_FAILURE:
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        // user: null,
        error: action.payload,
      };
    case SIGNUP_AUTH_REQUEST:
    case SIGNIN_AUTH_REQUEST:
    case GOOGLE_AUTH_REQUEST:
    case SIGNOUT_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case SIGNOUT_SUCCESS:
      return {
        loading: false,
        token: null,
        // user: null,
        isAuthenticated: false,
      };
    case SIGNOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
