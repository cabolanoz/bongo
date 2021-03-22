import commercialsReducer from './commercials';
import modalReducer from './modal';

export default (
  {
    commercials,
    modal
  },
  action
) => ({
  commercials: commercialsReducer(commercials, action),
  modal: modalReducer(modal, action),
});
