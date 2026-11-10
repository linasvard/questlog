export type GameStatus = 'want' | 'playing' | 'completed' | 'dropped';

export type Game = {
  id: string;
  title: string;
  platform: string;
  status: GameStatus;
  rating: number | null;
  coverUrl?: string;
  notes?: string;
};

export const STATUSES: GameStatus[] = [
  'want',
  'playing',
  'completed',
  'dropped',
];

export type GameFormValues = {
  title: string;
  platform: string;
  status: GameStatus;
  rating: number | null;
  coverUrl: string;
  notes: string;
  categories: string[];
  inGameUrl: string;
};

export const STATUS_COLORS = {
  want: 'bg-blue',
  playing: 'bg-pink',
  completed: 'bg-green',
  dropped: 'bg-orange',
  all: 'bg-yellow',
};
