import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import getEvents from '../services/getEvents';
import { Event } from '../types/Event';

const EventsList: React.FC = () => {
  const [events, setEvents] = useState<(Event & { id: string })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to fetch events. Please try again.');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (events.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No events found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.img }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.context}>{item.context}</Text>
            <Text style={styles.details}>
              {item.date} at {item.time}
            </Text>
            <Text style={styles.details}>Price: {item.price}</Text>
            <Text style={styles.details}>Location: {item.location.address}, {item.location.city}</Text>
            <Text style={styles.details}>Organizer: {item.organizer}</Text>
            <Text style={styles.details}>Genre: {item.genre}</Text>
            <Text style={styles.details}>Capacity: {item.capacity}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  context: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
});

export default EventsList;