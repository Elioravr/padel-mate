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
  {
    id: '093acce6-e82b-4217-b981-02d0043aa999',
    firstName: 'אליאור',
    lastName: 'אברמוביץ',
    level: 3.25,
  },
  {
    id: '1600a328-ec16-4376-9b1f-906e3a729d98',
    firstName: 'בן',
    lastName: 'רבינוביץ',
    level: 3,
  },
  {
    id: '860bc5ff-c7bd-4975-8b8f-94320b9a9df9',
    firstName: 'אייל',
    lastName: 'מירון',
    level: 3.5,
  },
  {
    id: '8cb7a9dd-e144-4414-b57c-ae315987d07c',
    firstName: 'רותם',
    lastName: 'נתן',
    level: 3.5,
  },
  {
    id: 'a25bbfb5-14f2-4a77-a1bd-c7e383b6676e',
    firstName: 'עודד',
    lastName: 'רון',
    level: 3.25,
  },
  {
    id: 'a763085d-389f-44ee-84e4-b38b7aa12f78',
    firstName: 'עמית',
    lastName: 'מור',
    level: 3,
  },
  {
    id: 'e7e94d2f-04e9-40d2-9c82-0b6105aa9462',
    firstName: 'אייל',
    lastName: 'הוכמן',
    level: 2,
  },
  {
    id: 'efe694f3-2655-4c9f-ac1d-9933dfbdf341',
    firstName: 'שלומי',
    lastName: 'אברמוביץ',
    level: 3.25,
  },
  {
    id: 'f6c88f99-0534-499b-af8d-2b953e4a48c6',
    firstName: 'רועי',
    lastName: 'שפר',
    level: 3,
  },
];

export const courts: Court[] = [
  {
    location: 'כפר המכביה',
    owner: players[0], // אליאור אברמוביץ
    players: [players[0], players[1], players[2], players[3]],
    date: new Date(2024, 8, 3, 10, 0).toISOString(),
  },
  {
    location: 'קאנטרי דקל - תל אביב',
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
    location: 'קאנטרי דקל - תל אביב',
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
    location: 'קאנטרי דקל - תל אביב',
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
