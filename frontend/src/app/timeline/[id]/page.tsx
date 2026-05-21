'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://marvelwrap-backend.onrender.com/api/movies/${id}`);
        if (!res.ok) throw new Error('Failed to parse movie dataset');
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('❌ Error loading movie details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchMovieDetails();
  }, [id]);

  if (isLoading) return <div className="p-8 text-neutral-500 font-mono text-center">LOADING MOVIE MODULE...</div>;
  if (!movie) return <div className="p-8 text-red-500 font-mono text-center">MOVIE NOT FOUND</div>;

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/timeline" className="text-xs text-neutral-500 hover:text-red-500 font-mono">← BACK TO TIMELINE</Link>
        
        <div className="border border-neutral-900 bg-neutral-900/20 p-6 rounded-xl">
          <span className="text-xs font-semibold uppercase tracking-wider bg-neutral-800 px-2 py-0.5 rounded text-neutral-400">{movie.phase}</span>
          <h1 className="text-3xl font-black uppercase mt-2">{movie.title}</h1>
          <p className="text-xs text-red-500 font-mono mt-1">Released: {movie.release_year}</p>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed font-light">{movie.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">Attending Characters</h2>
          {movie.characters && movie.characters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {movie.characters.map((char: any) => (
                <Link href={`/characters/${char.id}`} key={char.id} className="block">
                  <div className="border border-neutral-900 bg-neutral-900/40 p-4 rounded-lg hover:border-red-600 hover:bg-neutral-900 transition-all cursor-pointer">
                    <div className="font-bold text-sm text-neutral-200">{char.char_name}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">Played by: {char.actor_name}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-600 font-mono italic">No characters mapped to this film variant yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}