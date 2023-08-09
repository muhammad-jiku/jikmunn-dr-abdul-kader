import axios from 'axios';
import {
  CLEAR_ERRORS,
  NEW_SERVICE_FAILURE,
  NEW_SERVICE_REQUEST,
  NEW_SERVICE_SUCCESS,
} from '../constants/serviceConstant';

export const addNewService = (serviceData) => async (dispatch) => {
  try {
    await dispatch({
      type: NEW_SERVICE_REQUEST,
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
      type: NEW_SERVICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    await dispatch({
      type: NEW_SERVICE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
