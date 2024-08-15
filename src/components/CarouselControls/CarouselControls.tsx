import React from 'react';
import styles from './CarouselControls.module.scss';
import { motion } from 'framer-motion';

interface CarouselControlsProps {
  onLeftClick: () => void;
  onRightClick: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onLeftClick,
  onRightClick,
}) => {
  return (
    <motion.div
      className={styles.controls}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <motion.button
        onClick={onLeftClick}
        className={styles.arrow}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </motion.button>
      <motion.button
        onClick={onRightClick}
        className={styles.arrow}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default CarouselControls;
