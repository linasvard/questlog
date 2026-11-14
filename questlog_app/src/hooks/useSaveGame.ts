import { useState } from 'react';
import type { GameFormValues } from '../types/game';
import { addGame, deleteGame, updateGame } from '../api/games';
import { deleteGameExtra, saveGameExtra } from '../api/extras';

export const useSaveGame = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const run = async <T>(action: () => Promise<T>) => {
    setIsSaving(true);
    setError('');

    try {
      return await action();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknown error');
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const createGame = (values: GameFormValues) =>
    run(async () => {
      const { categories, inGameUrl, ...gameValues } = values;
      const newGame = await addGame(gameValues);
      if (categories.length > 0 || inGameUrl) {
        await saveGameExtra(newGame.id, { categories, inGameUrl });
      }
      return newGame;
    });

  const editGame = (gameId: string, values: GameFormValues) =>
    run(async () => {
      const { categories, inGameUrl, ...gameValues } = values;
      const updatedGame = await updateGame(gameId, gameValues);
      await saveGameExtra(gameId, { categories, inGameUrl });
      return updatedGame;
    });

  const removeGame = (gameId: string) =>
    run(async () => {
      await deleteGame(gameId);
      await deleteGameExtra(gameId);
      return true;
    });

  return { createGame, editGame, removeGame, isSaving, error };
};
