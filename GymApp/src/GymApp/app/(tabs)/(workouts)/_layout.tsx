import { Stack } from 'expo-router';
import React from 'react';

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="workouts" options={{ headerShown: false }} />
    </Stack>
  );
}