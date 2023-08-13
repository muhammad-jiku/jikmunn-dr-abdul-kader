import {
  ADMIN_ALL_PRICES_FAILURE,
  ADMIN_ALL_PRICES_REQUEST,
  ADMIN_ALL_PRICES_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_NEW_PRICE_FAILURE,
  ADMIN_NEW_PRICE_REQUEST,
  ADMIN_NEW_PRICE_RESET,
  ADMIN_NEW_PRICE_SUCCESS,
  ADMIN_PRICE_DETAILS_SUCCESS,
  ADMIN_PRICE_DETAILS_FAILURE,
  ADMIN_PRICE_DETAILS_REQUEST,
  ADMIN_UPDATE_PRICE_DETAILS_REQUEST,
  ADMIN_UPDATE_PRICE_DETAILS_SUCCESS,
  ADMIN_UPDATE_PRICE_DETAILS_FAILURE,
  ADMIN_UPDATE_PRICE_DETAILS_RESET,
} from '../constants/priceConstant';

export const adminNewPriceReducer = (state = { price: {} }, action) => {
  switch (action.type) {
    case ADMIN_NEW_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_NEW_PRICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        price: action.payload.data,
      };
    case ADMIN_NEW_PRICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_NEW_PRICE_RESET:
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

export const allAdminPricesReducer = (state = { prices: [] }, action) => {
  switch (action.type) {
    case ADMIN_ALL_PRICES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ALL_PRICES_SUCCESS:
      return {
        ...state,
        loading: false,
        prices: action.payload,
      };

    case ADMIN_ALL_PRICES_FAILURE:
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

export const adminPriceDetailsReducer = (state = { price: {} }, action) => {
  switch (action.type) {
    case ADMIN_PRICE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case ADMIN_PRICE_DETAILS_SUCCESS:
      return {
        loading: false,
        price: action.payload,
      };
    case ADMIN_PRICE_DETAILS_FAILURE:
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

export const adminPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRICE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_UPDATE_PRICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case ADMIN_UPDATE_PRICE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_PRICE_DETAILS_RESET:
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
