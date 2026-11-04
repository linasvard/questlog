import { useNavigate, useParams } from 'react-router';
import { getGame, updateGame } from '../../api/games';
import { useEffect, useState, type SubmitEvent } from 'react';
import { STATUSES, type Game, type GameStatus } from '../../types/game';
import { capitalize } from '../../utils/format';

const EditGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  // Det hämtade spelet + laddning/fel
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [editedPlatform, setEditedPlatform] = useState<string | null>(null);
  const [editedStatus, setEditedStatus] = useState<GameStatus | null>(null);
  const [editedRating, setEditedRating] = useState<string | null>(null);
  const [editedCoverUrl, setEditedCoverUrl] = useState<string | null>(null);
  const [editedNotes, setEditedNotes] = useState<string | null>(null);

  const title = editedTitle ?? game?.title ?? '';
  const platform = editedPlatform ?? game?.platform ?? '';
  const status = editedStatus ?? game?.status ?? 'want';
  const rating = editedRating ?? (game?.rating ? String(game.rating) : '');
  const coverUrl = editedCoverUrl ?? game?.coverUrl ?? '';
  const notes = editedNotes ?? game?.notes ?? '';

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId) return;
      setIsLoading(true);
      try {
        const data = await getGame(gameId);
        setGame(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gameId) return;
    try {
      await updateGame(gameId, {
        title,
        platform,
        status,
        rating: rating ? Number(rating) : null,
        coverUrl,
        notes,
      });
      navigate(`/games/${gameId}`);
    } catch (error) {
      setMessage(
        `❌ ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  };

  if (error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to all games</button>
      </>
    );
  }

  return (
    <div>
      <h1>Edit game</h1>
      {isLoading && <p>Loading game...</p>}
      {message && <p role="status">{message}</p>}
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={(e) => setEditedTitle(e.target.value)}
          type="text"
          name="title"
          required
        />

        <label htmlFor="platform">Platform</label>
        <input
          value={platform}
          onChange={(e) => setEditedPlatform(e.target.value)}
          type="text"
          name="platform"
          required
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setEditedStatus(e.target.value as GameStatus)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {capitalize(s)}
            </option>
          ))}
        </select>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setEditedRating(e.target.value)}>
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setEditedNotes(e.target.value)}
          name="notes"
        />
        <label>Cover</label>
        <input
          value={coverUrl}
          onChange={(e) => setEditedCoverUrl(e.target.value)}
          type="text"
          name="coverUrl"
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default EditGamePage;
