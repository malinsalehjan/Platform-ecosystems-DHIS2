import React, { useState, useEffect } from 'react';
import classes from './Slider.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../../../../resources/icons/index';
import getImageSrc from './ImageData/ImageData';

const Slider = ({ onLastSlide, imageData }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === imageData?.length - 1) {
      onLastSlide();
    }
  }, [current, imageData]);

  const nextSlide = () => {
    setCurrent((prevCurrent) => {
      return prevCurrent !== imageData?.length - 1
        ? prevCurrent + 1
        : prevCurrent;
    });
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) => {
      return prevCurrent === 0 ? imageData?.length - 1 : prevCurrent - 1;
    });
  };

  return (
    <div className={classes.slider}>
      <div className={classes.slide}>
        {current !== 0 && (
          <ArrowLeftIcon className={classes.arrowLeft} onClick={prevSlide} />
        )}
        <img src={getImageSrc(imageData?.[current]?.image)} alt="slide" />
        {current !== imageData?.length - 1 && (
          <ArrowRightIcon className={classes.arrowRight} onClick={nextSlide} />
        )}
      </div>
      <ProgressBar currentSlide={current} totalSlides={imageData?.length} />
    </div>
  );
};

export default Slider;
