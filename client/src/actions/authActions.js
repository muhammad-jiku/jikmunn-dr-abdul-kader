import axios from 'axios';
import {
  SIGNUP_AUTH_FAILURE,
  SIGNUP_AUTH_REQUEST,
  SIGNUP_AUTH_SUCCESS,
} from '../constants/authConstant';

// Register
export const signUpUser = (userData) => async (dispatch) => {
  try {
    await dispatch({
      type: SIGNUP_AUTH_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.post(`/api/v1/auth/signup`, userData, config);

    await dispatch({
      type: SIGNUP_AUTH_SUCCESS,
      payload: data.user,
    });

    const token = await data?.token;
    localStorage?.setItem('token', token);
  } catch (error) {
    await dispatch({
      type: SIGNUP_AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};
