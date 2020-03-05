import { put, takeLatest, call } from 'redux-saga/effects';

import { 
  GET_CHEAP_FLIGHTS, } from '../../constants';
import {  setCheapFlights,
  
   } from '../../actions';
import { getCheapFlights } from '../../lib/api';

function* workerGetCheapFlights() {
  const cheapflights = yield call(getCheapFlights);
  yield put(setCheapFlights(cheapflights.data.data));
}

export default function* watchGetCheapFlights() {
  yield takeLatest( GET_CHEAP_FLIGHTS, workerGetCheapFlights);
}


