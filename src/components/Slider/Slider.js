import React, { useState, useEffect } from 'react';
import classes from './Slider.module.css';
import ProgressBar from './ProgressBar/ProgressBar';
import { ArrowLeft, ArrowRight } from '../../resources/icons/icons';

const Slider = ({ onLastSlide, sliderData }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current === sliderData?.length - 1) {
      onLastSlide(true);
    } else {
      onLastSlide(false);
    }
  }, [current, onLastSlide, sliderData]);

  const nextSlide = () => {
    setCurrent((prevCurrent) => {
      return prevCurrent !== sliderData?.length - 1 ? prevCurrent + 1 : prevCurrent;
    });
  };

  const prevSlide = () => {
    setCurrent((prevCurrent) => {
      return prevCurrent === 0 ? sliderData?.length - 1 : prevCurrent - 1;
    });
  };

  return (
    <div className={classes.slider}>
      <div className={classes.slide}>

      {current !== 0 && (
          <ArrowLeft
            className={classes.arrowLeft}
            onClick={prevSlide}
          />
        )}
        <img src={sliderData?.[current]?.image} alt="images" />
        {current !== sliderData?.length - 1 && (
          <ArrowRight
            className={classes.arrowRight}
            onClick={nextSlide}
          />
        )}
      </div>
      
      <ProgressBar currentSlide={current} totalSlides={sliderData?.length} />
    </div>
  );
};

export default Slider;
