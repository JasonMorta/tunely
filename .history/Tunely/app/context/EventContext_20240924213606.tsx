// app/context/EventContext.tsx

import React, { createContext, useContext } from 'react';
import { events, Event } from '../data/events';

interface EventContextType {
  events: Event[];
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC = ({ children }) => {
  const getEventById = (id: string) => events.find(event => event.id === id);

  return (
    <EventContext.Provider value={{ events, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
