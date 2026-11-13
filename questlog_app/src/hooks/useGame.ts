import { useEffect, useState } from 'react';
import { getGame } from '../api/games';
import { getGameExtra, type GameExtra } from '../api/extras';
import type { Game } from '../types/game';

export const useGame = (gameId?: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [extra, setExtra] = useState<GameExtra | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      setIsLoading(true);
      setError('');
      try {
        const [gameData, extraData] = await Promise.all([
          getGame(gameId),
          getGameExtra(gameId).catch(() => null), // Ignore errors for extra data
        ]);
        setGame(gameData);
        setExtra(extraData);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchGame();
  }, [gameId]);
  return { game, extra, isLoading, error };
};
