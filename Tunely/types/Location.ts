export interface Location {
  id: string;
  img: string;
  title: string;
  context: string;
  date: string; // Consider using Date type if you store timestamps
  time: string;
  price: string;
  location: Location;
  organizer: string;
  genre: string;
  capacity: number;
}