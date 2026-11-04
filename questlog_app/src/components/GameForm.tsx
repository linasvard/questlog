import { capitalize } from '../utils/format';
import { STATUSES, type GameFormValues, type GameStatus } from '../types/game';
import { type SubmitEvent, useState } from 'react';

type GameFormProps = {
  initialValues?: GameFormValues;
  submitLabel: string;
  onSubmit: (values: GameFormValues) => void;
  onCancel: () => void;
};

const emptyFormValues: GameFormValues = {
  title: '',
  platform: '',
  status: 'want',
  rating: null,
  coverUrl: '',
  notes: '',
};

const GameForm = ({
  initialValues = emptyFormValues,
  submitLabel,
  onSubmit,
  onCancel,
}: GameFormProps) => {
  const [title, setTitle] = useState(initialValues.title);
  const [platform, setPlatform] = useState(initialValues.platform);
  const [status, setStatus] = useState<GameStatus>(initialValues.status);
  const [rating, setRating] = useState(
    initialValues.rating ? String(initialValues.rating) : '',
  );
  const [coverUrl, setCoverUrl] = useState(initialValues.coverUrl);
  const [notes, setNotes] = useState(initialValues.notes);

  const [imageError, setImageError] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title,
      platform,
      status,
      rating: rating ? Number(rating) : null,
      coverUrl,
      notes,
    });
  };
  return (
    <form
      className="grid gap-8 md:grid-cols-2 md:items-start"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="platform">Platform</label>
        <input
          id="platform"
          type="text"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as GameStatus)}>
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
          onChange={(e) => setRating(e.target.value)}>
          <option value="">No rating</option>
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <label htmlFor="coverUrl">Cover URL</label>
        <input
          id="coverUrl"
          type="url"
          value={coverUrl}
          onChange={(e) => {
            setCoverUrl(e.target.value);
            setImageError(false);
          }}
        />
      </div>
      <div className="flex justify-center md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
        {coverUrl && !imageError && (
          <img
            src={coverUrl}
            alt="Cover preview"
            className="w-full max-w-80 rounded"
            onError={() => setImageError(true)}
          />
        )}
        {coverUrl && imageError && (
          <p>Couldn't load the image. Please check the URL.</p>
        )}
      </div>

      <div className="flex gap-2">
        <button type="submit">{submitLabel}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GameForm;
