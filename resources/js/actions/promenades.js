import { api } from '../utils';
import { FEATURED_PROMENADES_FETCHED, PROMINENT_PROMENADES_FETCHED } from './types';

export const searchPromenades = async (dispatch, searchTerm) => {
  try {
    const { data } = await api.searchPromenades({ search: searchTerm });
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchFeaturedPromenades = async dispatch => {
  try {
    const { data } = await api.getPromenades();
    dispatch({ type: FEATURED_PROMENADES_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchPromenade = async (dispatch, slug) => {
  try {
    const { data } = await api.getPromenade(slug);
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchProminentPromenades = async dispatch => {
  try {
    const { data } = await api.getProminentPromenades();
    dispatch({ type: PROMINENT_PROMENADES_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
}
