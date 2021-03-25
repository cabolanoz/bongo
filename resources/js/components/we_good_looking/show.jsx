import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Gallery from "react-photo-gallery";
import { fetchAlbum } from '../../actions';
import { Routes } from '../../const';
import { getRandomAspectRatio } from '../../utils/helpers';

import '../../styles/_album_show.scss';

const Show = () => { // TODO: Investigate (or create lazy component) for loading images in the gallery
  const { slug } = useParams();
  const [album, setAlbum] = useState({});

  const onFetchAlbum = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch albums.');

    setAlbum(data);
  };

  useEffect(() => {
    fetchAlbum(onFetchAlbum, slug);
  }, []);

  const { name, description, photosQuantity, photos = [] } = album;

  const formattedPhotos = photos.map(({ desktopAsset }) => (
    { src: desktopAsset, width: getRandomAspectRatio(), height: getRandomAspectRatio() }
  ));

  return (
    <main className="album-show my-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="album-show__title text-center">{name}</h1>
            <h5 className="album-show__description text-center">{description}</h5>
            <h6 className="album-show__description text-center">{photosQuantity} Fotografías</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <Gallery photos={formattedPhotos} onClick={(event, { photo, index}) => console.log(event, photo, index)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-3 offset-md-5 offset-5 my-3">
            <Link className="btn btn-dark btn-block text-uppercase" to={Routes.weGoodLookings()}>VER MÁS</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;
