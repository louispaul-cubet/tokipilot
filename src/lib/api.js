import axios from 'axios'
import { put } from 'redux-saga/effects';

export async function getCheapFlights() {
  
  const response = await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/cheap');

  return response;
}
export async function getBusinessFlights() {
  
  const response = await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/business');
  
  return response;
}