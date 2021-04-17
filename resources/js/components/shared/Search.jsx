import React, { Fragment, useState } from 'react';
import SpectaclePill from './spectacle_pill';
import { searchPromenades, searchChitchats, hideModal } from '../../actions';
import useAppState from '../../hooks/useAppState';

import '../../styles/_search.scss';

const Search = () => {
  const [, dispatch] = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [spectacles, setSpectacles] = useState([]);
  const [showError, setShowError] = useState(false);

  const onSearchTermChange = e => setSearchTerm(e.target.value);
  const onKeyChange = e => {
    if (e.keyCode === 13) onSearch();
  }
  const onSearchSpectacles = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch spectacles.');

    setSpectacles(data);
  };
  const onSearch = () => {
    if (!searchTerm || searchTerm.trim().length <= 5) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setSpectacles([]);
    // TODO: Here's I should have a conditional for promenades | chitchats
    searchPromenades(onSearchSpectacles, searchTerm);
  };

  const onHideModal = () => hideModal(dispatch);

  return (
    <div className="search">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div action="search__form">
              <input
                className="search__input"
                type="text"
                placeholder="Buscar..."
                onChange={onSearchTermChange}
                onKeyDown={onKeyChange}
                value={searchTerm}
              />
              <button
                className="search__submit"
                onClick={onSearch}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {showError && <span className="search__error">Su criterio de búsqueda está vacío o es muy corto (6 caracteres máximo)</span>}
          </div>
        </div>
        {spectacles &&
          <div className="row">
            <div className="col-md-12 my-5">
              {spectacles.map((spectacle) => (
                <Fragment key={spectacle.id}>
                  <SpectaclePill {...spectacle} onClick={onHideModal} />
                  <hr className="search__separator" />
                </Fragment>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Search;
