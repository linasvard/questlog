import { addGame } from '../../api/games';
import type { GameFormValues } from '../../types/game';
import GameForm from '../GameForm';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const AddGamePage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const handleCreate = async (values: GameFormValues) => {
    try {
      await addGame(values);
      navigate('/');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unknown error');
    }
  };
  return (
    <div className="p-6">
      <h1>Add game</h1>
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
