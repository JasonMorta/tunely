// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import TabBar from '@/components/TabBar';

export default function Layout() {
  return (
    <Stack>
      {/* Regular Screens Group */}
      <Stack.Group>
        <Tabs tabBar={props => <TabBar {...props} />}>
          <Tabs.Screen
            name='index'
            options={{
              title: 'HOME',
              // tabBarIcon: 'home',
            }}
          />

          <Tabs.Screen
            name='explorer'
            options={{
              title: 'EXPLORER',
              // tabBarIcon: 'search',
            }}
          />

          <Tabs.Screen
            name='create'
            options={{
              title: 'CREATE',
              // tabBarIcon: 'plus',
            }}
          />

          <Tabs.Screen
            name='profile'
            options={{
              title: 'PROFILE',
              // tabBarIcon: 'user',
            }}
          />
        </Tabs>
      </Stack.Group>

      {/* Modal Screens Group */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
          name='EventModal' 
          options={{ 
            title: 'Event Details',
            // You can customize modal-specific options here
          }} 
        />
      </Stack.Group>
    </Stack>
  );
}
