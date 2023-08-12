import axios from 'axios';
import {
  ADMIN_ALL_SERVICES_FAILURE,
  ADMIN_ALL_SERVICES_REQUEST,
  ADMIN_ALL_SERVICES_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_NEW_SERVICE_FAILURE,
  ADMIN_NEW_SERVICE_REQUEST,
  ADMIN_NEW_SERVICE_SUCCESS,
  ADMIN_SERVICE_DETAILS_REQUEST,
  ADMIN_SERVICE_DETAILS_SUCCESS,
  ADMIN_SERVICE_DETAILS_FAILURE,
} from '../constants/serviceConstant';

export const addNewService = (serviceData) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_NEW_SERVICE_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/v1/admin/create-service`,
      serviceData,
      config
    );

    await dispatch({
      type: ADMIN_NEW_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_NEW_SERVICE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminAllServices = () => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_ALL_SERVICES_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/admin/services`, config);

    await dispatch({
      type: ADMIN_ALL_SERVICES_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_ALL_SERVICES_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminServiceDetails = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_SERVICE_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/admin/service/${id}`, config);

    await dispatch({
      type: ADMIN_SERVICE_DETAILS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_SERVICE_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
