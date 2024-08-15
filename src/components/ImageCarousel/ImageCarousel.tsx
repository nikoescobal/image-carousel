import React, { useEffect, useRef } from 'react';
import styles from './ImageCarousel.module.scss';
import useCarouselStore from '../../../store/useCarouselStore';
import Card from '../Card/Card';
import CarouselControls from '../CarouselControls/CarouselControls';
import Loader from '../Loader/Loader';

const ImageCarousel: React.FC = () => {
  const {
    currentIndex,
    images,
    nextImage,
    prevImage,
    setImages,
    isAutoPlaying,
    autoPlayInterval,
  } = useCarouselStore();
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchNewImage = () => {
    return `https://picsum.photos/800/400.webp?random&t=${Math.random()}`;
  };

  useEffect(() => {
    const fetchImages = async () => {
      const initialImages = Array.from({ length: 6 }, fetchNewImage);
      setImages(initialImages);
    };

    fetchImages();
  }, [setImages]);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        if (currentIndex === images.length - 1) {
          setImages([...images, fetchNewImage()]);
        }
        nextImage();
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [
    isAutoPlaying,
    autoPlayInterval,
    nextImage,
    currentIndex,
    images,
    setImages,
  ]);

  const scrollToCurrentImage = () => {
    if (carouselRef.current) {
      const cardWidth = 300 + 16; // Card width + gap (16px)
      const scrollPosition =
        currentIndex * cardWidth -
        (carouselRef.current.clientWidth - cardWidth) / 2;
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToCurrentImage();
  }, [currentIndex]);

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
            onLeftClick={() => {
              if (currentIndex === 0) {
                setImages([fetchNewImage(), ...images]);
              }
              prevImage();
            }}
            onRightClick={() => {
              if (currentIndex === images.length - 1) {
                setImages([...images, fetchNewImage()]);
              }
              nextImage();
            }}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ImageCarousel;
