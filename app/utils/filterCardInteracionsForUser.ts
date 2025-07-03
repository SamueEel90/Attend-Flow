import User from '../types/User';
import getSelectedDateString from './getSelectedDateString';

const filterCardInteractionsForUsers = (
  data: User[],
  employeeNumber: number,
  date: Date
): User[] => {
  const selectedDate = getSelectedDateString(date);
  return data.filter((u) => {
    const userDate = new Date(u.timestamp).toISOString().split('T')[0];
    return u.EmployeeNumber === employeeNumber && userDate === selectedDate;
  });
};
export default filterCardInteractionsForUsers;