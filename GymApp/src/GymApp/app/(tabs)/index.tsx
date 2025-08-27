import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import { Link, router, useFocusEffect, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Button from '@/components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import splitEditModal from './splitEditModal';
import splitValueEditModal from './splitValueEditModal';
import SplitEdit from './splitEdit';
import {DynamicColorIOS} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";





// const Stack = createNativeStackNavigator();

var date = new Date;
const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

type Workouts = { workout: string, weight: number, notes: string};

type Schedule = {weekday: string, splitName: string}

export default function Index() {

  // const [data, setData] = useState<Workouts[]>([]);

  const database = SQLite.useSQLiteContext();

  // const loadWorkouts = async () => {
  //   const result = await database.getAllAsync<Workouts>("SELECT * FROM workouts;");
  //   console.log(result)
  //   setData(result);
  //   // console.log(data)
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     loadWorkouts();
  //   }, [])
  // );

  var [scheduleData, setSchedule] = useState<Schedule[]>([]);
  

  const loadSchedule = async () => {
    const result = await database.getAllAsync<Schedule>("SELECT * FROM schedule WHERE weekday = ?;", 
      String(weekdays.at(date.getDay()))
    );
    setSchedule(result);
    console.log(scheduleData)
  };

  useFocusEffect(
    useCallback(() => {
      loadSchedule();
    }, [])
  );
  

  return (
      <View style={styles.container}>

        <Text style={styles.title}>Today's Workout</Text>
        
        <Link href={{pathname:"/splitEdit", params: {split : String(scheduleData.at(0)?.splitName)} }} style={styles.button}>
          {String(scheduleData.at(0)?.splitName)}
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
    marginTop: 40,
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
