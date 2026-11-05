import { useEffect, useState } from 'react';
import { getAllGames } from '../../api/games';
import type { Game } from '../../types/game';
import GameList from '../GameList';
import HeroSection from '../HeroSection';
import StatusFilter, { type Filter } from '../StatusFilter';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const visibleGames =
    filter === 'all' ? games : games.filter((game) => game.status === filter);

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
      <section className="relative z-10min-h-screen rounded-t-4xl bg-dark-alt p-4">
        <h2 className="mb-4">My games</h2>
        <StatusFilter active={filter} onChange={setFilter} />

        <div className="mt-8">
          {isLoading && <p>Laddar spel...</p>}
          {error && <p>Något gick fel: {error}</p>}
          {!isLoading && !error && <GameList games={visibleGames} />}
        </div>
      </section>
    </div>
  );
};

export default Home;
