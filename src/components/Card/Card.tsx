import React, { useState, useEffect, useRef } from 'react';
import styles from './Card.module.scss';
import { motion } from 'framer-motion';
import useCarouselStore from '../../../store/useCarouselStore';

interface CardProps {
  src: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ src, index }) => {
  const { currentIndex } = useCarouselStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (containerRef.current && index === currentIndex) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentIndex, index]);

  return (
    <motion.div
      className={styles.card}
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
      }}
    >
      <img
        src={src}
        alt={`Image ${index + 1}`}
        className={`${styles.image} ${!isLoaded ? styles.blur : ''}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </motion.div>
  );
};

export default Card;
