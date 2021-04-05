import React from 'react';
import { Link } from 'react-router-dom';
import SpectacleDate from './spectacle_date';
import { Routes } from '../../const';

import '../../styles/_spectacle_pill.scss';

const SpectaclePill = ({ title, slug, description, author, desktopAsset, startDate, category, onClick }) => (
  <Link className="spectacle-pill" onClick={onClick} to={Routes.promenade({ slug })}>
    <img src={desktopAsset} alt={title} className="img-fluid spectacle-pill__img"/>
    <SpectacleDate startDate={startDate} categoryClass={category.cssClass} />
    <div className="spectacle-pill__caption">
      <h6 className="spectacle-pill__title mb-1">{title}</h6>
      <div className="spectacle-pill__author">
        <h6 className="spectacle-pill__author-name">{author}&nbsp;|</h6>
        <h6 className={`spectacle-pill__author-category ${category.cssClass}__text`}>&nbsp;{category.name}</h6>
      </div>
      <p className="spectacle-pill__desc m-0 mt-auto" dangerouslySetInnerHTML={{ __html: description }}></p>
    </div> 
  </Link>
);

export default SpectaclePill;
