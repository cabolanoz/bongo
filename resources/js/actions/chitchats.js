import { api } from '../utils';
import { FEATURED_CHITCHATS_FETCHED, PROMINENT_CHITCHATS_FETCHED } from './types';

export const searchChitchats = async (dispatch, searchTerm) => {
  try {
    const { data } = await api.searchChitchats({ search: searchTerm });
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchFeaturedChitchats = async dispatch => {
  try {
    const { data } = await api.getChitchats({});
    dispatch({ type: FEATURED_CHITCHATS_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchChitchat = async (dispatch, slug) => {
  try {
    const { data } = await api.getChitchat(slug);
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchProminentChitchats = async dispatch => {
  try {
    const { data } = await api.getProminentChitchats();
    dispatch({ type: PROMINENT_CHITCHATS_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
}
