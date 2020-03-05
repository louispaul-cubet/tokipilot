import { combineReducers } from 'redux';

import flightReducer from './flights';
import uiReducer from './ui'
export default combineReducers({
  flightReducer,
  uiReducer
});
