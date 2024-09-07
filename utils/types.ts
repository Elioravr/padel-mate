import { Prisma } from '@prisma/client';

// Define a type for the court with related fields (players and owner)
export type Court = Prisma.CourtGetPayload<{
  include: {
    players: {
      include: {
        _count: {
          select: {
            courts: true; // Include the count of courts where each player is a part of
          };
        };
      };
    };
    owner: true;
  };
}>;

// Define a type for the player with the _count field for courts
export type Player = Prisma.PlayerGetPayload<{
  include: {
    _count: {
      select: {
        courts: true; // Include the count of courts where each player is a part of
      };
    };
  };
}>;
