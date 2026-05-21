'use client';

import { useEffect } from 'react';
import { useWrapStore } from '../store/useWrapStore';
import SlideAnimation from '../components/SlideAnimation';

const MOCK_SLIDES = [
  { id: 1, title: "Welcome to Your MarvelWrap 🎬", description: "Let's review your epic year inside the MCU multiverse." },
  { id: 2, title: "Time Commitment ⏱️", description: "You spent 4,280 minutes watching superheroes save the cosmos." },
  { id: 3, title: "Your Ultimate Variant 🦸", description: "Your viewing behavior perfectly aligns with Iron Man: Strategic Technologist." },
  { id: 4, title: "Favorite Nexus Era 🌌", description: "You completely dominated Phase 3 (The Infinity Saga) content." },
  { id: 5, title: "See You In the Next Timeline! 🚀", description: "Keep logging your watches to track your future variant paths." }
];

export default function Home() {
  const { currentSlideIndex, setTotalSlides, nextSlide, prevSlide } = useWrapStore();

  useEffect(() => {
    setTotalSlides(MOCK_SLIDES.length);
  }, [setTotalSlides]);

  const activeSlide = MOCK_SLIDES[currentSlideIndex];

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-zinc-950 text-white font-sans p-4 select-none">
      
      {/* Visual Mobile Container Mockup */}
      <div className="relative w-full max-w-md h-[70vh] flex flex-col justify-between bg-gradient-to-br from-red-900/30 via-zinc-950 to-black border border-red-500/20 rounded-3xl p-8 shadow-2xl shadow-red-950/20 overflow-hidden">
        
        {/* Progress Tracker Bars Indicator */}
        <div className="flex gap-1.5 w-full absolute top-4 left-0 px-4 z-10">
          {MOCK_SLIDES.map((_, index) => (
            <div 
              key={index} 
              className="h-1 flex-1 bg-zinc-800 rounded-full overflow-hidden"
            >
              <div 
                className={`h-full bg-red-600 transition-all duration-300 ${index <= currentSlideIndex ? 'w-full' : 'w-0'}`}
              />
            </div>
          ))}
        </div>

        {/* Cinematic Animated Content Window Container */}
        <div className="flex-1 flex items-center justify-center">
          <SlideAnimation slideIndex={currentSlideIndex}>
            <div className="text-center space-y-4 px-2">
              <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-600 uppercase drop-shadow-md">
                {activeSlide?.title}
              </h1>
              <p className="text-zinc-300 text-lg max-w-xs font-semibold leading-relaxed">
                {activeSlide?.description}
              </p>
            </div>
          </SlideAnimation>
        </div>

        {/* Navigation Action Layer Hooks */}
        <div className="flex justify-between items-center w-full mt-4 z-10">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 disabled:opacity-20 disabled:pointer-events-none rounded-xl font-bold transition-all text-sm"
          >
            ← Back
          </button>
          
          <span className="text-zinc-600 text-xs font-mono font-bold tracking-widest">
            {currentSlideIndex + 1} / {MOCK_SLIDES.length}
          </span>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === MOCK_SLIDES.length - 1}
            className="px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 disabled:opacity-20 disabled:pointer-events-none rounded-xl font-bold transition-all text-sm shadow-lg shadow-red-900/40"
          >
            Advance →
          </button>
        </div>
      </div>
    </main>
  );
}