import { Player, PrismaClient } from '@prisma/client';
import { getBaseURL } from '@utils/util';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { courtId, userId } = await req.json();

    const updatedCourt = await db.court.update({
      where: { id: courtId },
      data: {
        players: {
          connect: { id: userId },
        },
      },
    });

    const playerResponse = await fetch(`${getBaseURL()}/api/users/${userId}`, {
      method: 'GET',
      cache: 'no-store', // Disable caching
    });
    const player: Player = await playerResponse.json();
    console.log('player', player);

    await fetch(
      `${getBaseURL()}/api/send-email?playerEmailAddress=${
        player.email
      }&courtId=${courtId}`,
      { method: 'GET' }
    );

    return NextResponse.json(
      { message: 'User joined the court', updatedCourt },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to join court' },
      { status: 500 }
    );
  }
}
