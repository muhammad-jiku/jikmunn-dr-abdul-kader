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
  allAdminServicesReducer,
  adminServiceDetailsReducer,
} from '../reducers/serviceReducer';
import {
  adminNewPriceReducer,
  allAdminPricesReducer,
} from '../reducers/priceReducer';

const reducer = combineReducers({
  // user
  user: authReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  // service
  newService: adminNewServiceReducer,
  allServices: allAdminServicesReducer,
  serviceDetails: adminServiceDetailsReducer,
  // price
  newPrice: adminNewPriceReducer,
  allPrices: allAdminPricesReducer,
});

let initialState = {};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
