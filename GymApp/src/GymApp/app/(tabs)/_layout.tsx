// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Stack } from 'expo-router/stack';

// export default function TabLayout() {
//   return (
//     <Tabs>
//       <Tabs.Screen name="(home)" options={{ headerShown: false }} />
//       {/* <Tabs.Screen name="(workouts)" options={{ headerShown: false }} /> */}
//     </Tabs>
  
    
//   );
  
// }
import { FontAwesome } from '@expo/vector-icons';
import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }} >
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color}/>,
        
      }}
    />
    <Tabs.Screen
      name="workouts"
      options={{
        title: 'Workouts',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color}/>,
      }}
    />
    <Tabs.Screen
      name="nutrition"
      options={{
        title: 'Nutrition',
        headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color}/>,
      }}
    />
    {/* Hidden Routes */}
    <Tabs.Screen
      name="weekdays"
      options={{
        title: 'Weekdays',
        headerShown: false,
        href: null,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
      />
      <Tabs.Screen
      name="splits"
      options={{
        title: 'Splits',
        headerShown: false,
        href: null,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
      />
      <Tabs.Screen
      name="splitEdit"
      options={{
        title: 'Split Edit',
        headerShown: false,
        href: null,
        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
      }}
      />
  </Tabs>
    // <Stack
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //   }}>
    //   <Stack.Screen name="index" options={{ headerShown: false }} />
    //   <Stack.Screen name="nutrition" options={{ headerShown: false }} />
    // </Stack>
  );
}

