import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import authReducer from '../reducers/authReducer';

const reducer = combineReducers({
  auth: authReducer,
});

let initialState = {
  appointment: {
    appointments: localStorage.getItem('appointments')
      ? JSON.parse(localStorage.getItem('appointments'))
      : [],
    appointmentInfo: localStorage.getItem('appointmentInfo')
      ? JSON.parse(localStorage.getItem('appointmentInfo'))
      : {},
  },
};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
