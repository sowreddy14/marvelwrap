'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Existing Movie Fields
  const [title, setTitle] = useState('');
  const [phase, setPhase] = useState('Phase 1');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  // New Character Fields
  const [charName, setCharName] = useState('');
  const [actorName, setActorName] = useState('');
  const [biography, setBiography] = useState('');

  // Junction Dropdown Selection Tracking States
  const [moviesList, setMoviesList] = useState<Array<{ id: string; title: string; release_year: number }>>([]);
  const [charsList, setCharsList] = useState<Array<{ id: string; char_name: string }>>([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedCharId, setSelectedCharId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize dynamic selector lists when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDropdownData();
    }
  }, [isAuthenticated]);

  const fetchDropdownData = async () => {
    try {
      const mRes = await fetch('https://marvelwrap-backend.onrender.com/api/movies');
      const cRes = await fetch('https://marvelwrap-backend.onrender.com/api/characters');
      if (mRes.ok) setMoviesList(await mRes.json());
      if (cRes.ok) setCharsList(await cRes.json());
    } catch (err) {
      console.error('Error fetching baseline drop lists', err);
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'SHIELD_2026') {
      setIsAuthenticated(true);
    } else {
      alert('❌ Access Denied: Invalid Security Passcode.');
    }
  };

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://marvelwrap-backend.onrender.com/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, phase, year, description, passcode })
      });
      if (!res.ok) throw new Error('Failed to save movie blueprint');
      alert(`🎉 Movie "${title}" added successfully!`);
      setTitle(''); setYear(''); setDescription('');
      fetchDropdownData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    }
    setIsSubmitting(false);
  };

  const handleAddCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://marvelwrap-backend.onrender.com/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ char_name: charName, actor_name: actorName, biography, passcode })
      });
      if (!res.ok) throw new Error('Failed to save character schema');
      alert(`🎉 Character "${charName}" created successfully!`);
      setCharName(''); setActorName(''); setBiography('');
      fetchDropdownData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    }
    setIsSubmitting(false);
  };

  const handleLinkRelationship = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMovieId || !selectedCharId) return alert('Select both nodes first.');
    setIsSubmitting(true);
    try {
      const res = await fetch('https://marvelwrap-backend.onrender.com/api/movies/link-character', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie_id: selectedMovieId, character_id: selectedCharId, passcode })
      });
      if (!res.ok) throw new Error('Failed to create relational link');
      alert('⚡ Successfully linked character to movie inside junction index!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      alert(msg);
    }
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
        <div className="border border-neutral-900 bg-neutral-950 p-8 rounded-lg max-w-sm w-full text-center shadow-2xl">
          <div className="text-3xl mb-4">🔒</div>
          <h1 className="text-xl font-bold uppercase tracking-wider mb-2">Secure Command Deck</h1>
          <form onSubmit={handleVerification} className="space-y-4">
            <input type="password" placeholder="Enter Admin Passcode" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-sm text-center tracking-widest text-white focus:outline-none focus:border-red-600" />
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 text-xs tracking-widest uppercase rounded">Verify Identity</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-black uppercase tracking-tight text-red-500">Multiverse Node Manager</h1>
          <button onClick={() => router.push('/timeline')} className="text-xs font-mono text-neutral-500 hover:text-white">← VIEW TIMELINE</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form A: Add Movies */}
          <form onSubmit={handleAddMovie} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">📦 Construct Film Node</h2>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Movie Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">MCU Phase</label>
                <select value={phase} onChange={(e) => setPhase(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none">
                  <option>Phase 1</option><option>Phase 2</option><option>Phase 3</option><option>Phase 4</option><option>Phase 5</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Release Year</label>
                <input type="number" required value={year} onChange={(e) => setYear(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Synopsis</label>
              <textarea rows={3} required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none resize-none" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold text-xs uppercase tracking-wider disabled:opacity-40">Commit Movie</button>
          </form>

          {/* Form B: Add Characters */}
          <form onSubmit={handleAddCharacter} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl space-y-4">
            <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest border-b border-neutral-800 pb-2">🦸 Construct Character Profile</h2>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Character Alias Name</label>
              <input type="text" required value={charName} onChange={(e) => setCharName(e.target.value)} placeholder="e.g., Tony Stark / Iron Man" className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Casting Actor Name</label>
              <input type="text" required value={actorName} onChange={(e) => setActorName(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Biography Dossier</label>
              <textarea rows={3} required value={biography} onChange={(e) => setBiography(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none resize-none" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold text-xs uppercase tracking-wider disabled:opacity-40">Commit Character</button>
          </form>
        </div>

        {/* Junction Link Form */}
        <form onSubmit={handleLinkRelationship} className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl max-w-xl mx-auto space-y-4">
          <h2 className="text-sm font-mono text-emerald-500 uppercase tracking-widest border-b border-neutral-800 pb-2 text-center">🔗 Relational Cross-Link Bridge</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Select Target Movie</label>
              <select value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none">
                <option value="">-- Choose Movie --</option>
                {moviesList.map(m => <option key={m.id} value={m.id}>{m.title} ({m.release_year})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">Select Appearing Character</label>
              <select value={selectedCharId} onChange={(e) => setSelectedCharId(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm text-white focus:outline-none">
                <option value="">-- Choose Character --</option>
                {charsList.map(c => <option key={c.id} value={c.id}>{c.char_name}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 py-3 rounded font-bold text-xs uppercase tracking-widest disabled:opacity-40">Bind Identity to Movie Matrix</button>
        </form>
      </div>
    </main>
  );
}