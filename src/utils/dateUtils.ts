export function formatDate(isoDate: string) {
  const date = Date.parse(isoDate);
  return new Intl.DateTimeFormat('sv-FI', { dateStyle: 'long' }).format(date);
}
