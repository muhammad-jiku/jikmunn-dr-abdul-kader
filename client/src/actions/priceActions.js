import axios from 'axios';
import {
  ADMIN_ALL_PRICES_FAILURE,
  ADMIN_ALL_PRICES_REQUEST,
  ADMIN_ALL_PRICES_SUCCESS,
  CLEAR_ERRORS,
  NEW_PRICE_FAILURE,
  NEW_PRICE_REQUEST,
  NEW_PRICE_SUCCESS,
} from '../constants/priceConstant';

export const addNewPrice = (priceData) => async (dispatch) => {
  try {
    await dispatch({
      type: NEW_PRICE_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/create-price`,
      priceData,
      config
    );

    await dispatch({
      type: NEW_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    await dispatch({
      type: NEW_PRICE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminAllPrices = () => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_ALL_PRICES_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/admin/prices`, config);

    await dispatch({
      type: ADMIN_ALL_PRICES_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_ALL_PRICES_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
