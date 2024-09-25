import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Example icon library

const icons = {
  index: () => <Ionicons name="home" size={24} color="black" />,
  explorer: () => <Ionicons name="search" size={24} color="black" />,
  create: () => <Ionicons name="add-circle" size={24} color="black" />,
  profile: () => <Ionicons name="person" size={24} color="black" />,
  // Ensure no other routes are added here
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: 'row', height: 60 }}>
      {state.routes.map((route, index) => {
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
            key={route.name} // Ensure key is unique
          >
            {IconComponent ? IconComponent() : null}
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}