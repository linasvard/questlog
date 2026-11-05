import { useEffect, useState } from 'react';
import { getAllGames } from '../../api/games';
import type { Game } from '../../types/game';
import GameList from '../GameList';
import HeroSection from '../HeroSection';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const data = await getAllGames();
        setGames(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-0">
        <HeroSection />
      </div>

      <div className="relative z-10 min-h-screen rounded-t-3xl bg-grid p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <h2>My games</h2>
        {isLoading && <p>Laddar spel...</p>}
        {error && <p>Något gick fel: {error}</p>}
        {!isLoading && !error && <GameList games={games} />}
      </div>
    </div>
  );
};

export default Home;
