// app/events/[id].tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  ScrollView,
  TouchableOpacity // Import here if not already
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { events } from '../data/events';
import { Event } from '@/types/Event';
import { Ionicons } from '@expo/vector-icons'; // Import icons

const { width } = Dimensions.get('window');

export default function EventDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const event = events.find((event: Event) => event.id === id);

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
          headerBackTitleVisible: false,
          headerTitle: event.title,
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image 
          source={{ uri: event.img }} 
          style={styles.image} 
          resizeMode="cover"
          accessibilityLabel={`${event.title} Image`}
        />
        {/* Custom Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back to event list"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          {/* ... rest of your content ... */}
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
    height: width * 0.6,
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your header height and status bar
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  // ... rest of your styles ...
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
