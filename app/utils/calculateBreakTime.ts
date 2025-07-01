export function calculateBreakTime(startTime: string, endTime: string): number {
  // Assumes time strings are in "HH:mm" format (24-hour)
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;

  // If end is before start, assume it's the next day
  let diff = end - start;
  if (diff < 0) {
    diff += 24 * 60;
  }

  return diff; // returns difference in minutes
}