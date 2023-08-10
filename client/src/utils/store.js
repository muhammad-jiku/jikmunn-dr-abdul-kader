import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  allUsersReducer,
  authReducer,
  profileReducer,
} from '../reducers/authReducer';
import {
  allAdminServicesReducer,
  newServiceReducer,
} from '../reducers/serviceReducer';
import {
  allAdminPricesReducer,
  newPriceReducer,
} from '../reducers/priceReducer';

const reducer = combineReducers({
  // user
  user: authReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  // service
  newService: newServiceReducer,
  allServices: allAdminServicesReducer,
  // price
  newPrice: newPriceReducer,
  allPrices: allAdminPricesReducer,
});

let initialState = {};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
