import { NextResponse } from 'next/server';

export type Player = {
  firstName: string;
  lastName: string;
  level: number;
};

export type Court = {
  location: string;
  players: Players[];
  date: Date;
};

const players: Player[] = [
  { firstName: 'Alex', lastName: 'Smith', level: 5 },
  { firstName: 'Maria', lastName: 'Garcia', level: 6 },
  { firstName: 'John', lastName: 'Doe', level: 7 },
  { firstName: 'Anna', lastName: 'Johnson', level: 4 },
  { firstName: 'Carlos', lastName: 'Lopez', level: 8 },
  { firstName: 'Emma', lastName: 'Brown', level: 5 },
  { firstName: 'David', lastName: 'Wilson', level: 6 },
  { firstName: 'Laura', lastName: 'Martinez', level: 7 },
];

const courts: Court[] = [
  {
    location: 'Padel Club Central',
    players: [players[0], players[1], players[2], players[3]],
    date: new Date(2024, 8, 3, 10, 0),
  },
  {
    location: 'Padel Arena North',
    players: [players[4], players[5], players[6], players[7]],
    date: new Date(2024, 8, 3, 11, 0),
  },
  {
    location: 'Padel Club East',
    players: [players[0], players[2], players[4], players[6]],
    date: new Date(2024, 8, 4, 9, 0),
  },
  {
    location: 'Padel Club West',
    players: [players[1], players[3], players[5], players[7]],
    date: new Date(2024, 8, 4, 10, 0),
  },
  {
    location: 'Padel Club South',
    players: [players[0], players[1], players[4], players[5]],
    date: new Date(2024, 8, 5, 10, 0),
  },
  {
    location: 'Padel Club North',
    players: [players[2], players[3], players[6], players[7]],
    date: new Date(2024, 8, 5, 11, 0),
  },
  {
    location: 'Padel Arena Central',
    players: [players[0], players[3], players[4], players[7]],
    date: new Date(2024, 8, 6, 9, 0),
  },
  {
    location: 'Padel Arena East',
    players: [players[1], players[2], players[5], players[6]],
    date: new Date(2024, 8, 6, 10, 0),
  },
  {
    location: 'Padel Arena West',
    players: [players[0], players[1], players[6], players[7]],
    date: new Date(2024, 8, 7, 9, 0),
  },
  {
    location: 'Padel Club Arena South',
    players: [players[2], players[3], players[4], players[5]],
    date: new Date(2024, 8, 7, 10, 0),
  },
];

export async function GET(request: Request) {
  return NextResponse.json(courts);
}
