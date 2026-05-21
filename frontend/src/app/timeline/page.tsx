'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  phase: string;
  release_year: number;
  description: string;
}

export default function TimelinePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch('https://marvelwrap-backend.onrender.com/api/movies');
        if (!response.ok) throw new Error('Network response failed.');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('❌ Failed fetching production timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-16 px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight uppercase">The Sacred Timeline</h1>
            <p className="text-neutral-400 text-sm mt-1">Chronological manifestation of the MCU multiverse</p>
          </div>
          <Link href="/admin">
            <button className="px-4 py-2 border border-neutral-800 text-xs tracking-widest text-neutral-400 hover:text-white hover:border-red-600 rounded transition-colors uppercase font-mono">
              Admin Access 🔑
            </button>
          </Link>
        </div>

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="text-center py-20 text-neutral-500 font-mono text-sm animate-pulse">
            🌐 SYNCHRONIZING WITH SACRED TIMELINE METRICS...
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-900 rounded-xl bg-neutral-900/20">
            <p className="text-neutral-500 text-sm">The timeline is currently blank.</p>
            <Link href="/admin">
              <button className="mt-4 text-xs text-red-500 underline hover:text-red-400">Add the first movie entry</button>
            </Link>
          </div>
        ) : (
          /* The Interactive Timeline Track */
          <div className="relative border-l border-neutral-800 ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
            {movies.map((movie, index) => (
              <motion.div 
                key={movie.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                className="relative group"
              >
                {/* Node Dot */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 bg-neutral-950 border-2 border-neutral-700 rounded-full group-hover:border-red-500 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-transparent group-hover:bg-red-500 rounded-full transition-colors" />
                </div>

                {/* Content Card Linked to Dynamic Profile */}
                <Link href={`/timeline/${movie.id}`}>
                  <div className="bg-neutral-900/40 border border-neutral-900 rounded-lg p-6 hover:border-red-500 hover:bg-neutral-900 transition-all duration-300 cursor-pointer block">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-red-500 transition-colors">{movie.title}</h3>
                      <span className="px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-neutral-800 text-neutral-300 rounded">
                        {movie.phase}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-red-500/80 mt-1">{movie.release_year}</div>
                    <p className="text-neutral-400 text-sm mt-3 font-light leading-relaxed">{movie.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}