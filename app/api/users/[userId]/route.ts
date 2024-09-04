import { PrismaClient } from '@prisma/client';
import { players } from '@utils/MockData';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const allPlayers = await db.player.findMany();

  const { userId } = params;

  // Find user by ID
  const user = players.find((player) => player.id.toString() === userId);

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
