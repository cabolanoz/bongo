import React, { useEffect } from 'react';
import classNames from 'classnames';
import useAppState from '../../hooks/useAppState';
import { fetchCommercials } from '../../actions';

const CarouselIndicator = ({ active, position }) => {
  const cssClassName = classNames({ active });

  return (
    <li className={cssClassName} data-slide-to={position}></li>
  );
}

const CarouselItem = ({ active, desktopPicture, pictureUrl }) => {
  const cssClassName = classNames('carousel-item', { active });

  return (
    <div className={cssClassName}>
      <a href={pictureUrl} target="_blank">
        <img src={desktopPicture} alt="Ad" className="img-fluid" />
      </a>
    </div>
  );
}

const Commercials = () => {
  const [{ commercials = [] }, dispatch] = useAppState();

  useEffect(() => {
    fetchCommercials(dispatch);
  }, []);

  return (
    <div className="bg-white m-3">
      <div className="carousel slide" data-ride="carousel">
        <div className="carousel-indicators">
          {commercials.map((_, index) => <CarouselIndicator active={index === 0} key={index} position={index} />)}
        </div>
        <div className="carousel-inner">
          {commercials.map((commercial, index) => <CarouselItem active={index === 0} key={index} {...commercial} />)}
        </div>
      </div>
    </div>
  );
}

export default Commercials;
