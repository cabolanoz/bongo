import { api } from '../utils';
import { PROMENADE_TYPE, CHITCHAT_TYPE } from './types';

export const fetchPromenades = async dispatch => {
  try {
    const { data } = await api.getSpectacles({ type: PROMENADE_TYPE });
    dispatch({ data });
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

export const fetchChitchats = async dispatch => {
  try {
    const { data } = await api.getSpectacles({ type: CHITCHAT_TYPE });
    dispatch({ data });
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
