import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { Routes } from '../../const';

const FeaturedSpectacles = ({ fetchAction }) => {
  const [spectacles, setSpectacles] = useState([]);

  const onFetchSpectacles = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch spectacles.');

    setSpectacles(data);
  };

  useEffect(() => {
    fetchAction(onFetchSpectacles);
  }, []);

  return (
    <Carousel indicators={false} slide={false}>
      {spectacles.map(({ id, title, slug, description, desktopAsset }) => (
        <Carousel.Item key={id}>
          <Link to={Routes.promenade({ slug })}>
            <img
              className="d-inline-block img-fluid w-100"
              src={desktopAsset}
              alt={`Evento - ${title}`}
            />
          </Link>
          <Carousel.Caption>
            <h3>{title}</h3>
            <p>{description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FeaturedSpectacles;
