import { Link } from 'react-router';
import { STATUS_COLORS, type Game } from '../types/game';
import { capitalize } from '../utils/format';

type Props = { game: Game };

const GameCard = ({ game }: Props) => {
  return (
    <Link
      className="block w-full border-[3px]  border-black bg-light text-black shadow transition-transform hover:translate-x-0.2 hover:translate-y-0.2 hover:shadow"
      to={`/games/${game.id}`}>
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

          <p className="font-semibold uppercase">{game.platform}</p>

          <div className="flex items-center justify-between">
            <span className="border-2 border-black bg-yellow px-2 py-0.5 text-sm font-bold uppercase">
              {game.status === 'want'
                ? 'Want to play'
                : capitalize(game.status)}
            </span>
            {game.rating !== null && (
              <span
                className="font-bold"
                aria-label={`Rating ${game.rating} of 5`}>
                {'★'.repeat(game.rating)}
                <span className="text-black/20">
                  {'★'.repeat(5 - game.rating)}
                </span>
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default GameCard;
