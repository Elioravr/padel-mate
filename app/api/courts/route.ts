import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET() {
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
      data: { date, isPublic, location, duration },
    } = await req.json(); // Extract the fields you need from req.json()

    const dateObj = new Date(date);

    // Create a new player in the database
    const newCourt = await db.court.create({
      data: {
        isPublic,
        location,
        date: dateObj.toISOString(),
        ownerId: userId,
        duration,
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

export async function DELETE(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const courtId = searchParams.get('id');

    if (!courtId) {
      return NextResponse.json(
        { message: 'Court ID is required' },
        { status: 400 }
      );
    }

    // Find the court to ensure the user is the owner before deletion
    const court = await db.court.findUnique({
      where: { id: courtId },
      select: { ownerId: true },
    });

    if (!court) {
      return NextResponse.json({ message: 'Court not found' }, { status: 404 });
    }

    // Ensure the user is the owner of the court
    if (court.ownerId !== userId) {
      return NextResponse.json(
        { message: 'Unauthorized to delete this court' },
        { status: 403 }
      );
    }

    // Delete the court
    await db.court.delete({
      where: { id: courtId },
    });

    return NextResponse.json(
      { message: 'Court deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting court:', error);
    return NextResponse.json(
      { error: `Failed to delete court ${error}` },
      { status: 500 }
    );
  }
}
