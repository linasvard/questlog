import type { Game } from '../types/game';
import GameCard from './GameCard';

type Props = { games: Game[] };

const GameList = ({ games }: Props) => {
  if (games.length === 0) return <p>No games yet.</p>;

  return (
    <div className="content-width">
      <ul className="grid grid-cols-1 gap-8 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <li key={game.id} className="min-w-0">
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
