// external import
import axios from 'axios';
// internal imports
import {
  ADMIN_NEW_PRICE_FAILURE,
  ADMIN_NEW_PRICE_REQUEST,
  ADMIN_NEW_PRICE_SUCCESS,
  ALL_PRICES_FAILURE,
  ALL_PRICES_SUCCESS,
  ALL_PRICES_REQUEST,
  ADMIN_ALL_PRICES_FAILURE,
  ADMIN_ALL_PRICES_REQUEST,
  ADMIN_ALL_PRICES_SUCCESS,
  ADMIN_PRICE_DETAILS_REQUEST,
  ADMIN_PRICE_DETAILS_SUCCESS,
  ADMIN_PRICE_DETAILS_FAILURE,
  ADMIN_UPDATE_PRICE_DETAILS_REQUEST,
  ADMIN_UPDATE_PRICE_DETAILS_SUCCESS,
  ADMIN_UPDATE_PRICE_DETAILS_FAILURE,
  ADMIN_DELETE_PRICE_DETAILS_REQUEST,
  ADMIN_DELETE_PRICE_DETAILS_SUCCESS,
  ADMIN_DELETE_PRICE_DETAILS_FAILURE,
  CLEAR_ERRORS,
} from '../constants/priceConstant';

export const adminAddNewPrice = (priceData) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_NEW_PRICE_REQUEST,
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
      type: ADMIN_NEW_PRICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_NEW_PRICE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const allPrices = () => async (dispatch) => {
  try {
    await dispatch({
      type: ALL_PRICES_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/prices`);

    await dispatch({
      type: ALL_PRICES_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ALL_PRICES_FAILURE,
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

export const adminPriceDetails = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_PRICE_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/admin/price/${id}`, config);

    await dispatch({
      type: ADMIN_PRICE_DETAILS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_PRICE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdatePriceDetails = (id, priceData) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_UPDATE_PRICE_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/price/${id}`,
      priceData,
      config
    );

    await dispatch({
      type: ADMIN_UPDATE_PRICE_DETAILS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_UPDATE_PRICE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminDeletePriceDetails = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_DELETE_PRICE_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.delete(`/api/v1/admin/price/${id}`, config);

    await dispatch({
      type: ADMIN_DELETE_PRICE_DETAILS_SUCCESS,
      payload: data?.success,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_DELETE_PRICE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
