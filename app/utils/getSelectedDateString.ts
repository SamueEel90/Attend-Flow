const getSelectedDateString = (date: Date): string =>
  date.toISOString().split('T')[0];
export default getSelectedDateString;