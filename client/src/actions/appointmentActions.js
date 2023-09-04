import axios from 'axios';
import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
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