import { api } from '../utils';

export const fetchAlbums = async dispatch => {
  try {
    const { data } = await api.getAlbums();
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};

export const fetchAlbum = async (dispatch, slug) => {
  try {
    const { data } = await api.getAlbum(slug);
    dispatch({ data });
  } catch ({ message }) {
    dispatch({ error: message });
  }
};
