import JoinedEmail from '@components/JoinedEmail';
import { PrismaClient } from '@prisma/client';
import { createCalendarEvent } from '@utils/util';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const db = new PrismaClient();

export async function GET(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { searchParams } = new URL(req.url);
  const playerEmailAddress: string | null =
    searchParams.get('playerEmailAddress');
  const courtId: string | null = searchParams.get('courtId');

  if (playerEmailAddress == null) {
    return NextResponse.json(
      { error: 'Player email address must be defined' },
      { status: 500 }
    );
  }

  if (courtId == null) {
    return NextResponse.json(
      { error: 'Court ID must be defined' },
      { status: 500 }
    );
  }
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

  if (court == null) {
    return NextResponse.json({ error: 'Court was not found' }, { status: 500 });
  }

  const { value } = createCalendarEvent(court);

  try {
    const resendResponse = await resend.emails.send({
      from: 'PadelMate@padelmate.elioravr.com',
      to: playerEmailAddress,
      subject: 'You’ve Been Added to a Padel Court @ PadelMate!',
      react: await JoinedEmail({
        courtId,
      }),
      attachments: [
        {
          filename: 'court-event.ics',
          content: value || '', // Attach the .ics file content
          contentType: 'text/calendar',
        },
      ],
    });

    console.log('resendResponse', resendResponse);

    return NextResponse.json({ data: resendResponse.data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
