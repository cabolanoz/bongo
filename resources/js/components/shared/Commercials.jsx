import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import useAppState from '../../hooks/useAppState';
import { fetchCommercials } from '../../actions';

import '../../styles/_commercials.scss';

const CarouselIndicator = ({ active, position }) => {
  const cssClassName = classNames({ active });

  return (
    <li className={cssClassName} data-slide-to={position}></li>
  );
};

const CarouselItem = ({
  active,
  desktopPicture,
  mobilePicture,
  pictureUrl,
  isDesktop,
}) => {
  const cssClassName = classNames('carousel-item', { active });

  return (
    <div className={cssClassName}>
      <a href={pictureUrl} target="_blank">
        <img
          className="img-fluid"
          src={isDesktop ? desktopPicture : mobilePicture}
          alt="Ad"
        />
      </a>
    </div>
  );
};

const Commercials = () => {
  const [{ commercials = [] }, dispatch] = useAppState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isDesktop = windowWidth >= 992;
  const isMobile = windowWidth < 992; 

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
    <div className="commercials bg-white m-3">
      <div className="carousel slide" data-ride="carousel">
        <div className="carousel-indicators">
          {commercials.map((_, index) =>
            <CarouselIndicator
              active={index === 0}
              key={index}
              position={index}
            />)}
        </div>
        <div className="carousel-inner">
          {commercials.map((commercial, index) =>
            <CarouselItem
              active={index === 0}
              key={index}
              isDesktop={isDesktop}
              isMobile={isMobile}
              {...commercial}
            />)}
        </div>
      </div>
    </div>
  );
};

export default Commercials;
