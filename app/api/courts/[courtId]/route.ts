import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { courtId: string } }
) {
  const court = await db.court.findUnique({
    where: { id: params.courtId },
    include: {
      players: true, // This will include the full information of each player
      owner: true, // Optionally include the court owner if needed
    },
  });

  if (court) {
    return NextResponse.json(court);
  } else {
    return NextResponse.json({ message: 'Court not found' }, { status: 404 });
  }
}
