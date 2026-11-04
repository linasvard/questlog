import { API_URL } from '../config';
import type { Game, GameStatus } from '../types/game';

export type NewGame = { title: string; platform: string; status: GameStatus };

export type UpdateGame = {
  title?: string;
  platform?: string;
  status?: GameStatus;
  rating?: number | null;
  coverUrl?: string;
  notes?: string;
};

// GET All games for the user
export const getAllGames = async () => {
  const response = await fetch(`${API_URL}/games`);
  if (!response.ok) {
    throw new Error(`Failed to fetch games (${response.status})`);
  }
  const data: Game[] = await response.json();
  return data;
};

// GET a single game by ID
export const getGame = async (id: string) => {
  const response = await fetch(`${API_URL}/games/${id}`);
  if (response.status === 404) {
    throw new Error(`Game with ID ${id} not found`);
  }
  if (!response.ok) {
    throw new Error(`Could not fetch game with ID ${id} (${response.status})`);
  }

  const data: Game = await response.json();
  return data;
};

// POST a new game
export const addGame = async (game: NewGame) => {
  const response = await fetch(`${API_URL}/games`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(game),
  });
  if (!response.ok) {
    throw new Error(`Failed to add game (${response.status})`);
  }
  const data: Game = await response.json();
  return data;
};

// PATCH an existing game by ID
export const updateGame = async (id: string, changes: UpdateGame) => {
  const response = await fetch(`${API_URL}/games/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) {
    throw new Error(`Failed to update game with ID ${id} (${response.status})`);
  }
  const data: Game = await response.json();
  return data;
};

// DELETE a game by ID
export const deleteGame = async (id: string) => {
  const response = await fetch(`${API_URL}/games/${id}`, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`Failed to delete game with ID ${id} (${response.status})`);
  }
};
