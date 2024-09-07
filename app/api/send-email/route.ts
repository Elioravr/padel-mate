import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const resendResponse = await resend.emails.send({
      from: 'PadelMate@padelmate.elioravr.com',
      to: 'elioravr@gmail.com',
      subject: 'You have joined a Padel Court @ PadelMate',
      html: '<h1>Test</h1>',
    });

    console.log('resendResponse', resendResponse);

    return NextResponse.json({ data: resendResponse.data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
