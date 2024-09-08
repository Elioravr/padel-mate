import { createEvent, EventAttributes, ReturnObject } from 'ics';
import { Court } from './types';

export function formatDate(dateAsString: Date): string {
  const date = new Date(dateAsString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem', // Specify the Israel time zone
  };

  return new Intl.DateTimeFormat('en-IL', options).format(date);
}

export function formatShortDate(dateAsString: Date): string {
  const date = new Date(dateAsString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem', // Specify the Israel time zone
  };

  return new Intl.DateTimeFormat('en-IL', options).format(date);
}

export function formatHour(dateAsString: Date, duration: number): string {
  const currentDate = new Date(dateAsString);

  // Add the duration (in milliseconds) to the current date
  const futureDate = new Date(currentDate.getTime() + duration * 60000);

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jerusalem', // Specify the Israel time zone
    hour12: false, // Ensure 24-hour format (HH:mm)
  };

  return new Intl.DateTimeFormat('en-IL', options).format(futureDate);
}

// Utility function to generate the .ics file
export function createCalendarEvent(court: Court): ReturnObject {
  const startDate = new Date(court.date);

  // Format the start time as an array of [year, month, day, hour, minute]
  const start: [number, number, number, number, number] = [
    startDate.getUTCFullYear(),
    startDate.getUTCMonth() + 1, // Months are 0-indexed, add 1
    startDate.getUTCDate(),
    startDate.getUTCHours(),
    startDate.getUTCMinutes(),
  ];

  const ownerName = `${court.owner.firstName} ${court.owner.lastName}`;

  const event: EventAttributes = {
    start,
    duration: { minutes: court.duration },
    title: `Padel! 🎾 (${ownerName}'s court)`,
    description: `You have a Padel court booked by ${ownerName}. The event will be held at ${court.location}.`,
    location: court.location,
    status: 'CONFIRMED',
    busyStatus: 'BUSY',
    organizer: { name: ownerName, email: court.owner.email || '' },
  };

  return createEvent(event);
}

export function getBaseURL() {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://padelmate.elioravr.com/'
      : 'http://localhost:3000/';

  return apiUrl;
}
