import { useParams, Link } from 'react-router';
import { useGame } from '../../hooks/useGame';
import RetroWindow from '../RetroWindow';
import StarRating from '../StarRating';
import { STATUS_COLORS } from '../../types/game';
import EditIcon from '../../assets/icons/EditIcon';
import Badge from '../Badge';
import ImagePlaceholder from '../ImagePlaceholder';
import Loader from '../Loader';

const GameDetailPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { game, extra, isLoading, error } = useGame(gameId);

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
        <Loader label="Loading game..." />
      </div>
    );
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
            <ImagePlaceholder />
          )}
        </RetroWindow>

        <div className="relative">
          <div className="flex flex-col gap-6 md:absolute md:inset-0">
            <RetroWindow title="In game" barColor="bg-pink" className="flex-1">
              {extra?.inGameUrl ? (
                <img
                  className="aspect-3/2 min-h-0 w-full flex-1 border-[3px] border-black object-cover md:aspect-auto"
                  src={extra.inGameUrl}
                  alt={`${game.title} in game`}
                />
              ) : (
                <ImagePlaceholder
                  text="No in-game image"
                  className="aspect-3/2 min-h-0 flex-1 md:aspect-auto"
                />
              )}
            </RetroWindow>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="md:aspect-square aspect-auto font-bold text-md">
                <RetroWindow title="Game info" barColor="bg-green">
                  {extra && extra.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {extra.categories.map((category) => (
                        <Badge key={category} color="bg-pink">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p>No categories</p>
                  )}
                  <Badge color="bg-yellow" className="self-start mb-3 mt-1">
                    {game.platform}
                  </Badge>
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
