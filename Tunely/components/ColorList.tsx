import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

export default function ColorList({ color }: { color: string }) {
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[1, 0.8, 0.6, 0.4, 0.2].map((opacity) => (
        <View
          key={opacity}
          style={[
            styles.color,
            { backgroundColor: color, opacity }
          ]}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  color: {
    width: '100%',
    height: 150,
    borderRadius: 25,
    borderCurve: 'continuous',
    // Note: 'borderCurve' is not a standard React Native style property.
    // If you're targeting iOS 15+ or Android 12+, you might need to handle it differently.
    // For now, you can remove it or implement conditional styling based on platform/version.
    // borderCurve: 'continuous',
    marginBottom: 15,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    marginHorizontal: 20,
  },
});
