import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabBar({ state, descriptors, navigation }) {

  const icons = {
    index: (props)=> <MaterialIcons name="home" size={26} color={secondaryColor} {...props} />,
    explorer: (props)=> <MaterialIcons name="search" size={26} color={secondaryColor} {...props} />,
    create: (props)=> <MaterialIcons name="add" size={26} color={secondaryColor} {...props} />,
    profile:(props)=> <MaterialIcons name="account-circle" size={26} color={secondaryColor} {...props} />,
  }

  const primaryColor = 'red'
  const secondaryColor = 'gray'

  return (
    <View>
       <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

            console.log('Route name:', route.name)
            if ([ '_sitemap', '+not-found'].includes(route.name)) return null

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
          style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
       
          >
            {
              icons[route.name as keyof typeof icons]({
                style: {color: isFocused ? primaryColor : secondaryColor}
              })
            }
            <Text style={{ color: isFocused ? primaryColor : secondaryColor }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    borderCurve: 'continuous',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10},
    shadowRadius: 10.46,
    shadowOpacity: 0.32,
    bottom: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  }
});
