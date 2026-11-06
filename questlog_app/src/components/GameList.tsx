import type { Game } from '../types/game';
import GameCard from './GameCard';

type Props = { games: Game[] };

const GameList = ({ games }: Props) => {
  if (games.length === 0) return <p>No games yet.</p>;

  return (
    <ul className="content-width grid gap-9 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <li key={game.id}>
          <GameCard game={game} />
        </li>
      ))}
    </ul>
  );
};

export default GameList;
