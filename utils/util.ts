export function formatDate(dateAsString: Date): string {
  const date = new Date(dateAsString);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dayName = daysOfWeek[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${dayName}, ${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function getBaseURL() {
  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://padelmate.elioravr.com/'
      : 'http://localhost:3000';

  return apiUrl;
}
