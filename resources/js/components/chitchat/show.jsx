import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchChitchat } from '../../actions';

import '../../styles/_chitchat_show.scss';

const Show = () => {
  const { slug } = useParams();
  const [chitchat, setChitchat] = useState({});

  const onFetchChitchat = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch the chitchat.');

    setChitchat(data);
  };

  useEffect(() => {
    fetchChitchat(onFetchChitchat, slug);
  }, []);

  const { title, description, author, desktopAsset, category = {} } = chitchat;
  const { name, cssClass } = category;

  return (
    <main className="chitchat-show mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-5 pr-md-0">
            <div className={`w-100 h-100 ${cssClass} p-3 chitchat-show__box`}>
              <h2 className="chitchat-show__title mt-5">{title}</h2>
              <div className="chitchat-show__content mt-3">
                <div className={`category__icon ${cssClass}__icon`}></div>
                <span className={`${cssClass}__text`}>&nbsp;{name}&nbsp;</span>
                <span className="chitchat-show__author">| {author}</span>
              </div>
            </div>
          </div>
          <div className="col-md-7 pl-md-0">
            <img className="img-fluid w-100" src={desktopAsset} alt={title} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mt-5">
            <p className="chitchat-show__desc" dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;
