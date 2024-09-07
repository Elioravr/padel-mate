import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ownerId = searchParams.get('ownerId');

  if (!ownerId) {
    return NextResponse.json(
      { error: 'Owner ID is required' },
      { status: 400 }
    );
  }

  const allCourts = await db.court.findMany({
    include: {
      players: {
        include: {
          _count: {
            select: {
              courts: true, // Include the count of courts where each player is a part of
            },
          },
        },
      }, // This will include the full information of each player
      owner: true, // Optionally include the court owner if needed
    },
    where: {
      ownerId: ownerId,
    },
    orderBy: {
      date: 'asc', // Sort by date in ascending order (earliest to latest)
    },
  });

  return NextResponse.json(allCourts);
}
