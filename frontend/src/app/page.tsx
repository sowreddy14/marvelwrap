'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden text-white select-none">
      {/* Cinematic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />

      {/* Content Container */}
      <div className="text-center z-10 max-w-2xl px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-sans bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500"
        >
          Marvel<span className="text-red-600 drop-shadow-[0_0_35px_rgba(220,38,38,0.3)]">Wrap</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-neutral-400 font-light tracking-wide"
        >
          Your cinematic journey across the sacred timeline. Analyze your metrics, track the phases, and unlock your viewing universe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10"
        >
          <Link href="/timeline">
            <button className="relative group px-8 py-4 bg-red-600 text-white font-bold tracking-widest uppercase rounded-md text-sm border border-red-500 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.2)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(220,38,38,0.5)]">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Enter the Timeline ⚡
              </span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="absolute bottom-6 text-xs text-neutral-600 tracking-widest uppercase font-mono">
        SECURE GATE // SYSTEM ONLINE
      </div>
    </main>
  );
}