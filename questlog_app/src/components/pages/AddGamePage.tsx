import { addGame } from '../../api/games';
import type { GameFormValues } from '../../types/game';
import GameForm from '../GameForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { saveGameExtra } from '../../api/extras';

const AddGamePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const handleCreate = async (values: GameFormValues) => {
    const { categories, inGameUrl, ...gameValues } = values;

    try {
      const newGame = await addGame(gameValues);

      if (categories.length > 0 || inGameUrl) {
        await saveGameExtra(newGame.id, { categories, inGameUrl });
      }

      navigate('/');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };
  return (
    <div className="md:p-4 content-width">
      <h1
        className="text-center text-xl uppercase p-3
bg-green shadow border-[3px] border-dark text-heading mb-5">
        Add game
      </h1>
      {message && <p role="status">❌ {message}</p>}
      <GameForm
        submitLabel="Add game"
        onSubmit={handleCreate}
        onCancel={() => navigate('/')}
      />
    </div>
  );
};

export default AddGamePage;
