import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Event } from '../types/Event';

/**
 * Fetches data from the "Events" Firestore collection.
 * @returns An array of Event objects.
 */
const getEvents = async (): Promise<(Event & { id: string })[]> => {
  try {
    const eventsColRef = collection(db, 'Events');
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(eventsColRef);
    const events: (Event & { id: string })[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (Event & { id: string })[];
    return events;
  } catch (error) {
    console.error('Error fetching Events:', error);
    throw error;
  }
};

export default getEvents;