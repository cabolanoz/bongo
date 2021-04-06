import { PROMINENT_PROMENADES_FETCHED } from '../actions';

export default (spectacles, action) => {
  switch (action.type) {
    case PROMINENT_PROMENADES_FETCHED:
      return action.data;
    default:
      return spectacles;
  }
};
