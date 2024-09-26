import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from '../types/Event';

/**
 * Fetches data from a specified Firestore collection.
 * @param collectionName - The name of the Firestore collection.
 * @returns An array of documents from the collection.
 */
const getCollectionData = async <T>(collectionName: string): Promise<(T & { id: string })[]> => {
  try {
    const colRef = collection(db, collectionName);
    const snapshot: QuerySnapshot<DocumentData> = await getDocs(colRef);
    const data: (T & { id: string })[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (T & { id: string })[];
    return data;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};

export default getCollectionData;