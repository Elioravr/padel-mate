// app/api/court/[id]/calendar/route.ts
import { PrismaClient } from '@prisma/client';
import { createCalendarEvent } from '@utils/util';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

// GET request to generate the calendar event
export async function GET(
  request: Request,
  { params }: { params: { courtId: string } }
) {
  const courtId = params.courtId;

  // Fetch the court information from the database
  const court = await db.court.findUnique({
    where: { id: courtId },
    include: {
      owner: true,
      players: {
        include: {
          _count: {
            select: {
              courts: true, // Include the count of courts where each player is a part of
            },
          },
        },
      },
    },
  });

  if (!court) {
    return NextResponse.json({ error: 'Court not found' }, { status: 404 });
  }

  const { error, value } = createCalendarEvent(court);
  if (error) {
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }

  // Set headers for file download
  const headers = new Headers({
    'Content-Type': 'text/calendar',
    'Content-Disposition': 'attachment; filename=court-event.ics',
  });

  return new NextResponse(value, { headers });
}
