// app/data/events.ts

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

export const events: Event[] = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1556740739-887f6717d7e4',
    title: 'Jazz Night Extravaganza',
    context: 'Experience an unforgettable night of smooth jazz performances.',
    date: '2024-05-20',
    time: '19:30',
    price: 'R200',
    location: {
      latitude: -26.2041,
      longitude: 28.0473,
    },
    organizer: 'City Jazz Club',
    genre: 'Jazz',
    capacity: 150,
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1515169067865-5387ec356754',
    title: 'Rock Legends Concert',
    context: 'Join us for a night with the legends of rock music.',
    date: '2024-06-15',
    time: '20:00',
    price: 'R350',
    location: {
      latitude: -26.3054,
      longitude: 28.2403,
    },
    organizer: 'Rock Arena',
    genre: 'Rock',
    capacity: 300,
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70',
    title: 'Electronic Dance Festival',
    context: 'Dance the night away with top electronic DJs.',
    date: '2024-07-10',
    time: '22:00',
    price: 'R400',
    location: {
      latitude: -25.7461,
      longitude: 28.1881,
    },
    organizer: 'EDM Central',
    genre: 'Electronic',
    capacity: 500,
  },
  // Add more events as needed
];
