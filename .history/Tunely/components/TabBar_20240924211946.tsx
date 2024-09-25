// components/TabBar.tsx

import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon library

const icons = {
  index: () => <Ionicons name="home" size={24} color="black" />,
  explorer: () => <Ionicons name="search" size={24} color="black" />,
  create: () => <Ionicons name="add-circle" size={24} color="black" />,
  profile: () => <Ionicons name="person" size={24} color="black" />,
  // Do NOT include non-tab routes here
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: 'row', height: 60, borderTopWidth: 1, borderTopColor: '#ddd' }}>
      {state.routes.map((route, index) => {
        // Skip routes without icons
        if (!icons[route.name]) {
          return null;
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
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            key={route.name} // Unique key
          >
            {IconComponent ? IconComponent() : null}
            <Text style={{ color: isFocused ? '#673ab7' : '#222', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
