import axios from 'axios';
import {
  ADD_TESTIMONIAL_FAILURE,
  ADD_TESTIMONIAL_REQUEST,
  ADD_TESTIMONIAL_SUCCESS,
  ALL_TESTIMONIALS_FAILURE,
  ALL_TESTIMONIALS_REQUEST,
  ALL_TESTIMONIALS_SUCCESS,
} from '../constants/testimonialConstant';

export const addNewTestimonial = (testimonialInfo) => async (dispatch) => {
  try {
    await dispatch({
      type: ADD_TESTIMONIAL_REQUEST,
    });

    const config = {
      headers: {
        authorization: `Bearer ${localStorage?.getItem('token')}`,
        'content-type': 'application/json',
      },
    };

    const { data } = await axios.put(
      '/api/v1/testimonial',
      testimonialInfo,
      config
    );

    await dispatch({
      type: ADD_TESTIMONIAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    await dispatch({
      type: ADD_TESTIMONIAL_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const allTestimonials = () => async (dispatch) => {
  try {
    await dispatch({
      type: ALL_TESTIMONIALS_REQUEST,
    });

    const { data } = await axios.get('/api/v1/testimonials');

    await dispatch({
      type: ALL_TESTIMONIALS_SUCCESS,
      payload: data?.data,
    });
  } catch (error) {
    await dispatch({
      type: ALL_TESTIMONIALS_FAILURE,
      payload: error.response.data.message,
    });
  }
};
