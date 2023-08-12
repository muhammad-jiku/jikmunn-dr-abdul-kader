import {
  ADMIN_ALL_SERVICES_FAILURE,
  ADMIN_ALL_SERVICES_REQUEST,
  ADMIN_ALL_SERVICES_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_NEW_SERVICE_FAILURE,
  ADMIN_NEW_SERVICE_REQUEST,
  ADMIN_NEW_SERVICE_RESET,
  ADMIN_NEW_SERVICE_SUCCESS,
  ADMIN_SERVICE_DETAILS_REQUEST,
  ADMIN_SERVICE_DETAILS_SUCCESS,
  ADMIN_SERVICE_DETAILS_FAILURE,
} from '../constants/serviceConstant';

export const newServiceReducer = (state = { service: {} }, action) => {
  switch (action.type) {
    case ADMIN_NEW_SERVICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_NEW_SERVICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        service: action.payload.data,
      };
    case ADMIN_NEW_SERVICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_NEW_SERVICE_RESET:
      return {
        ...state,
        success: false,
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

export const allAdminServicesReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        loading: false,
        services: action.payload,
      };

    case ADMIN_ALL_SERVICES_FAILURE:
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

export const adminServiceDetailsReducer = (state = { service: {} }, action) => {
  switch (action.type) {
    case ADMIN_SERVICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ADMIN_SERVICE_DETAILS_SUCCESS:
      return {
        loading: false,
        service: action.payload,
      };
    case ADMIN_SERVICE_DETAILS_FAILURE:
      return {
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
