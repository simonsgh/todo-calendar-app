export const DAY_MS = 24 * 60 * 60 * 1000;
export const WEEK_MS = 7 * DAY_MS;

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

export const getWeekStart = (from = new Date()) => {
  const current = new Date(from);
  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDate = current.getDate() - current.getDay();
  return new Date(year, month, firstDate);
};

export const formatHours = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};
