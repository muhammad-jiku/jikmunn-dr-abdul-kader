import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/appointmentConstant';

export const newAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_APPOINTMENT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ADD_APPOINTMENT_SUCCESS:
      return {
        loading: false,
        appointment: action.payload,
      };

    case ADD_APPOINTMENT_FAILURE:
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
