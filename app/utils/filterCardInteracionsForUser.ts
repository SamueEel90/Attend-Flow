import TCardInteraction from '../types/cardInteraction';
import getSelectedDateString from './getSelectedDateString';

const filterCardInteractionsForUsers = (
  data: TCardInteraction[],
  employeeNumber: number,
  date: Date
): TCardInteraction[] => {
  const selectedDate = getSelectedDateString(date);
  return data.filter((u) => {
    const userDate = new Date(u.timestamp).toISOString().split('T')[0];
    return u.employeeNumber === employeeNumber && userDate === selectedDate;
  });
};

export default filterCardInteractionsForUsers;
