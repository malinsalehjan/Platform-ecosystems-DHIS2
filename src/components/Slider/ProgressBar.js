import classes from "./ProgressBar.module.css";

const ProgressBar = ({ currentSlide, totalSlides }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const progressText = (currentSlide + 1) + "/" + totalSlides;
  
  return (
    <div className={classes["progress-bar"]}>
      {progressText}
      <div className={classes.progress} style={{ width: 100 - progress + "%" }}></div>
    </div>
  );
};

export default ProgressBar;
