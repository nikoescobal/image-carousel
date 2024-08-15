import React from 'react';
import styles from './CarouselControls.module.scss';

interface CarouselControlsProps {
  onLeftClick: () => void;
  onRightClick: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onLeftClick,
  onRightClick,
}) => {
  return (
    <div className={styles.controls}>
      <button onClick={onLeftClick} className={styles.arrow}>
        &larr;
      </button>
      <button onClick={onRightClick} className={styles.arrow}>
        &rarr;
      </button>
    </div>
  );
};

export default CarouselControls;
