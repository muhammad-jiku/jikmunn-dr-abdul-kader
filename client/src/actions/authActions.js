import axios from 'axios';
import {
  CLEAR_ERRORS,
  GOOGLE_AUTH_FAILURE,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  SIGNIN_AUTH_FAILURE,
  SIGNIN_AUTH_REQUEST,
  SIGNIN_AUTH_SUCCESS,
  SIGNOUT_FAILURE,
  SIGNOUT_REQUEST,
  SIGNOUT_SUCCESS,
  SIGNUP_AUTH_FAILURE,
  SIGNUP_AUTH_REQUEST,
  SIGNUP_AUTH_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
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

export const googleSignInUser = (userDataCode) => async (dispatch) => {
  try {
    await dispatch({
      type: GOOGLE_AUTH_REQUEST,
    });

    const config = {
      headers: { 'content-type': 'application/json' },
    };

    const { data } = await axios.post(
      `/api/v1/auth/google`,
      userDataCode,
      config
    );

    await dispatch({
      type: GOOGLE_AUTH_SUCCESS,
      payload: data?.data,
    });

    const token = await data?.token;
    localStorage?.setItem('token', token);
  } catch (error) {
    await dispatch({
      type: GOOGLE_AUTH_FAILURE,
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

export const signOutUser = () => async (dispatch) => {
  try {
    await dispatch({
      type: SIGNOUT_REQUEST,
    });

    const { data } = await axios.post(`/api/v1/auth/signout`);
    console.log(data);

    await dispatch({
      type: SIGNOUT_SUCCESS,
    });
    localStorage?.removeItem('token');
  } catch (error) {
    await dispatch({
      type: SIGNOUT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    await dispatch({
      type: LOAD_USER_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/v1/auth/me`, config);

    await dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: LOAD_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updateUserProfile = (userData) => async (dispatch) => {
  console.log('user data...', userData);
  try {
    await dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/auth/me/update`,
      userData,
      config
    );

    await dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    await dispatch({
      type: UPDATE_PROFILE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const updateUserPassword = (passwords) => async (dispatch) => {
  try {
    await dispatch({
      type: UPDATE_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/auth/me/update-password`,
      passwords,
      config
    );

    await dispatch({
      type: UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    await dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  await dispatch({
    type: CLEAR_ERRORS,
  });
};
