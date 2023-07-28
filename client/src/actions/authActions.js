import axios from 'axios';
import {
  CLEAR_ERRORS,
  SIGNIN_AUTH_FAILURE,
  SIGNIN_AUTH_REQUEST,
  SIGNIN_AUTH_SUCCESS,
  SIGNUP_AUTH_FAILURE,
  SIGNUP_AUTH_REQUEST,
  SIGNUP_AUTH_SUCCESS,
} from '../constants/authConstant';

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
      payload: data?.data,
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

export const signInUser = (userData) => async (dispatch) => {
  try {
    await dispatch({
      type: SIGNIN_AUTH_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.post(`/api/v1/auth/signin`, userData, config);

    await dispatch({
      type: SIGNIN_AUTH_SUCCESS,
      payload: data?.data,
    });

    const token = await data?.token;
    localStorage?.setItem('token', token);
  } catch (error) {
    await dispatch({
      type: SIGNIN_AUTH_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};