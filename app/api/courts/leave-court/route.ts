import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { courtId, userId } = await req.json();

    const updatedCourt = await db.court.update({
      where: { id: courtId },
      data: {
        players: {
          disconnect: { id: userId },
        },
      },
    });

    return NextResponse.json(
      { message: 'User left the court', updatedCourt },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to leave court' },
      { status: 500 }
    );
  }
}
