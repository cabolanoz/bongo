import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../const';

import '../../styles/_footer.scss';

const Footer = () => (
  <footer className="navbar-footer fixed-bottom">
    <div className="container">
      <span className="navbar-footer__copyright">Todos los derechos reservados - nosjuimos.com. Un producto del Sofá Rojo S.A.</span>

      <ul className="navbar-nav ml-auto">
        <Link className="navbar-nav__item" to={Routes.terms()}>TÉRMINOS Y USOS</Link>
        <Link className="navbar-nav__item" to={Routes.root()}>CONTÁCTENOS</Link>
        <Link className="navbar-nav__item" to={Routes.collaborators()}>COLABORADORES</Link>
        <a
          className="navbar-nav__item"
          href="http://www.detrasdelsofarojo.com"
          target="_blank"
        >
          <img src="/images/sr-logo.png" alt="Sofá Rojo Logo" />
        </a>
      </ul>
    </div>
  </footer>
);

export default Footer;
