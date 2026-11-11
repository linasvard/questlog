import { Link } from 'react-router';
import { STATUS_COLORS, type Game } from '../types/game';
import { capitalize } from '../utils/format';
import RetroWindow from './RetroWindow';
import StarRating from './StarRating';

type Props = { game: Game };

const GameCard = ({ game }: Props) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="block transition-transform hover:translate-x-0.5 hover:translate-y-0.5">
      <RetroWindow title={game.title} barColor={STATUS_COLORS[game.status]}>
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
            {game.status === 'want' ? 'Want to play' : capitalize(game.status)}
          </span>
          <StarRating rating={game.rating} className="size-5" />
        </div>
      </RetroWindow>
    </Link>
  );
};

export default GameCard;
