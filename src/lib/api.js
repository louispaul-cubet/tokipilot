import axios from 'axios'

export async function getCheapFlights(dispatch) {

  const response = await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/cheap');

  return response;
}
export async function getBusinessFlights() {

  const response = await axios.get('https://tokigames-challenge.herokuapp.com/api/flights/business');

  return response;
}