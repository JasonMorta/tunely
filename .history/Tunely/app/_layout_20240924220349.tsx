// app/_layout.tsx

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Regular Screens */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="explorer" options={{ title: 'Explorer' }} />
      <Stack.Screen name="create" options={{ title: 'Create Event' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      
      {/* Modal Group */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="EventModal" options={{ title: 'Event Details' }} />
      </Stack.Group>
    </Stack>
  );
}
