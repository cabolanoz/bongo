import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../shared';
import { fetchAlbums } from '../../actions';
import { Routes } from '../../const';

import '../../styles/_album_list.scss';

const AlbumCard = ({ name, slug, spectacleThumbnail, photosQuantity }) => (
  <div className="col-md-3 col-sm-4 col-6 mb-3">
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
  </div>
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

  if (!albums) return <Loader />;

  return (
    <main className="album-list my-5">
      <div className="container">
        <div className="row">
          {albums.map(album => <AlbumCard key={album.id} {...album} />)}
        </div>
      </div>
    </main>
  );
};

export default List;
