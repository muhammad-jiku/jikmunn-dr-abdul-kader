import {
  ADMIN_ALL_SERVICES_FAILURE,
  ADMIN_ALL_SERVICES_REQUEST,
  ADMIN_ALL_SERVICES_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_NEW_SERVICE_FAILURE,
  ADMIN_NEW_SERVICE_REQUEST,
  ADMIN_NEW_SERVICE_RESET,
  ADMIN_NEW_SERVICE_SUCCESS,
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
