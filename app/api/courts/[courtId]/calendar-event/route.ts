// app/api/court/[id]/calendar/route.ts
import { PrismaClient } from '@prisma/client';
import { createEvent, EventAttributes } from 'ics';
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

  // Ensure the start time has exactly 5 elements: [year, month, day, hour, minute]
  const start: [number, number, number, number, number] = [
    startDate.getUTCFullYear(),
    startDate.getUTCMonth() + 1, // Months are 0-indexed, so we add 1
    startDate.getUTCDate(),
    startDate.getUTCHours(),
    startDate.getUTCMinutes(),
  ];

  // Create the calendar event object
  const event: EventAttributes = {
    start, // Matches the [number, number, number, number, number] format
    duration: { minutes: court.duration }, // Use duration instead of end time
    title: `Padel! 🎾 (${court.owner.firstName} ${court.owner.lastName}'s court)`,
    description,
    location: court.location,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: {
      name: `${court.owner.firstName} ${court.owner.lastName}`,
      email: court.owner.email || '',
    }, // Organizer details
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
