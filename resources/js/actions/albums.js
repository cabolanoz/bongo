import { api } from '../utils';

export const fetchAlbums = async dispatch => {
  try {
    const { data } = await api.getAlbums();
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};
