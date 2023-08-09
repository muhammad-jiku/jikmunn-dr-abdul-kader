import {
  CLEAR_ERRORS,
  NEW_PRICE_FAILURE,
  NEW_PRICE_REQUEST,
  NEW_PRICE_RESET,
  NEW_PRICE_SUCCESS,
} from '../constants/priceConstant';

export const newPriceReducer = (state = { price: {} }, action) => {
  switch (action.type) {
    case NEW_PRICE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_PRICE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        service: action.payload.data,
      };
    case NEW_PRICE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRICE_RESET:
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
