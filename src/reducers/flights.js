import {   SET_CHEAP_FLIGHTS,
  
  SET_BUSINESS_FLIGHTS} from '../constants';

  const initialState = { cheapflights: [], businessflights:[] };

export default function setBrowserInfo(state = [], action) {
  switch (action.type) {
    case SET_CHEAP_FLIGHTS:
      return {
        ...state,
        cheapflights: action.flights
      };
      case  SET_BUSINESS_FLIGHTS:
        return {
          ...state,
          businessflights:action.flights
        }
    default:
      return state;
  }
}
