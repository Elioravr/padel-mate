import { PrismaClient } from '@prisma/client';
import moment from 'moment-timezone';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const db = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  // Get the current date in the server's local time (likely UTC)
  const now = moment();

  // Get the start and end of "tomorrow" based on the server's local time
  const startOfTomorrow = now.clone().add(1, 'day').startOf('day').toDate(); // Start of tomorrow
  const endOfTomorrow = now.clone().add(1, 'day').endOf('day').toDate(); // End of tomorrow

  try {
    // Fetch courts happening tomorrow
    const courts = await db.court.findMany({
      where: {
        date: {
          gte: startOfTomorrow, // Greater than or equal to the start of tomorrow
          lte: endOfTomorrow, // Less than or equal to the end of tomorrow
        },
      },
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
        }, // Include players to send emails
      },
    });

    if (courts.length === 0) {
      return NextResponse.json(
        { message: 'No courts happening tomorrow' },
        { status: 200 }
      );
    }

    // Loop through the courts and send emails to all players
    const sendEmail = courts.map((court) => {
      return court.players.map((player) => {
        if (player.email) {
          return player.email;
        }
      });
    });

    return NextResponse.json({ message: sendEmail });
  } catch (error) {
    console.error('Error querying courts or sending emails:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
