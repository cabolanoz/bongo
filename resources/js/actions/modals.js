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

export const showLoginModal = dispatch => showModal(dispatch, ModalName.login);
export const showSignupModal = dispatch => showModal(dispatch, ModalName.signup);
export const showTermsModal = dispatch => showModal(dispatch, ModalName.terms);
export const showCollaboratorsModal = dispatch => showModal(dispatch, ModalName.collaborators);
