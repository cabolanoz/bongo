import React from 'react';
import dayjs from 'dayjs';
import className from 'classnames';
import { locale } from '../../utils';

import '../../styles/_dater.scss';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const SpectacleDate = ({ startDate, categoryClass }) => {
  dayjs.locale(locale);

  const formattedDate = dayjs(startDate, DATE_FORMAT);
  const cssClass = className('dater', categoryClass);

  return (
    <div className={cssClass}>
      <div className="dater__day">
        <span className="dater__day-of-month">{formattedDate.format('DD')}</span>&nbsp;
        <span className="dater__day-of-week">{formattedDate.format('ddd')}</span>
      </div>
      <div className="dater__month">{formattedDate.format('MMM')}</div>
      <div className="dater__year">{formattedDate.format('YYYY')}</div>
      <div className={`dater__icon category__icon ${categoryClass}__icon`}></div>
    </div>
  );
};

export default SpectacleDate;
