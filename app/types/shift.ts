type TShift = {
  _id: string;
  userId: string;
  username: string; 
  shiftDate: string;         // ISO timestamp, napr. "2025-07-08T00:00:00.000+00:00"
  shiftStart: string;        // ISO timestamp
  shiftEnd: string;   
  department: string;       // ISO timestamp
  breakTime: number;         // v minútach
  arrivalConfirmed: boolean;
  departureConfirmed: boolean;
};
export default TShift;