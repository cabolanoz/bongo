import React, { useEffect } from 'react';
import useAppState from '../../hooks/useAppState';
import { fetchFeaturedChitchats, fetchProminentChitchats } from '../../actions';
import { FeaturedSpectacles, SpectaclePill } from '../shared';

import '../../styles/_promenade_chitchat_list.scss';

const List = () => {
  const [{
    featuredChitchats = [],
    prominentChitchats = []
  }, dispatch] = useAppState();

  useEffect(() => {
    fetchFeaturedChitchats(dispatch);
  }, []);

  useEffect(() => {
    fetchProminentChitchats(dispatch);
  }, []);

  return (
    <main className="chitchat-list">
      {featuredChitchats && (
        <div className="bg-nj-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 my-3">
                <h5 className="m-0">CUECHOS RECIENTES</h5>
              </div>
              <div className="col-md-12 col-12 mb-3">
                <FeaturedSpectacles spectacles={featuredChitchats} />
              </div>
            </div>
          </div>
        </div>
      )}
      {prominentChitchats && (
        <div className="bg-nj-gray">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12 my-3">
                <h5 className="m-0">CUECHOS DESTACADOS</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="promenade-list__featured mb-3">
                  {prominentChitchats.map(spectacle => (
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
