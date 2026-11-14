import { useNavigate, useParams } from 'react-router';
import { useSaveGame } from '../../hooks/useSaveGame';
import { type GameFormValues } from '../../types/game';
import GameForm from '../GameForm';
import { useGame } from '../../hooks/useGame';
import Loader from '../Loader';

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const { editGame, removeGame, error: saveError } = useSaveGame();
  const { game, extra, isLoading, error } = useGame(gameId);

  const handleSave = async (values: GameFormValues) => {
    if (!gameId) return;
    const updated = await editGame(gameId, values);
    if (updated) navigate(`/games/${gameId}`);
  };

  const handleDelete = async () => {
    if (!gameId) return;
    if (!confirm(`Delete ${game?.title}?`)) return;
    const deleted = await removeGame(gameId);
    if (deleted) navigate('/');
  };

  if (isLoading) return <Loader label="Loading game..." />;
  if (error) return <p>Error: {error}</p>;
  if (!game) return <p>Game not found.</p>;

  return (
    <div className="content-width">
      <h1
        className="text-center text-xl uppercase p-3
bg-light shadow border-[3px] border-dark text-dark text-heading mb-5">
        Edit game
      </h1>
      {saveError && <p role="status">❌ {saveError}</p>}

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
