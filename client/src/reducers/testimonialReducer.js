import {
  ADD_TESTIMONIAL_FAILURE,
  ADD_TESTIMONIAL_REQUEST,
  ADD_TESTIMONIAL_SUCCESS,
  ADD_TESTIMONIAL_RESET,
  ALL_TESTIMONIALS_FAILURE,
  ALL_TESTIMONIALS_REQUEST,
  ALL_TESTIMONIALS_SUCCESS,
  ADMIN_DELETE_TESTIMONIAL_FAILURE,
  ADMIN_DELETE_TESTIMONIAL_REQUEST,
  ADMIN_DELETE_TESTIMONIAL_RESET,
  ADMIN_DELETE_TESTIMONIAL_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/testimonialConstant';

export const newTestimonialReducer = (state = { testimonial: {} }, action) => {
  switch (action.type) {
    case ADD_TESTIMONIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TESTIMONIAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        testimonial: action.payload.data,
      };
    case ADD_TESTIMONIAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_TESTIMONIAL_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allTestimonialsReducer = (
  state = { testimoninals: [] },
  action
) => {
  switch (action.type) {
    case ALL_TESTIMONIALS_REQUEST:
      return {
        loading: true,
      };

    case ALL_TESTIMONIALS_SUCCESS:
      return {
        loading: false,
        testimoninals: action.payload,
      };

    case ALL_TESTIMONIALS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const adminTestimonialReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_TESTIMONIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DELETE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ADMIN_DELETE_TESTIMONIAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_DELETE_TESTIMONIAL_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
