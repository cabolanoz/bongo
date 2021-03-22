import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../../const';
import '../../styles/navbar.scss';

const Navbar = () => (
  <div className="navigationbar">
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href={Routes.root()}>
          <img className="img-fluid" src="img/logo.png" alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          {/* Left | Normal navigation */}
          <ul className="navbar-nav">
            <Link className="navbar-nav__item" to={Routes.root()}>TULA CUECHO</Link>
            <Link className="navbar-nav__item" to={Routes.root()}>SALIMOS TUANI</Link>
          </ul>

          {/* Right navigation */}
          <ul className="navbar-nav ml-auto">
            <Link className="navbar-nav__item" to={Routes.root()}>INICIA SESIÓN</Link>
            <button className="btn navbar-nav__item my-2 my-sm-0">REGISTRÁTE</button>
            <Link className="navbar-nav__item" to={Routes.root()}>SUSCRIBÍTE</Link>
            <a
              className="navbar-nav__item"
              href="http://nosjuimos.com/conecta"
              target="_blank"
            >
              ANÚNCIATE
            </a>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);

export default Navbar;
