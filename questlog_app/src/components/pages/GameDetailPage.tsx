import { useNavigate, useParams } from 'react-router';
import { getGame } from '../../api/games';
import { useEffect, useState } from 'react';
import type { Game } from '../../types/game';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      setLoading(true);
      try {
        const data = await getGame(gameId);
        setGame(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (loading) return <p>Loading game...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div>
      <h1>This is {game.title}</h1>
      <img src={game.coverUrl} alt={`${game.title} cover`} />
      <button onClick={() => navigate(`/games/${game.id}/edit`)}>
        Edit game
      </button>
    </div>
  );
};

export default GameDetailPage;
