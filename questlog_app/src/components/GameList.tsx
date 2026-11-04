import type { Game } from '../types/game';
import GameCard from './GameCard';

type Props = { games: Game[] };

const GameList = ({ games }: Props) => {
  if (games.length === 0) return <p>No games yet.</p>;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game} />
        </li>
      ))}
    </ul>
  );
};

export default GameList;
