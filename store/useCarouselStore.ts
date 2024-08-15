import create from 'zustand';

interface CarouselState {
  currentIndex: number;
  images: string[];
  isAutoPlaying: boolean;
  autoPlayInterval: number;
  setImages: (images: string[]) => void;
  nextImage: () => void;
  prevImage: () => void;
  toggleAutoPlay: () => void;
  setAutoPlayInterval: (interval: number) => void;
}

const useCarouselStore = create<CarouselState>((set, get) => ({
  currentIndex: 0,
  images: [],
  isAutoPlaying: true,
  autoPlayInterval: 3000,

  setImages: (images) => set({ images }),

  nextImage: () => {
    const { currentIndex, images } = get();
    set({ currentIndex: (currentIndex + 1) % images.length });
  },

  prevImage: () => {
    const { currentIndex, images } = get();
    set({ currentIndex: (currentIndex - 1 + images.length) % images.length });
  },

  toggleAutoPlay: () => set((state) => ({ isAutoPlaying: !state.isAutoPlaying })),

  setAutoPlayInterval: (interval) => set({ autoPlayInterval: interval }),
}));

export default useCarouselStore;
