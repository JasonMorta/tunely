// components/TabBar.tsx

import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon library

// Define icons for each tab route
const icons: { [key: string]: () => JSX.Element } = {
  index: () => <Ionicons name="home" size={24} color="black" />,
  explorer: () => <Ionicons name="search" size={24} color="black" />,
  create: () => <Ionicons name="add-circle" size={24} color="black" />,
  profile: () => <Ionicons name="person" size={24} color="black" />,
  // Add more icons if you have additional tabs
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        // Only process routes that have corresponding icons
        if (!icons[route.name]) {
          return null; // Skip rendering if no icon is defined
        }

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const IconComponent = icons[route.name];

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={route.name} // Ensure key is unique
          >
            {IconComponent ? IconComponent() : null}
            <Text style={[styles.label, isFocused ? styles.labelFocused : styles.labelDefault]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  labelFocused: {
    color: '#673ab7',
    fontWeight: 'bold',
  },
  labelDefault: {
    color: '#222',
  },
});
