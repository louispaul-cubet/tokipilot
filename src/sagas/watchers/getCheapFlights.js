import { put, takeLatest, call } from 'redux-saga/effects';

import { 
  GET_CHEAP_FLIGHTS, } from '../../constants';
import {  setCheapFlights,
  
   } from '../../actions';
import { getCheapFlights } from '../../lib/api';
import {showLoader,hideLoader} from '../../actions/ui'

function* workerGetCheapFlights() {
  yield put(showLoader());
  const cheapflights = yield call(getCheapFlights);
 
  yield put(setCheapFlights(cheapflights.data.data));
  yield put(hideLoader());
}

export default function* watchGetCheapFlights() {
  yield takeLatest( GET_CHEAP_FLIGHTS, workerGetCheapFlights);
}


