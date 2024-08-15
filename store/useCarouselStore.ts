import create from 'zustand';

interface CarouselState {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  nextImage: (length: number) => void;
  prevImage: (length: number) => void;
}

const useCarouselStore = create<CarouselState>((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index) => set({ currentIndex: index }),
  nextImage: (length) =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % length,
    })),
  prevImage: (length) =>
    set((state) => ({
      currentIndex: (state.currentIndex - 1 + length) % length,
    })),
}));

export default useCarouselStore;
