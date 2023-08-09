import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { authReducer, profileReducer } from '../reducers/authReducer';
import { newServiceReducer } from '../reducers/serviceReducer';

const reducer = combineReducers({
  user: authReducer,
  profile: profileReducer,
  newService: newServiceReducer,
});

let initialState = {};

const middleware = [thunk];

export const appointmentStore = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
