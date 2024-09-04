import { Prisma } from '@prisma/client';

// Define a type for the court with related fields (players and owner)
export type Court = Prisma.CourtGetPayload<{
  include: {
    players: true;
    owner: true;
  };
}>;
