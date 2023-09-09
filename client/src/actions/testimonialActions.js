import axios from 'axios';
import {
  ADD_TESTIMONIAL_FAILURE,
  ADD_TESTIMONIAL_REQUEST,
  ADD_TESTIMONIAL_SUCCESS,
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
