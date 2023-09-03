import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ADMIN_ALL_APPOINTMENTS_FAILURE,
  ADMIN_ALL_APPOINTMENTS_REQUEST,
  ADMIN_ALL_APPOINTMENTS_SUCCESS,
  ADMIN_APPOINTMENT_DETAILS_FAILURE,
  ADMIN_APPOINTMENT_DETAILS_REQUEST,
  ADMIN_APPOINTMENT_DETAILS_SUCCESS,
  ALL_APPOINTMENTS_FAILURE,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
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

export const allAppointmentsReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case ALL_APPOINTMENTS_REQUEST:
      return {
        loading: true,
      };

    case ALL_APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
      };

    case ALL_APPOINTMENTS_FAILURE:
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

export const adminAllAppointmentsReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ALL_APPOINTMENTS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_ALL_APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
      };

    case ADMIN_ALL_APPOINTMENTS_FAILURE:
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

export const adminAppointmentDetailsReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_APPOINTMENT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_APPOINTMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        appointment: action.payload,
      };

    case ADMIN_APPOINTMENT_DETAILS_FAILURE:
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
