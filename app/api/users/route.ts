import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const db = new PrismaClient();

export async function GET(req: Request) {
  const allPlayers = await db.player.findMany();

  return NextResponse.json(allPlayers);
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const {
      data: { id, first_name, last_name, email_addresses },
    } = await req.json(); // Extract the fields you need from req.json()

    // Make sure required fields exist
    if (!id) {
      return NextResponse.json(
        { error: 'Missing required fields - id' },
        { status: 400 }
      );
    }
    if (!first_name) {
      return NextResponse.json(
        { error: 'Missing required fields - first_name' },
        { status: 400 }
      );
    }
    if (!last_name) {
      return NextResponse.json(
        { error: 'Missing required fields - last_name' },
        { status: 400 }
      );
    }

    // Create a new player in the database
    const newPlayer = await db.player.create({
      data: {
        id: id, // Clerk user ID
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0].email_address,
        level: 0, // Default player level on sign-up
      },
    });

    return NextResponse.json({ player: newPlayer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create player ${error}` },
      { status: 500 }
    );
  }
}
