import { Player, PrismaClient } from '@prisma/client';
import { getBaseURL } from '@utils/util';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { courtId, userId } = await req.json();

    // Find the current number of players in the court
    const courtWithPlayers = await db.court.findUnique({
      where: { id: courtId },
      include: { players: true },
    });

    if (courtWithPlayers && courtWithPlayers.players.length >= 4) {
      return NextResponse.json(
        {
          error:
            'The court is full, and no more players can be added. It’s possible someone joined just before you. Please refresh to view the most up-to-date list of players.',
        },
        { status: 400 }
      );
    }

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
