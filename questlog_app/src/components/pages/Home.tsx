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
      <div className="sticky top-20 z-0">
        <HeroSection />
      </div>

      <section className="relative content-width z-10 min-h-screen rounded-t-3xl bg-dark p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
        <div className="p-3">
          <h2>My games</h2>
          {isLoading && <p>Laddar spel...</p>}
          {error && <p>Något gick fel: {error}</p>}
          {!isLoading && !error && <GameList games={games} />}
        </div>
      </section>
    </div>
  );
};

export default Home;
