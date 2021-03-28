/**
 * A generic hook for sliders based on Siema.
 *
 * - allows to provide callbacks for events on slide change;
 * - handles Siema state on slide change;
 * - provides current Siema state.
 */

import { useRef, useState, useEffect } from 'react';
import Siema from 'siema';

const useSlider = ({ total, onNext, onPrevious, onInit, onChange, onResize, ...config }) => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasNext = currentSlideIndex < total - 1;
  const hasPrevious = currentSlideIndex > 0;

  const goToSlide = index => sliderRef.current.goTo(index);

  const onSliderNext = () => {
    const { currentSlide, perPage } = sliderRef.current;

    if (currentSlide + perPage >= total) {
      sliderRef.current.goTo(0);
    } else {
      sliderRef.current.next(perPage);
    }

    if (onNext) onNext(sliderRef.current, containerRef.current);
  };

  const onSliderPrevious = () => {
    const { currentSlide, perPage } = sliderRef.current;

    if (currentSlide <= 0) {
      sliderRef.current.goTo(total - 1);
    } else {
      sliderRef.current.prev(perPage);
    }

    if (onPrevious) onPrevious(sliderRef.current, containerRef.current);
  };

  const onSliderInit = () => {
    setIsInitialized(true);

    if (onInit) onInit(sliderRef.current, containerRef.current);
  };

  const onSliderChange = () => {
    const { currentSlide } = sliderRef.current;

    setCurrentSlideIndex(currentSlide);

    if (onChange) onChange(sliderRef.current, containerRef.current);
  };

  const onSliderResize = () => {
    if (onResize) onResize(sliderRef.current, containerRef.current);
  };

  useEffect(() => {
    sliderRef.current = new Siema({
      ...config,
      selector: containerRef.current,
      onInit: onSliderInit,
      onChange: onSliderChange,
    });

    window.addEventListener('resize', onSliderResize);
    onSliderResize();

    return () => {
      window.removeEventListener('resize', onSliderResize);

      if (sliderRef.current) sliderRef.current.destroy();
    };
  }, []);

  return {
    goToSlide,
    onSliderNext,
    onSliderPrevious,
    onSliderInit,
    onSliderChange,
    onSliderResize,
    currentSlideIndex,
    hasNext,
    hasPrevious,
    containerRef,
    sliderRef,
    isInitialized,
  };
};

export default useSlider;
 