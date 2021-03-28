import React, { useRef } from 'react';
import className from 'classnames';
import { useSlider } from '../../hooks';

const CommercialsCarousel = ({ children }) => {
  const carouselRef = useRef(null);

  const onResize = slider => {
    if (!carouselRef.current || !slider) return;

    slider.resizeHandler();
  };

  const { containerRef, currentSlideIndex, goToSlide } = useSlider({
    total: children.length,
    perPage: 1,
    draggable: true,
    onResize,
  });

  return (
    <div ref={carouselRef}>
      <div ref={containerRef}>
        {children.map(child => (
          <div key={child.key}>
            {child}
          </div>
        ))}
      </div>

      <div className="commercials__indicator">
        {children.map((_, index) => {
          const cssClass = className({ 'active': index === currentSlideIndex });

          return (<li className={cssClass} key={index} onClick={() => goToSlide(index)}></li>)
        })}
      </div>
    </div>
  );
};

export default CommercialsCarousel;
