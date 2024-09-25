// app/events/[id].tsx

import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

const getEventById = (id: string) => {
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

  return events.find(event => event.id === id);
};

export default function EventDetails() {
  const router = useRouter();
  const { id } = useSearchParams();

  const event = getEventById(id as string);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false, // Hides the back button title
          headerTitle: event.title, // Sets the header title to the event title
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
          source={{ uri: event.img }} 
          style={styles.image} 
          resizeMode="cover"
          accessibilityLabel={`${event.title} Image`}
        />
        <View style={styles.detailsContainer}>
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
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Organizer:</Text>
              <Text style={styles.infoText}>{event.organizer}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Genre:</Text>
              <Text style={styles.infoText}>{event.genre}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Capacity:</Text>
              <Text style={styles.infoText}>{event.capacity}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Price:</Text>
              <Text style={styles.infoText}>{event.price}</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: event.location.latitude,
              longitude: event.location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker 
              coordinate={event.location}
              title={event.title}
              description={event.organizer}
            />
          </MapView>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: width * 0.6, // Larger image for details
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20, // Overlap the image
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
    color: '#333',
  },
  context: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  infoItem: {
    marginRight: 20,
    marginBottom: 10,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
