// components/EventList.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Event } from '@/types/Event';
import { events } from '@/app/data/events';

const { width } = Dimensions.get('window');

export default function EventList() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map((event: Event) => (
        <TouchableOpacity 
          key={event.id} 
          style={styles.eventCard}
          onPress={() => router.push(`/events/${event.id}`)} 
        >
          <Image 
            source={{ uri: event.img }} 
            style={styles.image} 
            resizeMode="cover"
            accessibilityLabel={`${event.title} Image`}
          />
          <View style={styles.eventDetails}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.context}>{event.context}</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoText}>{event.date}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Time:</Text>
                <Text style={styles.infoText}>{event.time}</Text>
              </View>
            </View>
            <Text style={styles.price}>{event.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    //overflow: 'hidden',
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    // Android shadow
    elevation: 1,
  },
  image: {
    width: '100%',
    height: width * 0.5, // Maintain aspect ratio
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  eventDetails: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
  context: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoItem: {
    marginRight: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e91e63', // A vibrant color for emphasis
  },
});
