export interface Shift {
  start: string;
  end: string;
  break: string;
}

export interface EmployeeShifts {
  employee_number: number;
  employee_name: string;
  shifts: Shift[];
}