import { useParams, Link } from 'react-router';
import { getGame } from '../../api/games';
import { useEffect, useState } from 'react';
import type { Game } from '../../types/game';
import { STATUS_COLORS } from '../../types/game';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
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
    <section className="content-width">
      <h1>{game.title}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-auto rounded-lg block border-[3px]  border-black bg-light text-black shadow">
          <article className="flex h-full flex-col ">
            <div
              className={`flex items-center justify-between gap-2 border-b-[3px] border-black px-3 py-2 ${STATUS_COLORS[game.status]}`}>
              <h3 className="truncate font-bold uppercase">{game.title}</h3>
              <div className="flex shrink-0 gap-1" aria-hidden="true">
                <span className="size-3 border-2 border-dark-alt bg-green" />
                <span className="size-3 border-2 border-dark-alt bg-yellow" />
                <span className="size-3 border-2 border-dark-alt bg-red" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              {game.coverUrl ? (
                <img
                  className="w-full border-[3px] border-black object-cover"
                  src={game.coverUrl}
                  alt={`${game.title} cover`}
                />
              ) : (
                <div className="flex aspect-3/4 w-full items-center justify-center border-[3px] border-dashed border-black/40 text-black/50">
                  No cover
                </div>
              )}
            </div>
          </article>
        </div>
        <div>
          <div>GameImg2</div>
          <div>Här kommer annan information</div>
        </div>
      </div>
      <div>
        <h2>Reviews</h2>
        <p>No reviews yet.</p>
      </div>
      <Link to={`/games/${game.id}/edit`}>Edit Game</Link>
    </section>
  );
};

export default GameDetailPage;
