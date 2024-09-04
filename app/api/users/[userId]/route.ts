import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const allPlayers = await db.player.findMany();

  const { userId } = params;

  // Find user by ID
  const user = allPlayers.find((player) => player.id.toString() === userId);

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
