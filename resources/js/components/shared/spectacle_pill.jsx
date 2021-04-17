import React from 'react';
import { Link } from 'react-router-dom';
import SpectacleDate from './spectacle_date';
import { RouteTo } from '../../utils';

import '../../styles/_spectacle_pill.scss';

const SpectaclePill = ({ title, slug, description, author, desktopAsset, startDate, category, type, onClick }) => (
  <Link className="spectacle-pill" onClick={onClick} to={RouteTo(type, slug)}>
    <img src={desktopAsset} alt={title} className="img-fluid spectacle-pill__img"/>
    <SpectacleDate startDate={startDate} categoryClass={category.cssClass} />
    <div className="spectacle-pill__caption">
      <h6 className="spectacle-pill__title mb-1">{title}</h6>
      <div className="spectacle-pill__author">
        <h6 className="spectacle-pill__author-name">{author}</h6>
        <h6 className="spectacle-pill__author-separator">&nbsp;|&nbsp;</h6>
        <h6 className={`spectacle-pill__author-category ${category.cssClass}__text`}>{category.name}</h6>
      </div>
      <p className="spectacle-pill__desc m-0 mt-auto" dangerouslySetInnerHTML={{ __html: description }}></p>
    </div> 
  </Link>
);

export default SpectaclePill;
