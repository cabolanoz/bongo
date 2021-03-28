import React, { Fragment, useEffect, useState } from 'react';
import { fetchPromenades } from '../../actions';
import { FeaturedSpectacles, Commercials } from '../shared';

const List = () => {
  const [spectacles, setSpectacles] = useState([]);

  const onFetchSpectacles = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch spectacles.');

    setSpectacles(data);
  };

  useEffect(() => {
    fetchPromenades(onFetchSpectacles);
  }, []);

  return (
    <Fragment>
      <main className="promenade mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12 mb-3">
              <Commercials />
            </div>
          </div>
        </div>
        {spectacles && (
          <div className="bg-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12 my-3">
                  <h5 className="m-0">GIRAS DE ESTA SEMANA</h5>
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <FeaturedSpectacles spectacles={spectacles} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default List;
