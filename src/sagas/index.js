import { all, fork } from 'redux-saga/effects';

import  watchGetCheapflights from './watchers/getCheapFlights';
import  watchGetBusinessFlights from './watchers/getBusinessFlights'
export default function* root() {
  yield all([
    fork(watchGetCheapflights),
    fork(watchGetBusinessFlights)
  ]);
}
