export const getSelectedDateString = (date: Date): string =>
  date.toISOString().split('T')[0];