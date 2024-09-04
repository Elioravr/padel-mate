import { players } from '@utils/MockData';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  // Find user by ID
  const user = players.find((player) => player.id.toString() === userId);

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
