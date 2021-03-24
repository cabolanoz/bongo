import React from 'react';
import ReactDOM from 'react-dom';
import { hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';

import '../../styles/_modal.scss';

const ModalBase = ({ children }) => {
  const [, dispatch] = useAppState();

  const onClose = () => {
    hideModal(dispatch);
  };

  return ReactDOM.createPortal(
    <div className="modal-container" role="modal">
      <div className="modal-close" onClick={onClose}></div>
      {children}
    </div>,
    document.body
  );
};

export default ModalBase;
