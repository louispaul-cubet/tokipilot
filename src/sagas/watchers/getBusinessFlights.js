import { put, takeLatest, call } from 'redux-saga/effects';

import { 
    GET_BUSINESS_FLIGHTS } from '../../constants';
import {  setBusinessFlights,
  
   } from '../../actions';
import { getBusinessFlights } from '../../lib/api';
import {showLoader,hideLoader} from '../../actions/ui'
function* workerGetBusinessFlights() {
 yield put(showLoader())
  const businessflights = yield call(getBusinessFlights);
  
  yield put(setBusinessFlights(businessflights.data.data));
  
}

export default function* watchGetBusinessFlights() {
  yield takeLatest( GET_BUSINESS_FLIGHTS, workerGetBusinessFlights);
}