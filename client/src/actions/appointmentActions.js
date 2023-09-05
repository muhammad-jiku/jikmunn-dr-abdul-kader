import axios from 'axios';
import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ALL_APPOINTMENTS_FAILURE,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
  ADMIN_ALL_APPOINTMENTS_FAILURE,
  ADMIN_ALL_APPOINTMENTS_REQUEST,
  ADMIN_ALL_APPOINTMENTS_SUCCESS,
  ADMIN_APPOINTMENT_DETAILS_FAILURE,
  ADMIN_APPOINTMENT_DETAILS_REQUEST,
  ADMIN_APPOINTMENT_DETAILS_SUCCESS,
  ADMIN_UPDATE_APPOINTMENT_FAILURE,
  ADMIN_UPDATE_APPOINTMENT_REQUEST,
  ADMIN_UPDATE_APPOINTMENT_SUCCESS,
  ADMIN_DELETE_APPOINTMENT_REQUEST,
  ADMIN_DELETE_APPOINTMENT_SUCCESS,
  ADMIN_DELETE_APPOINTMENT_FAILURE,
  CLEAR_ERRORS,
} from '../constants/appointmentConstant';

export const addNewAppointment = (appointment) => async (dispatch) => {
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
      payload: data,
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

export const adminAllappointments = () => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_ALL_APPOINTMENTS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get('/api/v1/admin/bookings', config);

    await dispatch({
      type: ADMIN_ALL_APPOINTMENTS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_ALL_APPOINTMENTS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminAppointmentDetails = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_APPOINTMENT_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/admin/booking/${id}`, config);

    await dispatch({
      type: ADMIN_APPOINTMENT_DETAILS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_APPOINTMENT_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminUpdateAppointment = (id, appointment) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_UPDATE_APPOINTMENT_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/admin/booking/${id}`,
      appointment,
      config
    );

    await dispatch({
      type: ADMIN_UPDATE_APPOINTMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_UPDATE_APPOINTMENT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const adminDeleteAppointment = (id) => async (dispatch) => {
  try {
    await dispatch({
      type: ADMIN_DELETE_APPOINTMENT_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };
    const { data } = await axios.delete(`/api/v1/admin/booking/${id}`, config);

    await dispatch({
      type: ADMIN_DELETE_APPOINTMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    await dispatch({
      type: ADMIN_DELETE_APPOINTMENT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
