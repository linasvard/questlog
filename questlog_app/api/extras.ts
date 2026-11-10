import { connectDB } from './_lib/db';
import { GameExtra } from './_lib/GameExtra';

export async function GET(request: Request) {
  const gameId = new URL(request.url).searchParams.get('gameId');
  if (!gameId) {
    return new Response('Missing gameId parameter', { status: 400 });
  }

  try {
    await connectDB();
    const extra = await GameExtra.findOne({ gameId });
    if (!extra) {
      return Response.json(
        { error: 'No extra data found for this game' },
        { status: 404 },
      );
    }
    return Response.json(extra);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return (Response.json({ error: message }), { status: 500 });
  }
}

export async function POST(request: Request) {
  const { gameId, categories, inGameUrl } = await request.json();
  if (gameId === undefined) {
    return Response.json(
      { error: 'Missing gameId parameter' },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const extra = await GameExtra.findOneAndUpdate(
      { gameId },
      { $set: { categories, inGameUrl } },
      { new: true, upsert: true, runValidators: true },
    );
    return Response.json({ message: 'Extra data saved successfully', extra });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const gameId = new URL(request.url).searchParams.get('gameId');
  if (!gameId) {
    return Response.json({ error: 'gameId is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const deletedExtra = await GameExtra.findOneAndDelete({ gameId });
    if (!deletedExtra) {
      return Response.json(
        { error: 'No extra data found for this game' },
        { status: 404 },
      );
    }
    return Response.json({ message: 'Extras deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
