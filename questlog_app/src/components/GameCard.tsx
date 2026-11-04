import { Link } from 'react-router';
import type { Game } from '../types/game';

type Props = { game: Game };

const GameCard = ({ game }: Props) => {
  return (
    <Link to={`/games/${game.id}`}>
      <article>
        {game.coverUrl && (
          <img
            className="w-full h-auto rounded-lg object-cover"
            src={game.coverUrl}
            alt={`${game.title} cover`}
          />
        )}
        <h2>{game.title}</h2>
        <p>Platform: {game.platform}</p>
        <p>Status: {game.status}</p>
        {game.rating !== null && <p>Rating: {game.rating}/10</p>}
        {game.notes && <p>Notes: {game.notes}</p>}
      </article>
    </Link>
  );
};

export default GameCard;
