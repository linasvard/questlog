export type GameExtra = {
  gameId: string;
  categories: string[];
  inGameUrl: string;
};

export type GameExtraChanges = { categories?: string[]; inGameUrl?: string };

export const getGameExtra = async (gameId: string) => {
  const response = await fetch(`/api/extras?gameId=${gameId}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to fetch game extra data (${response.status})`);
  }
  const data: GameExtra = await response.json();
  return data;
};

export const saveGameExtra = async (
  gameId: string,
  changes: GameExtraChanges,
) => {
  const response = await fetch(`/api/extras`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId, ...changes }),
  });
  if (!response.ok) {
    throw new Error(`Failed to save game extra data (${response.status})`);
  }
  const data: { message: string; extra: GameExtra } = await response.json();
  return data.extra;
};

export const deleteGameExtra = async (gameId: string) => {
  const response = await fetch(`/api/extras?gameId=${gameId}`, {
    method: 'DELETE',
  });
  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete game extra data (${response.status})`);
  }
  return;
};
