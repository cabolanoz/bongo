import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedSpectaclesCarousel from './featured_spectacles_carousel';
import SpectacleDate from './spectacle_date';
import { Routes } from '../../const';
import { reduceFeaturedSpectacles } from '../../utils'

import '../../styles/_featured_spectacles.scss';

const FeaturedSpectacles = ({ spectacles }) => {
  const spectaclesGroup = reduceFeaturedSpectacles(spectacles);

  return (
    <FeaturedSpectaclesCarousel key={spectaclesGroup.length}>
      {spectaclesGroup.map((spectacles) => {
        const { id, title, slug, description, desktopAsset, startDate, category } = spectacles[0];
        const otherSpectacles = spectacles.slice(1);

        return (
          <div className="featured-spectacles__carousel-item" key={id}>
            <div className="featured-spectacles__item">
              <Link className="featured-spectacles__figure" to={Routes.promenade({ slug })}>
                <div className="featured-spectacles__dater">
                  <SpectacleDate startDate={startDate} categoryClass={category.cssClass} />
                </div>
                <img className="d-inline-block img-fluid w-100" src={desktopAsset} alt={`Evento ${title}`} />
                <div className="featured-spectacles__caption">
                  <h3 className="featured-spectacles__title px-3">{title}</h3>
                  <p className="featured-spectacles__desc px-3" dangerouslySetInnerHTML={{ __html: description }}></p>
                </div>
              </Link>
            </div>
            <div className="featured-spectacles__item">
              {otherSpectacles.map(({ id, title, slug, description, desktopAsset, startDate, category }) => (
                  <Link className="featured-spectacles__figure" key={id} to={Routes.promenade({ slug })}>
                    <div className="featured-spectacles__dater">
                      <SpectacleDate startDate={startDate} categoryClass={category.cssClass} />
                    </div>
                    <img className="d-inline-block img-fluid w-100" src={desktopAsset} alt={`Evento ${title}`} />
                    <div className="featured-spectacles__caption">
                      <h3 className="featured-spectacles__title px-3">{title}</h3>
                      <p className="featured-spectacles__desc px-3" dangerouslySetInnerHTML={{ __html: description }}></p>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        );
      })}
    </FeaturedSpectaclesCarousel>
  );
};

export default FeaturedSpectacles;
