import JoinedEmail from '@components/JoinedEmail';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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

  try {
    const resendResponse = await resend.emails.send({
      from: 'PadelMate@padelmate.elioravr.com',
      to: playerEmailAddress,
      subject: 'You’ve Been Added to a Padel Court @ PadelMate!',
      react: await JoinedEmail({
        courtId,
      }),
    });

    console.log('resendResponse', resendResponse);

    return NextResponse.json({ data: resendResponse.data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
