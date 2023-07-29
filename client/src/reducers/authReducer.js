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

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SIGNUP_AUTH_REQUEST:
    case SIGNIN_AUTH_REQUEST:
    case GOOGLE_AUTH_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case SIGNUP_AUTH_SUCCESS:
    case SIGNIN_AUTH_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGNUP_AUTH_FAILURE:
    case SIGNIN_AUTH_FAILURE:
    case GOOGLE_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGNOUT_SUCCESS:
      return {
        loading: false,
        user: null,
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
