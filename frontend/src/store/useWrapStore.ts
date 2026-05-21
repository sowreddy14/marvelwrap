import { create } from 'zustand';

interface WrapState {
  currentSlideIndex: number;
  totalSlides: number;
  nextSlide: () => void;
  prevSlide: () => void;
  setTotalSlides: (count: number) => void;
}

// Initialize our global slide controller store
export const useWrapStore = create<WrapState>((set) => ({
  currentSlideIndex: 0,
  totalSlides: 0,
  
  nextSlide: () => set((state) => ({ 
    currentSlideIndex: Math.min(state.currentSlideIndex + 1, state.totalSlides - 1) 
  })),
  
  prevSlide: () => set((state) => ({ 
    currentSlideIndex: Math.max(state.currentSlideIndex - 1, 0) 
  })),
  
  setTotalSlides: (count: number) => set({ totalSlides: count }),
}));