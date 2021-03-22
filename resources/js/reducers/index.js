import modalReducer from './modal';

export default (
  {
    modal
  },
  action
) => ({
  modal: modalReducer(modal, action),
});
