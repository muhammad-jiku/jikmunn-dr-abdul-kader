import {
  ALL_USERS_FAILURE,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  SIGNIN_AUTH_FAILURE,
  SIGNIN_AUTH_REQUEST,
  SIGNIN_AUTH_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNUP_AUTH_FAILURE,
  SIGNUP_AUTH_REQUEST,
  SIGNUP_AUTH_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/authConstant';

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SIGNUP_AUTH_REQUEST:
    case SIGNIN_AUTH_REQUEST:
    case GOOGLE_AUTH_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case SIGNOUT_REQUEST:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case SIGNUP_AUTH_SUCCESS:
    case SIGNIN_AUTH_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case LOAD_USER_SUCCESS:
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
    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
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

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAILURE:
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data,
      };

    case ALL_USERS_FAILURE:
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
