type TCardInteraction = {
  _id: string;
  userId: string;
  employeeNumber: number;
  name: string;
  location: string;
  action: "začiatok_zmeny" | "koniec_zmeny" | "začiatok_prestávky" | "koniec_prestávky";
  timestamp: string; 
  department: string; 
};
export default TCardInteraction;