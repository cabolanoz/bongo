import { COMMERCIALS_FETCHED } from '../actions';

export default (commercials, action) => {
  switch (action.type) {
    case COMMERCIALS_FETCHED:
      return action.data;
    default:
      return commercials;
  }
};
