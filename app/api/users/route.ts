import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const db = new PrismaClient();

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, first_name, last_name } = req.body.data;

    try {
      // Create a new player in the database
      const newPlayer = await db.player.create({
        data: {
          firstName: first_name,
          lastName: last_name,
          id: id,
          level: 0, // Default player level on sign-up
        },
      });
      res.status(201).json({ player: newPlayer });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create player' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
