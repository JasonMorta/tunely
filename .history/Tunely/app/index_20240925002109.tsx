// app/index.tsx

import { View, StyleSheet } from 'react-native';
import React from 'react';
import EventList from '@/components/EventList';

export default function Index() {
  return (
    <View style={styles.container}>
      <EventList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes up the full screen
    backgroundColor: 'green',
  },
});
