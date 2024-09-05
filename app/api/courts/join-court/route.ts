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
          connect: { id: userId },
        },
      },
    });

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
