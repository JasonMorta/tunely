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
  Platform,
  Linking,
  Alert
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
  const openMaps = async () => {
    const { latitude, longitude } = event.location;
    const label = encodeURIComponent(event.title);
    let url = '';

    if (Platform.OS === 'ios') {
      // Attempt to open Google Maps
      const googleMapsURL = `comgooglemaps://?q=${latitude},${longitude}`;
      const appleMapsURL = `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`;

      // Check if Google Maps is installed
      const supported = await Linking.canOpenURL(googleMapsURL);
      if (supported) {
        url = googleMapsURL;
      } else {
        // Fallback to Apple Maps
        url = appleMapsURL;
      }
    } else {
      // For Android, attempt to open Google Maps
      const googleMapsURL = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;
      const browserURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      // Check if Google Maps is installed
      const supported = await Linking.canOpenURL(googleMapsURL);
      if (supported) {
        url = googleMapsURL;
      } else {
        // Fallback to browser-based Google Maps
        url = browserURL;
      }
    }

    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('An error occurred while trying to open maps:', error);
      Alert.alert(
        'Error',
        'Unable to open the maps application. Please try again later.'
      );
    }
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
       
        <View style={styles.detailsContainer}>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back to event list"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

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
              <Text style={styles.openMapsText}>DIRECTIONS</Text>
            </TouchableOpacity>
          </View>
          <MapView
            // No need to specify the provider; it defaults based on the platform
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
    bottpm: Platform.OS === 'ios' ? 100 : 100, // Adjust based on your header height and status bar
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
    // Add any additional custom styles you have
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
