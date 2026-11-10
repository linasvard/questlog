import { capitalize } from '../utils/format';
import { STATUSES, type GameFormValues, type GameStatus } from '../types/game';
import { type SubmitEvent, useState } from 'react';

type GameFormProps = {
  initialValues?: GameFormValues;
  submitLabel: string;
  onSubmit: (values: GameFormValues) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

const emptyFormValues: GameFormValues = {
  title: '',
  platform: '',
  status: 'want',
  rating: null,
  coverUrl: '',
  notes: '',
  categories: [],
  inGameUrl: '',
};

const GameForm = ({
  initialValues = emptyFormValues,
  submitLabel,
  onSubmit,
  onCancel,
  onDelete,
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
  const [categories, setCategories] = useState<string[]>(
    initialValues.categories,
  );
  const [categoryInput, setCategoryInput] = useState('');
  const [inGameUrl, setInGameUrl] = useState(initialValues.inGameUrl);

  const handleAddCategory = () => {
    const newCategory = categoryInput.trim();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
    setCategoryInput('');
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    setCategories(
      categories.filter((category) => category !== categoryToDelete),
    );
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title,
      platform,
      status,
      rating: rating ? Number(rating) : null,
      coverUrl,
      notes,
      categories,
      inGameUrl,
    });
  };
  return (
    <form
      className="content-width grid gap-8 md:grid-cols-2 md:items-start"
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

        <label htmlFor="inGameUrl">In Game URL</label>
        <input
          id="inGameUrl"
          type="url"
          value={inGameUrl}
          onChange={(e) => setInGameUrl(e.target.value)}
        />

        <label htmlFor="category">Categories</label>
        <div className="flex gap-2">
          <input
            id="category"
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
            placeholder="e.g. RPG"
            className="flex-1"
          />
          <button type="button" onClick={handleAddCategory}>
            Add
          </button>
        </div>
        {categories.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <li
                key={category}
                className="flex items-center gap-2 border-2 border-black bg-pink px-2 py-0.5 text-sm font-bold uppercase text-black">
                {category}
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category)}
                  aria-label={`Remove ${category}`}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

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
      <div className="flex flex-col items-center gap-2 md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
        <h2>Cover Preview</h2>

        {coverUrl && !imageError ? (
          <img
            src={coverUrl}
            alt="Cover preview"
            className="w-full max-w-80 rounded object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex aspect-3/4 w-full max-w-80 items-center justify-center rounded border-2 border-dashed border-light/30 text-light/50">
            {imageError ? "Couldn't load the image" : 'No cover yet'}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex gap-2">
          <button type="submit">{submitLabel}</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
        {onDelete && (
          <button className="btn-delete" type="button" onClick={onDelete}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default GameForm;
