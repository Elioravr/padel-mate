// app/api/court/[id]/calendar/route.ts
import { PrismaClient } from '@prisma/client';
import { createEvent } from 'ics';
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
      players: true,
    },
  });

  if (!court) {
    return NextResponse.json({ error: 'Court not found' }, { status: 404 });
  }

  // Calculate end time based on duration (in minutes)
  const startDate = new Date(court.date);
  const endDate = new Date(startDate.getTime() + court.duration * 60000);

  const description = `You have a Padel court booked by ${court.owner.firstName} ${court.owner.lastName}. The event will be held at ${court.location}.`;

  // Create the calendar event
  const event = {
    start: [
      startDate.getUTCFullYear(),
      startDate.getUTCMonth() + 1, // Months are 0-indexed
      startDate.getUTCDate(),
      startDate.getUTCHours(),
      startDate.getUTCMinutes(),
    ],
    end: [
      endDate.getUTCFullYear(),
      endDate.getUTCMonth() + 1,
      endDate.getUTCDate(),
      endDate.getUTCHours(),
      endDate.getUTCMinutes(),
    ],
    title: `Padel! 🎾 (${court.owner.firstName} ${court.owner.lastName}'s court)`,
    description,
    location: court.location,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
  };

  // Generate the .ics file
  const { error, value } = createEvent(event);
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
