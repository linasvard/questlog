import { useEffect, useState } from 'react';
import { getAllGames } from '../../api/games';
import type { Game } from '../../types/game';
import GameList from '../GameList';

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
    <div className="p-6">
      <h1>My games</h1>

      {isLoading && <p>Laddar spel...</p>}
      {error && <p>Något gick fel: {error}</p>}
      {!isLoading && !error && <GameList games={games} />}
    </div>
  );
};

export default Home;
