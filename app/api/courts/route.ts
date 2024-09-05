import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET() {
  const allCourts = await db.court.findMany({
    include: {
      players: true, // This will include the full information of each player
      owner: true, // Optionally include the court owner if needed
    },
    orderBy: {
      date: 'asc', // Sort by date in ascending order (earliest to latest)
    },
  });

  return NextResponse.json(
    allCourts.filter((court) => {
      return court.players.length < 4 && court.isPublic;
    })
  );
}

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Parse the request body
    const {
      data: { date, isPublic, location },
    } = await req.json(); // Extract the fields you need from req.json()

    const dateObj = new Date(date);
    console.log('userId', userId);

    // Create a new player in the database
    const newCourt = await db.court.create({
      data: {
        isPublic,
        location,
        date: dateObj.toISOString(),
        ownerId: userId,
      },
    });

    await db.court.update({
      where: { id: newCourt.id },
      data: {
        players: {
          connect: [{ id: userId }],
        },
      },
    });

    return NextResponse.json({ court: newCourt }, { status: 201 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { error: `Failed to create court ${error}` },
      { status: 500 }
    );
  }
}
