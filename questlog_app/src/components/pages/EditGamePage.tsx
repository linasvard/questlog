import { useNavigate, useParams } from 'react-router';
import { deleteGame, updateGame } from '../../api/games';
import { deleteGameExtra, saveGameExtra } from '../../api/extras';
import { useState } from 'react';
import { type GameFormValues } from '../../types/game';
import GameForm from '../GameForm';
import { useGame } from '../../hooks/useGame';

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const { game, extra, isLoading, error } = useGame(gameId);

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
      {message && <p role="status">❌ {message}</p>}

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
