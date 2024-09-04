import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { id, first_name, last_name } = await req.json(); // Use req.json() to parse the body

    // Create a new player in the database
    const newPlayer = await db.player.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        id: id,
        level: 0, // Default player level on sign-up
      },
    });

    return NextResponse.json({ player: newPlayer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create player' },
      { status: 500 }
    );
  }
}
