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

export function getBaseURL() {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://padelmate.elioravr.com/'
      : 'http://localhost:3000';

  return apiUrl;
}
