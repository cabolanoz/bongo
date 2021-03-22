import React from 'react';
import { Link } from 'react-router-dom';
import { showTermsModal, showCollaboratorsModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import { Routes } from '../../const';

import '../../styles/footer.scss';

const Footer = () => {
  const [, dispatch] = useAppState();

  return (
    <footer className="footer">
      <div className="container">
        <span className="footer__copyright">Todos los derechos reservados - nosjuimos.com. Un producto del Sofá Rojo S.A.</span>

        <ul className="navbar-nav ml-auto">
          <a className="navbar-nav__item" onClick={() => showTermsModal(dispatch)}>TÉRMINOS Y USOS</a>
          <Link className="navbar-nav__item" to={Routes.root()}>CONTÁCTENOS</Link>
          <a className="navbar-nav__item" onClick={() => showCollaboratorsModal(dispatch)}>COLABORADORES</a>
          <a
            className="navbar-nav__item"
            href="http://www.detrasdelsofarojo.com"
            target="_blank"
          >
            <img src="images/sr-logo.png" alt="Sofá Rojo Logo" />
          </a>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
