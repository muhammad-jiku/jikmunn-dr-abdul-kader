import axios from 'axios';
import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ALL_APPOINTMENTS_FAILURE,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
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
