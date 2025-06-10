import React, { useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import { Link, router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Button from '@/components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splitEditModal from './splitEditModal';
import splitValueEditModal from './splitValueEditModal';
import SplitEdit from './splitEdit';
import {DynamicColorIOS} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";



// const Stack = createNativeStackNavigator();

var date = new Date;
const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

export default function Index() {
  async function getWeekday(): Promise<any> {
    const today = weekdays[date.getDay()]

    console.log(today)

    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const url = "http://127.0.0.1:8080/workout/getWeek/" + String(today)
  

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      })

      const data = await response.text()
      console.log(response)
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }
  
    var [weekDay, setWeekDay] = useState<String>("");
  
    useEffect(() => {
      const fetchData = async () => {
        
        weekDay = await getWeekday();
        console.log('Week Day:', weekDay);  // Check if data is being fetched correctly
  
        setWeekDay(weekDay);
      };
  
      fetchData(); 
    }, []); 
  

  return (
    // <SafeAreaView></SafeAreaView>
      <View
        style={styles.container}
      >
      <Text style={styles.title}>Today's Workout</Text>
      <Link href={{pathname:"/splitEdit", params: {weekDay : String(weekDay)} }} style={styles.button}>
            {weekDay}
      </Link>


        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 4,
    borderColor: '#f90202',
    borderRadius: 4,
    backgroundColor: '#000000',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 4,
    borderColor: '#f90202',
    borderRadius: 10,
    backgroundColor: '#000000',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 30,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },  
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});

// const customDynamicTextColor = DynamicColorIOS({
//   dark: 'lightskyblue',
//   light: 'midnightblue',
// });

// const customContrastDynamicTextColor = DynamicColorIOS({
//   dark: 'darkgray',
//   light: 'lightgray',
//   highContrastDark: 'black',
//   highContrastLight: 'white',
// });
