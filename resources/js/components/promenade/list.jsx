import React, { useEffect } from 'react';
import useAppState from '../../hooks/useAppState';
import { fetchFeaturedPromenades, fetchProminentPromenades } from '../../actions';
import { FeaturedSpectacles, Commercials, SpectaclePill } from '../shared';

import '../../styles/_promenade_chitchat_list.scss';

const List = () => {
  const [{
    featuredPromenades = [],
    prominentPromenades = []
  }, dispatch] = useAppState();

  useEffect(() => {
    fetchFeaturedPromenades(dispatch);
  }, []);

  useEffect(() => {
    fetchProminentPromenades(dispatch);
  }, []);

  return (
    <main className="promenade-list mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-12 mb-3">
            <Commercials />
          </div>
        </div>
      </div>
      {featuredPromenades.length > 0 && (
        <div className="bg-nj-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 my-3">
                <h5 className="m-0">GIRAS DE ESTA SEMANA</h5>
              </div>
              <div className="col-md-12 col-12 mb-3">
                <FeaturedSpectacles spectacles={featuredPromenades} />
              </div>
            </div>
          </div>
        </div>
      )}
      {prominentPromenades.length > 0 && (
        <div className="bg-nj-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 my-3">
                <h5 className="m-0">GIRAS QUE NO TE PODÉS PERDER</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="promenade-list__featured mb-3">
                  {prominentPromenades.map(spectacle => (
                    <div className="promenade-list__featured-item" key={spectacle.id}>
                      <SpectaclePill {...spectacle} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default List;
