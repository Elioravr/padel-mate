import { Prisma } from '@prisma/client';

// Define a type for the court with related fields (players and owner)
export type Court = Prisma.CourtGetPayload<{
  include: {
    players: true;
    owner: true;
  };
}>;
// Define a type for the court with related fields (players and owner)
export type Player = Prisma.CourtGetPayload<{
  include: {
    include: {
      _count: {
        select: {
          courts: true; // Include the count of courts where each player is a part of
        };
      };
    };
    owner: true; // Include owner information
  };
}>;
