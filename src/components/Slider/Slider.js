import React, { useState } from 'react';
import classes from './Slider.module.css';
import ProgressBar from './ProgressBar/ProgressBar';
import { ArrowLeft, ArrowRight } from '../../resources/icons/icons';

const Slider = ({ onLastSlide, sliderData }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current !== (sliderData?.length - 1)) {
      setCurrent(current + 1);
    } else {
      onLastSlide(true);
    }
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? sliderData?.length - 1 : current - 1);
    onLastSlide(false);
  };

  console.log('sliderData:', sliderData);
  console.log('current:', current);

  return (
    <div className={classes.slider}>
      <div className={classes.slide}>
        <ArrowLeft
          className={classes['left-arrow']}
          onClick={current === 0 ? null : prevSlide}
        />
        <img src={sliderData?.[current]?.image} alt="images" />
        <ArrowRight
          className={classes['right-arrow']}
          onClick={nextSlide}
        />
      </div>
      <ProgressBar currentSlide={current} totalSlides={sliderData?.length} />
    </div>
  );
};

export default Slider;