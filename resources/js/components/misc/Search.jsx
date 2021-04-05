import React from 'react';

import '../../styles/_search.scss';

const Search = () => (
  <div className="search">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div action="search__form">
            <input className="search__input" type="text" placeholder="Buscar..." />
            <button className="search__submit">Buscar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Search;
