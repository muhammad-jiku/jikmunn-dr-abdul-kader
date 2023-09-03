import {
  ADD_APPOINTMENT_FAILURE,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ALL_APPOINTMENTS_FAILURE,
  ALL_APPOINTMENTS_REQUEST,
  ALL_APPOINTMENTS_SUCCESS,
  APPOINTMENT_DETAILS_FAILURE,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  ADMIN_ALL_APPOINTMENTS_FAILURE,
  ADMIN_ALL_APPOINTMENTS_REQUEST,
  ADMIN_ALL_APPOINTMENTS_SUCCESS,
  ADMIN_DELETE_APPOINTMENT_FAILURE,
  ADMIN_DELETE_APPOINTMENT_REQUEST,
  ADMIN_DELETE_APPOINTMENT_RESET,
  ADMIN_DELETE_APPOINTMENT_SUCCESS,
  ADMIN_UPDATE_APPOINTMENT_FAILURE,
  ADMIN_UPDATE_APPOINTMENT_REQUEST,
  ADMIN_UPDATE_APPOINTMENT_RESET,
  ADMIN_UPDATE_APPOINTMENT_SUCCESS,
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

export const appointmentDetailsReducer = (
  state = { appointment: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case APPOINTMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        appointment: action.payload,
      };

    case APPOINTMENT_DETAILS_FAILURE:
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

export const adminAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_APPOINTMENT_REQUEST:
    case ADMIN_DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_UPDATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case ADMIN_DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case ADMIN_UPDATE_APPOINTMENT_FAILURE:
    case ADMIN_DELETE_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADMIN_UPDATE_APPOINTMENT_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case ADMIN_DELETE_APPOINTMENT_RESET:
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
