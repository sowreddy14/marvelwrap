'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CharacterDetailsPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const res = await fetch(`https://marvelwrap-backend.onrender.com/api/characters/${id}`);
        if (!res.ok) throw new Error('Failed to parse hero profile context');
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        console.error('❌ Error loading character details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchCharacterDetails();
  }, [id]);

  if (isLoading) return <div className="p-8 text-neutral-500 font-mono text-center">LOADING HERO PROFILE...</div>;
  if (!character) return <div className="p-8 text-red-500 font-mono text-center">CHARACTER NOT FOUND</div>;

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/timeline" className="text-xs text-neutral-500 hover:text-red-500 font-mono">← BACK TO TIMELINE</Link>
        
        <div className="border border-neutral-900 bg-neutral-900/20 p-6 rounded-xl">
          <h1 className="text-3xl font-black uppercase text-red-500">{character.char_name}</h1>
          <p className="text-xs text-neutral-400 font-mono mt-1">Portrayed by: <span className="text-white font-sans font-bold">{character.actor_name}</span></p>
          <p className="text-neutral-400 text-sm mt-4 leading-relaxed font-light whitespace-pre-line">{character.biography}</p>
        </div>

        <div>
          <h2 className="text-sm font-mono text-neutral-500 uppercase tracking-widest mb-3">Filmography Appearance Map</h2>
          {character.movies && character.movies.length > 0 ? (
            <div className="space-y-2">
              {character.movies.map((movie: any) => (
                <Link href={`/timeline/${movie.id}`} key={movie.id} className="block">
                  <div className="border border-neutral-900 bg-neutral-900/40 p-4 rounded-lg flex justify-between items-center hover:border-neutral-700 hover:bg-neutral-900 transition-all cursor-pointer">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono mr-2">{movie.phase}</span>
                      <span className="text-sm font-bold text-neutral-200">{movie.title}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">{movie.release_year}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-600 font-mono italic">No movies linked to this character asset yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}