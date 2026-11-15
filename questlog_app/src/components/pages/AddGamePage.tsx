import type { GameFormValues } from '../../types/game';
import { useSaveGame } from '../../hooks/useSaveGame';
import GameForm from '../GameForm';
import { useNavigate } from 'react-router';
import ErrorMessage from '../ErrorMessage';

const AddGamePage = () => {
  const navigate = useNavigate();
  const { createGame, error } = useSaveGame();

  const handleCreate = async (values: GameFormValues) => {
    const newGame = await createGame(values);
    if (newGame)
      navigate(`/games/${newGame.id}`, { state: { toast: 'Game added!' } });
  };
  return (
    <div className="md:p-4 content-width">
      <h1
        className="text-center text-xl uppercase p-3
bg-green shadow border-[3px] border-dark text-dark text-heading mb-5">
        Add game
      </h1>
      {error && <ErrorMessage message={error} showBackLink />}
      <GameForm
        submitLabel="Add game"
        onSubmit={handleCreate}
        onCancel={() => navigate('/')}
      />
    </div>
  );
};

export default AddGamePage;
