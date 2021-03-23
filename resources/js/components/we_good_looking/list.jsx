import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAlbums } from '../../actions';
import { Routes } from '../../const';

import '../../styles/album_list.scss';

const AlbumCard = ({ name, slug, spectacleThumbnail, photosQuantity }) => (
  <Link className="card-link" to={Routes.weGoodLooking({ slug })}>
    <div className="card">
      <div className="card-img-top">
        <div className="card-img-top__overlay">
          <img src={spectacleThumbnail} alt={`Albúm ${name}`} className="img-fluid"/>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-center">{name}</h5>
        <p className="card-text text-center">{`${photosQuantity} Fotografías`}</p>
      </div>
    </div>
  </Link>
);

const List = () => {
  const [albums, setAlbums] = useState([]);

  const onFetchAlbums = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch albums.');

    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums(onFetchAlbums);
  }, []);

  if (!albums) return null;

  return (
    <div className="album-list">
      <div className="container">
        <div className="row my-5">
          <div className="col-md-3 col-sm-4 col-6">
            {albums.map(album => <AlbumCard key={album.id} {...album} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
