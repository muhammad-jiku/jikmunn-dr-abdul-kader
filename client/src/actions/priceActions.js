import axios from 'axios';
import {
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

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
