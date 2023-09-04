import axios from 'axios';
import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ALL_APPOINTMENTS_FAILURE,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
  APPOINTMENT_DETAILS_FAILURE,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/appointmentConstant';

export const addAppointment = (appointment) => async (dispatch) => {
  try {
    await dispatch({
      type: ADD_APPOINTMENT_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/v1/booking/new',
      appointment,
      config
    );

    await dispatch({
      type: ADD_APPOINTMENT_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADD_APPOINTMENT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const allAppointments = () => async (dispatch) => {
  try {
    await dispatch({
      type: ALL_APPOINTMENTS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/v1/bookings/me', config);

    await dispatch({
      type: ALL_APPOINTMENTS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ALL_APPOINTMENTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const appointmentDetails = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: APPOINTMENT_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/booking/${id}`, config);

    await dispatch({
      type: APPOINTMENT_DETAILS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: APPOINTMENT_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
