import React from 'react';
import { Link } from 'react-router-dom';
import { showLoginModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import { Routes } from '../../const';

import '../../styles/navbar.scss';

const Navbar = () => {
  const [, dispatch] = useAppState();

  // const isEnjoyableNavActive = () => useRouteMatch(Routes.root());
  // const enjoyableClassName = classNames({
  //   'navbar-nav__item': !isEnjoyableNavActive,
  //   'navbar-nav__item--active': isEnjoyableNavActive
  // });

  // const isWeGoodLookingNavActive = () => useRouteMatch(Routes.weGoodLooking());
  // const weGoodLookingClassName = classNames({
  //   'navbar-nav__item': !isWeGoodLookingNavActive,
  //   'navbar-nav__item--active': isWeGoodLookingNavActive
  // });

  return (
    <header className="navbar__header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to={Routes.root()}>
            <img className="img-fluid" src="/images/logo.png" alt="Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">
            {/* Left | Normal navigation */}
            <ul className="navbar-nav">
              <Link className="navbar-nav__item" to={Routes.root()}>JUÍMONOS</Link>
              <Link className="navbar-nav__item" to={Routes.root()}>TULA CUECHO</Link>
              <Link className="navbar-nav__item" to={Routes.weGoodLookings()}>SALIMOS TUANI</Link>
            </ul>

            {/* Right navigation */}
            <ul className="navbar-nav ml-auto">
              <button className="btn btn-link navbar-nav__item" onClick={() => showLoginModal(dispatch)}>INICIA SESIÓN</button>
              <button className="btn btn-custom navbar-nav__item my-2 my-sm-0">REGISTRÁTE</button>
              <button className="btn btn-link navbar-nav__item">SUSCRIBÍTE</button>
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
    </header>
  );
};

export default Navbar;
