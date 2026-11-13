import { useState } from 'react';
import GameList from '../GameList';
import HeroSection from '../HeroSection';
import SearchBar from '../SearchBar';
import StatusFilter, { type Filter } from '../StatusFilter';
import { useGames } from '../../hooks/useGames';

const Home = () => {
  const { games, isLoading, error } = useGames();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');

  const searchTerm = search.trim().toLowerCase();
  const visibleGames = games
    .filter((game) => filter === 'all' || game.status === filter)
    .filter((game) => game.title.toLowerCase().includes(searchTerm));

  return (
    <div>
      <div className="sticky top-[14%] z-0">
        <HeroSection />
      </div>
      <section className="relative z-10 min-h-screen rounded-t-4xl bg-grid p-4">
        <div className="flex content-width mt-5 flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <StatusFilter active={filter} onChange={setFilter} />
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <h2 className="content-width mt-7 font-pixel text-xl">My games</h2>
        <div className="mt-0 mb-15 md:mb-30">
          {isLoading && <p>Laddar spel...</p>}
          {error && <p>Något gick fel: {error}</p>}
          {!isLoading && !error && <GameList games={visibleGames} />}
        </div>
      </section>
    </div>
  );
};

export default Home;
