import { ModalName } from '../const';
import { MODAL_SHOW, MODAL_HIDE } from './types';

export const hideModal = dispatch => {
  dispatch({ type: MODAL_HIDE });
};

export const showModal = (dispatch, modal) => {
  if (!modal) {
    hideModal(dispatch);
  } else {
    dispatch({ type: MODAL_SHOW, data: modal });
  }
};

export const showSearchModal = dispatch => showModal(dispatch, ModalName.search);
