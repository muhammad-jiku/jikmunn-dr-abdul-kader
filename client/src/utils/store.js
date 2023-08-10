import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  allUsersReducer,
  authReducer,
  profileReducer,
} from '../reducers/authReducer';
import { newServiceReducer } from '../reducers/serviceReducer';
import { newPriceReducer } from '../reducers/priceReducer';

const reducer = combineReducers({
  // user
  user: authReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  // service
  newService: newServiceReducer,
  // price
  newPrice: newPriceReducer,
});

let initialState = {};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
