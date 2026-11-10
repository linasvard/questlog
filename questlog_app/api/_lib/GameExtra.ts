import mongoose from 'mongoose';

const gameExtraSchema = new mongoose.Schema(
  {
    gameId: { type: String, required: true },
    categories: { type: [String], default: [] },
    inGameUrl: { type: String, default: '' },
    review: { type: String, default: '' },
  },
  { timestamps: true },
);

export const GameExtra =
  mongoose.models.GameExtra || mongoose.model('GameExtra', gameExtraSchema);
