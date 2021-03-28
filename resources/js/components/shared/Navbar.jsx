import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { SearchIcon } from '@primer/octicons-react';
import { showLoginModal } from '../../actions';
import useAppState from '../../hooks/useAppState';
import { Routes } from '../../const';

import '../../styles/_navbar.scss';

// TODO: Fix active navigation item
const Navbar = () => {
  const [, dispatch] = useAppState();

  const onShowLoginModal = () => showLoginModal(dispatch);

  return (
    <header className="navbar__header fixed-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav className="navbar navbar-expand-lg navbar-dark px-0">
              <Link className="navbar-brand" to={Routes.root()}>
                <Image src="/images/logo.png" fluid alt="&iexcl;Nos Juimos&#33; Logo" />
              </Link>
              <button className="navbar-toggler pr-0" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbar">
                {/* Left | Normal navigation */}
                <ul className="navbar-nav">
                  <Link className="navbar-nav__item" to={Routes.promenades()}>JUÍMONOS</Link>
                  <Link className="navbar-nav__item" to={Routes.chitchats()}>TULA CUECHO</Link>
                  <Link className="navbar-nav__item" to={Routes.weGoodLookings()}>SALIMOS TUANI</Link>
                </ul>

                {/* Right navigation */}
                <ul className="navbar-nav ml-auto">
                  <a className="d-none d-lg-block navbar-nav__item">
                    <SearchIcon size="small" />
                  </a>
                  <Button className="navbar-nav__item" onClick={onShowLoginModal} variant="link">INICIA SESIÓN</Button>
                  <Button className="btn-custom navbar-nav__item my-2 my-sm-0">REGISTRÁTE</Button>
                  <Button className="navbar-nav__item" variant="link">SUSCRIBÍTE</Button>
                  <a
                    className="navbar-nav__item pr-0"
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
      </div>
    </header>
  );
};

export default Navbar;
