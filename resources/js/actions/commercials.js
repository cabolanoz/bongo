import { api } from '../utils';
import { COMMERCIALS_FETCHED } from './types';

export const fetchCommercials = async dispatch => {
  try {
    const { data } = await api.getCommercials();
    dispatch({ type: COMMERCIALS_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};
