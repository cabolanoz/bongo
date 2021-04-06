import { api } from '../utils';
import {
  FEATURED_PROMENADES_FETCHED,
  PROMINENT_PROMENADES_FETCHED,
  FEATURED_CHITCHATS_FETCHED,
  PROMINENT_CHITCHATS_FETCHED,
  PROMENADE_TYPE,
  CHITCHAT_TYPE
} from './types';

export const searchSpectacles = async (dispatch, searchTerm) => {
  try {
    const { data } = await api.searchSpectacles({ search: searchTerm });
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchFeaturedPromenades = async dispatch => {
  try {
    const { data } = await api.getSpectacles({ type: PROMENADE_TYPE });
    dispatch({ type: FEATURED_PROMENADES_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchPromenade = async (dispatch, slug) => {
  try {
    const { data } = await api.getSpectacle(slug, { type: PROMENADE_TYPE });
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchProminentPromenades = async dispatch => {
  try {
    const { data } = await api.getProminentSpectacles({ type: PROMENADE_TYPE });
    dispatch({ type: PROMINENT_PROMENADES_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
}

export const fetchFeaturedChitchats = async dispatch => {
  try {
    const { data } = await api.getSpectacles({ type: CHITCHAT_TYPE });
    dispatch({ type: FEATURED_CHITCHATS_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchChitchat = async (dispatch, slug) => {
  try {
    const { data } = await api.getSpectacle(slug, { type: CHITCHAT_TYPE });
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchProminentChitchats = async dispatch => {
  try {
    const { data } = await api.getProminentSpectacles({ type: CHITCHAT_TYPE });
    dispatch({ type: PROMINENT_CHITCHATS_FETCHED, data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
}
