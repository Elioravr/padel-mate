import { NextResponse } from 'next/server';

export type Player = {
  firstName: string;
  lastName: string;
  level: number;
};

export type Court = {
  location: string;
  owner: Player;
  players: Player[];
  date: string;
};

const players: Player[] = [
  { firstName: 'אליאור', lastName: 'אברמוביץ', level: 7 },
  { firstName: 'שלומי', lastName: 'אברמוביץ', level: 6 },
  { firstName: 'רותם', lastName: 'נתן', level: 5 },
  { firstName: 'אייל', lastName: 'מירון', level: 8 },
  { firstName: 'עודד', lastName: 'רון', level: 7 },
  { firstName: 'בן', lastName: 'רבינוביץ', level: 6 },
  { firstName: 'אייל', lastName: 'הוכמן', level: 5 },
  { firstName: 'רועי', lastName: 'שפר', level: 7 },
];

const courts: Court[] = [
  {
    location: 'כפר המכביה',
    owner: players[0], // אליאור אברמוביץ
    players: [players[0], players[1], players[2], players[3]],
    date: new Date(2024, 8, 3, 10, 0).toISOString(),
  },
  {
    location: 'קאנטרי דקל בתל אביב',
    owner: players[4], // עודד רון
    players: [players[4], players[5], players[6], players[7]],
    date: new Date(2024, 8, 3, 11, 0).toISOString(),
  },
  {
    location: 'ראשון לציון',
    owner: players[1], // שלומי אברמוביץ
    players: [players[1], players[3], players[5]],
    date: new Date(2024, 8, 4, 9, 0).toISOString(),
  },
  {
    location: 'סביון',
    owner: players[2], // רותם נתן
    players: [players[2], players[7]],
    date: new Date(2024, 8, 4, 10, 0).toISOString(),
  },
  {
    location: 'כפר המכביה',
    owner: players[3], // אייל מירון
    players: [players[3], players[0], players[6], players[2]],
    date: new Date(2024, 8, 5, 9, 0).toISOString(),
  },
  {
    location: 'קאנטרי דקל בתל אביב',
    owner: players[5], // בן רבינוביץ
    players: [players[5], players[1], players[4]],
    date: new Date(2024, 8, 5, 10, 0).toISOString(),
  },
  {
    location: 'ראשון לציון',
    owner: players[6], // אייל הוכמן
    players: [players[6], players[0], players[7], players[3]],
    date: new Date(2024, 8, 6, 9, 0).toISOString(),
  },
  {
    location: 'סביון',
    owner: players[7], // רועי שפר
    players: [players[7], players[2], players[4]],
    date: new Date(2024, 8, 6, 10, 0).toISOString(),
  },
  {
    location: 'כפר המכביה',
    owner: players[1], // שלומי אברמוביץ
    players: [players[1], players[3], players[5], players[6]],
    date: new Date(2024, 8, 7, 9, 0).toISOString(),
  },
  {
    location: 'קאנטרי דקל בתל אביב',
    owner: players[4], // עודד רון
    players: [players[4], players[0], players[2]],
    date: new Date(2024, 8, 7, 10, 0).toISOString(),
  },
  {
    location: 'ראשון לציון',
    owner: players[3], // אייל מירון
    players: [players[3], players[1], players[7]],
    date: new Date(2024, 8, 8, 9, 0).toISOString(),
  },
  {
    location: 'סביון',
    owner: players[2], // רותם נתן
    players: [players[2], players[5], players[6], players[7]],
    date: new Date(2024, 8, 8, 10, 0).toISOString(),
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(courts);
}
