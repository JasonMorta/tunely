// EventList.js
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
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function EventList() {
  const navigation = useNavigation();

  // Enhanced Event objects with more details and location coordinates
  const events = [
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map((event) => (
        <TouchableOpacity 
          key={event.id} 
          style={styles.eventCard}
          onPress={() => navigation.navigate('EventDetails', { event })}
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
    backgroundColor: '#f2f2f2',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Android shadow
    elevation: 3,
  },
  image: {
    width: '100%',
    height: width * 0.5, // Maintain aspect ratio
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
