import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { fetchAlbums } from '../../actions';
import { Routes } from '../../const';

import '../../styles/_album_list.scss';

const List = () => {
  const [albums, setAlbums] = useState([]);

  const onFetchAlbums = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch albums.');

    setAlbums(data);
  };

  useEffect(() => {
    fetchAlbums(onFetchAlbums);
  }, []);

  return (
    <main className="album-list mt-3">
      <div className="container">
        <div className="row">
          {
            albums.map(({ id, name, slug, spectacleThumbnail, photosQuantity }) => (
              <div className="col-md-3 col-sm-4 col-6 mb-3" key={id}>
                <Link className="card-link" to={Routes.weGoodLooking({ slug })}>
                  <Card >
                    <div className="card-img-top-overlay">
                      <Card.Img variant="top" src={spectacleThumbnail} />
                    </div>
                    <Card.Body>
                      <Card.Title className="text-center">{name}</Card.Title>
                      <Card.Text className="text-center">{`${photosQuantity} Fotografías`}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
};

export default List;
