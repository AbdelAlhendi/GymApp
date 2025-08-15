
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splitEditModal from './splitEditModal';
import splitValueEditModal from './splitValueEditModal';
import SplitEdit from './splitEdit';


const Stack = createNativeStackNavigator();

export default function HomeLayout() {
  return (
    

    <Tabs screenOptions={{ tabBarActiveTintColor: 'black', tabBarInactiveTintColor: "red",  tabBarInactiveBackgroundColor: "black", tabBarActiveBackgroundColor: "red"}}  >
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
        href: null

      }}
      />
    <Tabs.Screen
      name="weekdaysEdit"
      options={{
        title: 'WeekdaysEdit',
        headerShown: false,
        href: null

      }}
      />
      <Tabs.Screen
      name="splits"
      options={{
        title: 'Splits',
        headerShown: false,
        href: null
        
      }}
      />
     
      
      <Stack.Navigator>
      
        <Stack.Screen
          name="SplitEdit"
          component={SplitEdit}
          options={{
            title: 'SplitEdit',
            headerShown: false,
            headerTintColor: "f90202"
            
          }}
        />
        <Stack.Screen
          name="splitEditModal"
          component={splitEditModal}
          options={{      
            title:"splitEditModal",
            presentation: 'modal',
            headerShown: false,}}
        />
        <Stack.Screen
          name="splitValueEditModal"
          component={splitValueEditModal}
          options={{      
            title:"splitValueEditModal",
            presentation: 'modal',
            headerShown: false,}}
        />
      </Stack.Navigator>
      /</Tabs>
      

  );
  
}

