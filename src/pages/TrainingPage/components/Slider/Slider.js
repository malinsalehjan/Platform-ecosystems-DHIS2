import React, { useState, useEffect } from 'react';
import classes from './Slider.module.css';
import ProgressBar from '../ProgressBar/ProgressBar';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../../../../resources/icons/index';
import { useDHIS2 } from '../../../../contexts/DHIS2Context';

const Slider = ({ module }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const { finishModule } = useDHIS2();

  useEffect(() => {
    if (currentImage === module.totalImages - 1) {
      finishModule(module.id);
    }
  }, [currentImage, module]);

  const nextSlide = () => {
    setCurrentImage((prevCurrent) => {
      return prevCurrent !== module.content.images?.length - 1
        ? prevCurrent + 1
        : prevCurrent;
    });
  };

  const prevSlide = () => {
    setCurrentImage((prevCurrent) => {
      return prevCurrent === 0
        ? module.content.images?.length - 1
        : prevCurrent - 1;
    });
  };

  return (
    <div className={classes.slider}>
      <div className={classes.slide}>
        {currentImage !== 0 && (
          <ArrowLeftIcon className={classes.arrowLeft} onClick={prevSlide} />
        )}
        <div
          className={classes.imageContainer}
          style={{
            backgroundImage: `url(${module.content.images[currentImage]})`,
          }}
        ></div>
        {currentImage < module.totalImages - 1 && (
          <ArrowRightIcon className={classes.arrowRight} onClick={nextSlide} />
        )}
      </div>
      <ProgressBar current={currentImage} total={module.totalImages} />
    </div>
  );
};

export default Slider;
