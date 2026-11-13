import { capitalize } from '../utils/format';
import { STATUSES, type GameFormValues, type GameStatus } from '../types/game';
import { type SubmitEvent, useState } from 'react';
import RetroWindow from './RetroWindow';
import ImagePreview from './ImagePreview';

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
      className="content-width grid gap-6 mb-6 md:grid-cols-2 md:items-start"
      onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <RetroWindow className="mb-2" title="Game details" barColor="bg-pink">
          <div className="flex flex-col gap-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="title">Title*</label>
                <input
                  className="font-pixel-2"
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="platform">Platform*</label>
                <input
                  className="mb-4 font-pixel-2"
                  id="platform"
                  type="text"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  required
                />
              </div>
            </div>

            <label htmlFor="coverUrl">Cover image (URL)</label>
            <input
              className="mb-4 font-pixel-2"
              id="coverUrl"
              type="url"
              value={coverUrl}
              onChange={(e) => {
                setCoverUrl(e.target.value);
              }}
            />

            <label htmlFor="inGameUrl">Extra image (URL)</label>
            <input
              className="font-pixel-2"
              id="inGameUrl"
              type="url"
              value={inGameUrl}
              onChange={(e) => {
                setInGameUrl(e.target.value);
              }}
            />

            <label className="mt-4" htmlFor="category">
              Categories
            </label>
            <div className="flex gap-2 mb-4">
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
                className="flex-1 font-pixel-2"
              />
              <button className="btn" type="button" onClick={handleAddCategory}>
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

            <div className="grid grid-cols-2 mt-4 mb-4 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="status">Status</label>
                <select
                  className="font-pixel-2"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as GameStatus)}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {capitalize(s)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="rating">Rating</label>
                <select
                  className="font-pixel-2"
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
              </div>
            </div>

            <label htmlFor="notes">Notes</label>
            <textarea
              className="font-pixel-2"
              id="notes"
              value={notes}
              rows={5}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex mt-4 mb-2 justify-between gap-2">
            <div className="flex gap-6">
              <button className="btn-submit" type="submit">
                {submitLabel}
              </button>
              <button className="btn-cancel" type="button" onClick={onCancel}>
                Cancel
              </button>
            </div>
            {onDelete && (
              <button className="btn-danger" type="button" onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        </RetroWindow>
      </div>

      <div className="order-first grid grid-cols-1 sm:grid-cols-2 items-start gap-4 md:order-0">
        <div>
          <ImagePreview
            url={coverUrl}
            title="Cover image preview"
            barColor="bg-blue"
            emptyText="No cover yet"
          />
        </div>

        <div>
          <ImagePreview
            url={inGameUrl}
            title="Extra image preview"
            barColor="bg-orange"
            emptyText="No extra image yet"
          />
        </div>
      </div>
    </form>
  );
};

export default GameForm;
