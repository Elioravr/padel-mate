import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET() {
  const allCourts = await db.court.findMany({
    include: {
      players: true, // This will include the full information of each player
      owner: true, // Optionally include the court owner if needed
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(allCourts);
}
