import { useParams, Link } from 'react-router';
import { useGame } from '../../hooks/useGame';
import RetroWindow from '../RetroWindow';
import StarRating from '../StarRating';
import { STATUS_COLORS } from '../../types/game';
import EditIcon from '../../assets/icons/EditIcon';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { game, extra, isLoading, error } = useGame(gameId);

  if (isLoading) return <p>Loading game...</p>;
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
              <div className="md:aspect-square aspect-auto font-bold text-md">
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
                  <p className="self-start border-2 border-black bg-yellow px-2 py-1 font-bold uppercase">
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

      <div className="my-6 mt-8 flex justify-between">
        <Link className="btn mr-4" to="/">
          ← Go back
        </Link>
        <Link className="btn-link" to={`/games/${game.id}/edit`}>
          <EditIcon aria-hidden="true" className="w-4.5 h-auto -mr-2.5" /> Edit
          game
        </Link>
      </div>
    </section>
  );
};

export default GameDetailPage;
