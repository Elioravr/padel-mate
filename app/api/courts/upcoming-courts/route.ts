import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(req: NextRequest) {
  // Extract the userId from the query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Get the current date
    const now = new Date();

    // Query courts with filtering conditions
    const upcomingCourts = await db.court.findMany({
      where: {
        players: {
          some: {
            id: userId, // The userId must be present in the players array
          },
        },
        date: {
          gt: now, // The court date must be in the future
        },
      },
      include: {
        players: true, // Include players information
        owner: true, // Include owner information
      },
      orderBy: {
        date: 'asc', // Sort by date in ascending order (earliest to latest)
      },
    });

    return NextResponse.json(upcomingCourts);
  } catch (error) {
    console.error('Error fetching courts:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
