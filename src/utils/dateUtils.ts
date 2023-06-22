export function formatDate(isoDate: string) {
  const date = Date.parse(isoDate);
  return new Intl.DateTimeFormat('sv-FI', { dateStyle: 'long', timeZone: 'Europe/Helsinki' }).format(date);
}
