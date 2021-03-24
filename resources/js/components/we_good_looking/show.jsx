import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import { Loader } from '../shared';
import { fetchAlbum } from '../../actions';
import { Routes } from '../../const';
import { getRandomAspectRatio } from '../../utils/helpers';

import '../../styles/_album_show.scss';

const Show = () => {
  const { slug } = useParams();
  const [album, setAlbum] = useState({});
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const onFetchAlbum = ({ data, error }) => {
    if (error) console.error('There was an error while trying to fetch albums.');

    setAlbum(data);
  };

  useEffect(() => {
    fetchAlbum(onFetchAlbum, slug);
  }, []);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  // const closeLightbox = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };

  if (!album) return <Loader />;

  const { name, description, photosQuantity, photos = [] } = album;

  const formattedPhotos = photos.map(({ desktopAsset }) => (
    { src: desktopAsset, width: getRandomAspectRatio(), height: getRandomAspectRatio() }
  ));

  return (
    <main className="album-show my-5">
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
            <Gallery photos={formattedPhotos} />
            {/* <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={formattedPhotos.map(x => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 col-2 offset-md-5 my-5">
            <Link className="btn btn-dark btn-block text-uppercase" to={Routes.weGoodLookings()}>VER MÁS</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Show;
