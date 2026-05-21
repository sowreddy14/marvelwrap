'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimationProps {
  children: ReactNode;
  slideIndex: number;
}

export default function SlideAnimation({ children, slideIndex }: AnimationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* AnimatePresence listens to when components unmount and applies exit animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex} // Changing the key triggers a fresh animation lifecycle
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }} // Smooth cinematic easing curve
          className="w-full h-full flex flex-col justify-center items-center"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}