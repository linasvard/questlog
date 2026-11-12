import { STATUS_COLORS, STATUSES, type GameStatus } from '../types/game';

export type Filter = GameStatus | 'all';

type StatusFilterProps = { active: Filter; onChange: (filter: Filter) => void };

const StatusFilter = ({ active, onChange }: StatusFilterProps) => {
  const filters: Filter[] = ['all', ...STATUSES];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="text-light">Browse by:</p>
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`btn text-sm ${isActive ? STATUS_COLORS[filter] : ''}`}>
            {filter === 'want' ? 'Want to play' : filter}
          </button>
        );
      })}
    </div>
  );
};

export default StatusFilter;
