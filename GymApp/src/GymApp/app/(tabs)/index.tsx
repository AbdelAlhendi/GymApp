import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { Link, router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Button from '@/components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splitEditModal from './splitEditModal';
import splitValueEditModal from './splitValueEditModal';
import SplitEdit from './splitEdit';

// const Stack = createNativeStackNavigator();



export default function Index() {

  return (
    // <NavigationContainer>
          // <NavigationContainer>
          // <Stack.Navigator>
          //   <Stack.Screen
          //     name="SplitEdit"
          //     component={SplitEdit}
          //     options={{
          //       title: 'SplitEdit',
          //       headerShown: false,
          //     }}
          //   />
          //   <Stack.Screen
          //     name="splitEditModal"
          //     component={splitEditModal}
          //     options={{      
          //       title:"splitEditModal",
          //       presentation: 'modal',
          //       headerShown: false,}}
          //   />
          //   <Stack.Screen
          //     name="splitValueEditModal"
          //     component={splitValueEditModal}
          //     options={{      
          //       title:"splitValueEditModal",
          //       presentation: 'modal',
          //       headerShown: false,}}
          //   />
          // </Stack.Navigator>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Home</Text>
        
        {/* <Link href="/(tabs)/workouts"><Button label="Navigate to nested route" /></Link> */}
      </View>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
