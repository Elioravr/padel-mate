export type Player = {
  id: number;
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

export const players: Player[] = [
  { id: 1, firstName: 'אליאור', lastName: 'אברמוביץ', level: 3.25 },
  { id: 2, firstName: 'שלומי', lastName: 'אברמוביץ', level: 3.25 },
  { id: 3, firstName: 'רותם', lastName: 'נתן', level: 3.5 },
  { id: 4, firstName: 'אייל', lastName: 'מירון', level: 3.5 },
  { id: 5, firstName: 'עודד', lastName: 'רון', level: 3.25 },
  { id: 6, firstName: 'בן', lastName: 'רבינוביץ', level: 3 },
  { id: 7, firstName: 'אייל', lastName: 'הוכמן', level: 2 },
  { id: 8, firstName: 'רועי', lastName: 'שפר', level: 3 },
  { id: 9, firstName: 'עמית', lastName: 'מור', level: 3 },
];

export const courts: Court[] = [
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
