import { EmployeeShifts } from '../types/ShiftTypes';
import { getSelectedDateString } from './getSelectedDateString';

export const getShiftsForSelectedDay = (
  shifts: EmployeeShifts | null,
  date: Date
): string[] => {
  const selectedDate = getSelectedDateString(date);

  return (
    shifts?.shifts
      .filter(
        (shift) =>
          shift.start.startsWith(selectedDate) ||
          shift.end.startsWith(selectedDate)
      )
      .map((shift) => {
        const start = new Date(shift.start).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const end = new Date(shift.end).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        return `${start} — ${end}`;
      }) ?? []
  );
};