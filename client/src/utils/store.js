import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  authReducer,
  profileReducer,
  allUsersReducer,
  userDetailsReducer,
} from '../reducers/authReducer';
import {
  adminNewServiceReducer,
  allServicesReducer,
  serviceDetailsReducer,
  allAdminServicesReducer,
  adminServiceDetailsReducer,
  adminServiceReducer,
} from '../reducers/serviceReducer';
import {
  adminNewPriceReducer,
  allPricesReducer,
  allAdminPricesReducer,
  adminPriceDetailsReducer,
  adminPriceReducer,
} from '../reducers/priceReducer';
import { bookingReducer } from '../reducers/bookingReducer';
import {
  newAppointmentReducer,
  allAppointmentsReducer,
  appointmentDetailsReducer,
  adminAllAppointmentsReducer,
  adminAppointmentReducer,
} from '../reducers/appointmentReducer';

const reducer = combineReducers({
  // user
  user: authReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  // service
  newService: adminNewServiceReducer,
  services: allServicesReducer,
  allServices: allAdminServicesReducer,
  serviceDetailsInfo: serviceDetailsReducer,
  serviceDetails: adminServiceDetailsReducer,
  service: adminServiceReducer,
  // price
  newPrice: adminNewPriceReducer,
  prices: allPricesReducer,
  allPrices: allAdminPricesReducer,
  priceDetails: adminPriceDetailsReducer,
  price: adminPriceReducer,
  // booking
  booking: bookingReducer,
  // appointment
  newAppoinment: newAppointmentReducer,
  appointments: allAppointmentsReducer,
  appointmentDetails: appointmentDetailsReducer,
  allAppointments: adminAllAppointmentsReducer,
  appointment: adminAppointmentReducer,
});

let initialState = {
  booking: {
    bookingItems: localStorage.getItem('bookingItems')
      ? JSON.parse(localStorage.getItem('bookingItems'))
      : [],
  },
};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
