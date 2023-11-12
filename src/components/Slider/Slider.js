import React, { useState } from 'react';
import data from './SliderData';
import classes from './Slider.module.css';
import ProgressBar from './ProgressBar/ProgressBar';
import { ArrowLeft, ArrowRight } from '../../resources/icons/icons';

const Slider = ({ onLastSlide }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current !== data.length - 1) {
      setCurrent(current + 1);
    } else {
      onLastSlide(true);
    }
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
    onLastSlide(false);
  };

  return (
    <div className={classes.slider}>
      <div className={classes.slide}>
        <ArrowLeft
          className={classes['left-arrow']}
          onClick={current === 0 ? null : prevSlide}
        />
        <img src={data[current].image} alt="images" />
        <ArrowRight
          className={classes['right-arrow']}
          onClick={nextSlide}
        />
      </div>
      <ProgressBar currentSlide={current} totalSlides={data.length} />
    </div>
  );
};

export default Slider;