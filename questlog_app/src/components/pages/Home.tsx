import { useEffect, useState } from 'react';
import { getAllGames } from '../../api/games';
import type { Game } from '../../types/game';
import GameList from '../GameList';
import HeroSection from '../HeroSection';
import SearchBar from '../SearchBar';
import StatusFilter, { type Filter } from '../StatusFilter';

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const searchTerm = search.toLowerCase();
  const visibleGames = games
    .filter((game) => filter === 'all' || game.status === filter)
    .filter((game) => game.title.toLowerCase().includes(searchTerm));

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
      <section className="relative z-10 min-h-screen rounded-t-4xl bg-grid p-4">
        <div className="flex content-width mt-8 flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <StatusFilter active={filter} onChange={setFilter} />
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <h2 className="content-width mt-7 font-pixel text-xl">My games</h2>
        <div className="mt-0 mb-10">
          {isLoading && <p>Laddar spel...</p>}
          {error && <p>Något gick fel: {error}</p>}
          {!isLoading && !error && <GameList games={visibleGames} />}
        </div>
      </section>
    </div>
  );
};

export default Home;
