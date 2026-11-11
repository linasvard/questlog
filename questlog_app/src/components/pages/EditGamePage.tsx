import { useNavigate, useParams } from 'react-router';
import { deleteGame, getGame, updateGame } from '../../api/games';
import {
  deleteGameExtra,
  getGameExtra,
  saveGameExtra,
  type GameExtra,
} from '../../api/extras';
import { useEffect, useState } from 'react';
import { type Game, type GameFormValues } from '../../types/game';
import GameForm from '../GameForm';

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [game, setGame] = useState<Game | null>(null);
  const [extra, setExtra] = useState<GameExtra | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      setIsLoading(true);
      try {
        const data = await getGame(gameId);
        setGame(data);
        try {
          setExtra(await getGameExtra(gameId));
        } catch {
          setExtra(null);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleSave = async (values: GameFormValues) => {
    if (!gameId) return;
    const { categories, inGameUrl, ...gameValues } = values;
    try {
      await updateGame(gameId, gameValues);
      await saveGameExtra(gameId, { categories, inGameUrl });
      navigate(`/games/${gameId}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleDelete = async () => {
    if (!gameId) return;
    if (!confirm(`Delete ${game?.title}?`)) return;
    try {
      await deleteGame(gameId);
      await deleteGameExtra(gameId);
      navigate('/');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (isLoading) return <p>Loading game...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-center content-width">Edit game</h1>
      {isLoading && <p>Loading game...</p>}
      {message && <p role="status">{message}</p>}

      <GameForm
        initialValues={{
          title: game.title,
          platform: game.platform,
          status: game.status,
          rating: game.rating,
          coverUrl: game.coverUrl ?? '',
          notes: game.notes ?? '',
          categories: extra?.categories ?? [],
          inGameUrl: extra?.inGameUrl ?? '',
        }}
        submitLabel="Save"
        onSubmit={handleSave}
        onCancel={() => navigate(`/games/${gameId}`)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EditGamePage;
