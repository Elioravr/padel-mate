import ReminderEmail from '@components/ReminderEmail';
import { PrismaClient } from '@prisma/client';
import { createCalendarEvent } from '@utils/util';
import moment from 'moment-timezone';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const db = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const now = moment().tz('Asia/Jerusalem'); // Set the timezone to 'Asia/Jerusalem'
  const in23Hours = now.clone().add(23, 'hours').toDate(); // Add 23 hours from now in the timezone
  const in24Hours = now.clone().add(24, 'hours').toDate(); // Add 24 hours from now in the timezone

  try {
    // Fetch courts happening between the next 23 and 24 hours
    const courts = await db.court.findMany({
      where: {
        date: {
          gte: in23Hours, // Greater than or equal to 23 hours from now
          lte: in24Hours, // Less than or equal to 24 hours from now
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
        { message: 'No courts happening in the next 23 to 24 hours' },
        { status: 200 }
      );
    }

    // Loop through the courts and send emails to all players
    const sendEmailPromises = courts.map(async (court) => {
      const { value } = createCalendarEvent(court);

      const emailPromises = court.players.map(async (player) => {
        if (player.email) {
          try {
            const resendResponse = await resend.emails.send({
              from: 'PadelMate@padelmate.elioravr.com',
              to: player.email,
              subject: `Reminder: Upcoming Padel Court @ ${court.location}`,
              react: await ReminderEmail({ courtId: court.id }),
              attachments: [
                {
                  filename: 'court-event.ics',
                  content: value || '', // Attach the .ics file content
                  contentType: 'text/calendar',
                },
              ],
            });

            console.log(`Email sent to ${player.email}:`, resendResponse);
          } catch (error) {
            console.error(`Error sending email to ${player.email}:`, error);
          }
        }
      });

      return Promise.all(emailPromises);
    });

    await Promise.all(sendEmailPromises);

    return NextResponse.json({ message: 'Reminder emails sent successfully!' });
  } catch (error) {
    console.error('Error querying courts or sending emails:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
