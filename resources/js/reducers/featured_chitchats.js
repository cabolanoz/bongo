import { FEATURED_CHITCHATS_FETCHED } from '../actions';
  
export default (spectacles, action) => {
  switch (action.type) {
    case FEATURED_CHITCHATS_FETCHED:
      return action.data;
    default:
      return spectacles;
  }
};
