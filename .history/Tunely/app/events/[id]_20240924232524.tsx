// app/events/[id].tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Linking
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { events } from '../data/events';
import { Event } from '@/types/Event';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have this installed

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

  // Function to open maps
  const openMaps = () => {
    const { latitude, longitude } = event.location;
    const label = event.title;
    let url = '';

    if (Platform.OS === 'ios') {
      url = `maps:0,0?q=${label}@${latitude},${longitude}`;
    } else {
      url = `geo:0,0?q=${latitude},${longitude}(${label})`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          // Fallback to Google Maps if the device doesn't support the maps URL scheme
          const browser_url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          Linking.openURL(browser_url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

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
        {/* Custom Back Button */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back to event list"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
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
          {/* Location Section with "OPEN MAPS" Link */}
          <View style={styles.locationHeader}>
            <Text style={styles.sectionTitle}>Location</Text>
            <TouchableOpacity onPress={openMaps} accessibilityLabel="Open location in Maps">
              <Text style={styles.openMapsText}>OPEN MAPS</Text>
            </TouchableOpacity>
          </View>
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
  backButton: {
    position: 'absolute',
    top: 50, // Adjust based on your header height and status bar
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
    marginBottom: 5,
    color: '#333',
  },
  openMapsText: {
    fontSize: 14,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
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
