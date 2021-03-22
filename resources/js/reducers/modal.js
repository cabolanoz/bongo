import { MODAL_SHOW, MODAL_HIDE } from '../actions';

export default (modal, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return action.data;
    case MODAL_HIDE:
      return null;
    default:
      return modal;
  }
};
