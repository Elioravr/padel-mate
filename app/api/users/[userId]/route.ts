import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const user = await db.player.findUnique({
    where: { id: userId },
  });

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
}
