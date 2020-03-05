import { GET_CHEAP_FLIGHTS,
  SET_CHEAP_FLIGHTS,
  GET_BUSINESS_FLIGHTS,
  SET_BUSINESS_FLIGHTS } from '../constants';

export function setCheapFlights(flights) {
  return {
    type:SET_CHEAP_FLIGHTS,
    flights
  };
}
export function setBusinessFlights(flights) {
  return {
    type: SET_BUSINESS_FLIGHTS,
    flights
  };
}

export function getCheapFlights() {
  return {
    type: GET_CHEAP_FLIGHTS
  };
}
export function getBuisnessFlights() {
  return {
    type: GET_BUSINESS_FLIGHTS
  };
}
