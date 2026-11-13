import { useParams, Link } from 'react-router';
import { getGame } from '../../api/games';
import { useEffect, useState } from 'react';
import type { Game } from '../../types/game';
import RetroWindow from '../RetroWindow';
import { getGameExtra, type GameExtra } from '../../api/extras';
import StarRating from '../StarRating';
import { STATUS_COLORS } from '../../types/game';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<Game | null>(null);
  const [error, setError] = useState('');
  const [extra, setExtra] = useState<GameExtra | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      setLoading(true);
      try {
        const [data, extraData] = await Promise.all([
          getGame(gameId),
          getGameExtra(gameId).catch(() => null), // Ignore errors for extra data
        ]);
        setGame(data);
        setExtra(extraData);
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
    <section className="content-width px-5 md:px-2">
      <h1
        className={`text-center text-xl uppercase p-3 ${STATUS_COLORS[game.status]} shadow border-[3px] border-dark text-heading mb-5`}>
        {game.title}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <RetroWindow title="Game cover" barColor="bg-yellow">
          {game.coverUrl ? (
            <img
              className="w-full border-[3px] border-black"
              src={game.coverUrl}
              alt={`${game.title} cover`}
            />
          ) : (
            <div className="flex aspect-3/4 w-full items-center justify-center border-[3px] border-dashed border-black/40 text-black/50">
              No cover
            </div>
          )}
        </RetroWindow>

        <div className="relative">
          <div className="flex flex-col gap-6 md:absolute md:inset-0">
            <RetroWindow title="In game" barColor="bg-pink" className="flex-1">
              <img
                className="aspect-3/2 w-full min-h-0 flex-1 border-[3px] border-black object-cover md:aspect-auto"
                src={extra?.inGameUrl || game.coverUrl}
                alt={`${game.title} in game`}
              />
            </RetroWindow>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="md:aspect-square aspect-auto">
                <RetroWindow title="Game info" barColor="bg-green">
                  {extra && extra.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {extra.categories.map((category) => (
                        <span
                          key={category}
                          className="border-2 border-black bg-pink px-2 py-0.5 font-bold uppercase">
                          {category}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No categories</p>
                  )}
                  <p className="self-start border-2 border-black bg-yellow px-2 py-1 text-sm font-bold uppercase">
                    {game.platform}
                  </p>
                  <div className="mt-auto mb-2">
                    <StarRating rating={game.rating} className="size-8" />
                  </div>
                </RetroWindow>
              </div>
              <div className="md:aspect-square aspect-auto">
                <RetroWindow title="Notes" barColor="bg-orange">
                  <div className="flex min-h-0 flex-1 items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center p-4 pb-5 md:pb-11">
                      <p className="min-h-0 p-2 overflow-auto font-pixel-2">
                        {game.notes || 'No notes yet.'}
                      </p>
                    </div>
                  </div>
                </RetroWindow>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 mt-8 flex justify-center md:justify-end">
        <Link className="btn" to={`/games/${game.id}/edit`}>
          Edit game
        </Link>
      </div>
    </section>
  );
};

export default GameDetailPage;
