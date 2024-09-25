// types/Event.ts

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Event {
  id: string;
  img: string;
  title: string;
  context: string;
  date: string;
  time: string;
  price: string;
  location: Location;
  organizer: string;
  genre: string;
  capacity: number;
}
