import { Link } from 'react-router';
import { STATUS_COLORS, type Game } from '../types/game';
import { capitalize } from '../utils/format';
import RetroWindow from './RetroWindow';
import StarRating from './StarRating';
import Badge from './Badge';
import ImagePlaceholder from './ImagePlaceholder';

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
          <ImagePlaceholder />
        )}

        <p className="font-semibold uppercase">{game.platform}</p>

        <div className="flex items-center justify-between">
          <Badge color="bg-yellow">
            {game.status === 'want' ? 'Want to play' : capitalize(game.status)}
          </Badge>
          <StarRating rating={game.rating} className="size-4" />
        </div>
      </RetroWindow>
    </Link>
  );
};

export default GameCard;
