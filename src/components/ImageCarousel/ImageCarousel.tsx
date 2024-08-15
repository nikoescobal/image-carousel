import React, { useEffect, useRef, useState } from 'react';
import styles from './ImageCarousel.module.scss';
import { motion } from 'framer-motion';
import useCarouselStore from '../../../store/useCarouselStore';
import Card from '../Card/Card';
import CarouselControls from '../CarouselControls/CarouselControls';

const ImageCarousel: React.FC = () => {
  const { currentIndex, nextImage, prevImage } = useCarouselStore();
  const [images, setImages] = useState<string[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const fetchedImages = Array.from(
        { length: 6 },
        () => `https://picsum.photos/200/300.webp?random&t=${Math.random()}`
      );
      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage(images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images, nextImage]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      prevImage(images.length);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      nextImage(images.length);
    }
  };

  return (
    <div className={styles.carouselWrapper}>
      {images.length > 0 ? (
        <div ref={carouselRef} className={styles.carouselContainer}>
          <div className={styles.cardsWrapper}>
            {images.map((src, index) => (
              <Card key={index} src={src} index={index} />
            ))}
          </div>
          <CarouselControls
            onLeftClick={scrollLeft}
            onRightClick={scrollRight}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageCarousel;
