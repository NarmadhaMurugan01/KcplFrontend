// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers...
});

export default rootReducer;
