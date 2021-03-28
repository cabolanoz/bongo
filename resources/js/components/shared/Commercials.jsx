import React, { useEffect, useState } from 'react';
import CommercialsCarousel from './commercials_carousel';
import useAppState from '../../hooks/useAppState';
import { fetchCommercials } from '../../actions';

import '../../styles/_commercials.scss';

const Commercials = () => {
  const [{ commercials = [] }, dispatch] = useAppState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isDesktop = windowWidth >= 992;

  useEffect(() => {
    fetchCommercials(dispatch);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div className="commercials">
      <CommercialsCarousel key={commercials.length}>
        {
          commercials.map(({ id, name, desktopPicture, mobilePicture, pictureUrl }) => {
            const source = isDesktop ? desktopPicture : mobilePicture;

            return (
              <div key={id}>
                <a href={pictureUrl} target="_blank">
                  <img
                    className="img-fluid d-inline-block w-100"
                    src={source}
                    alt={`AD ${name}`}
                  />
                </a>
              </div>
            );
          })
        }
      </CommercialsCarousel>
    </div>
  );
};

export default Commercials;
