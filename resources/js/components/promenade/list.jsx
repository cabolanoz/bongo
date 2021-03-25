import React from 'react';
import { fetchPromenades } from '../../actions';
import { FeaturedSpectacles, Commercials } from '../shared';

const List = () => {
  return (
    <main className="promenade mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12">
            <Commercials />
          </div>
          <div className="col-md-12 col-12 my-3">
            <FeaturedSpectacles fetchAction={fetchPromenades} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default List;
