import React, { useRef } from 'react';
import className from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import { useSlider } from '../../hooks';

const FeaturedSpectaclesCarousel = ({ children }) => {
  const carouselRef = useRef(null);

  // Hide arrows if there are not enough content in the carousel.
  const onResize = slider => {
    if (!carouselRef.current || !slider) return;

    if (slider.perPage >= children.length) {
      carouselRef.current.classList.add('--arrows-hidden');
    } else {
      carouselRef.current.classList.remove('--arrows-hidden');
    }

    slider.resizeHandler();
  };

  const {
    onSliderNext,
    onSliderPrevious,
    currentSlideIndex,
    goToSlide,
    hasNext,
    hasPrevious,
    containerRef,
  } = useSlider({
    total: children.length,
    perPage: 1,
    draggable: true,
    onResize,
  });

  const leftArrowCssClass = className('featured-spectacles__arrow', {
    'd-none': !hasPrevious
  });
  const rightArrowCssClass = className('featured-spectacles__arrow', {
    'd-none': !hasNext
  });

  return (
    <div className="featured-spectacles__slider">
      <div  className="featured-spectacles" ref={carouselRef}>
        <button className={leftArrowCssClass} onClick={onSliderPrevious}>
          <ChevronLeftIcon size="large" />
        </button>

        <div className="featured-spectacles__content" ref={containerRef}>
          {children.map(child => (
            <div key={child.key}>
              {child}
            </div>
          ))}
        </div>

        <button className={rightArrowCssClass} onClick={onSliderNext}>
          <ChevronRightIcon size="large" />
        </button>
      </div>

      <div className="featured-spectacles__indicator">
        {children.map((_, index) => {
          const cssClass = className({ 'active': index === currentSlideIndex });

          return (<li className={cssClass} key={index} onClick={() => goToSlide(index)}></li>)
        })}
      </div>
    </div>
  );
};

export default FeaturedSpectaclesCarousel;
