import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../const';
import '../../styles/footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <span className="footer__copyright">Todos los derechos reservados - nosjuimos.com. Un producto del Sofá Rojo S.A.</span>

      <ul className="navbar-nav ml-auto">
        <Link className="navbar-nav__item" to={Routes.root()}>TÉRMINOS Y USOS</Link>
        <Link className="navbar-nav__item" to={Routes.root()}>CONTÁCTENOS</Link>
        <Link className="navbar-nav__item" to={Routes.root()}>COLABORADORES</Link>
        <a
          className="navbar-nav__item"
          href="http://www.detrasdelsofarojo.com"
          target="_blank"
        >
          <img src="img/sr-logo.png" alt="Sofá Rojo Logo" />
        </a>
      </ul>
    </div>
  </footer>
);

export default Footer;
