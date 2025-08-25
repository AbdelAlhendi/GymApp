import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";


type Schedule = {weekday: string, splitName: string}

export default function Weekdays() {


  const database = SQLite.useSQLiteContext();
  var [scheduleData, setSchedule] = useState<Schedule[]>([]);


  const loadSchedule = async () => {
    const result = await database.getAllAsync<Schedule>("SELECT * FROM schedule;");
    setSchedule(result);
    console.log(scheduleData)
  };

  useFocusEffect(
    useCallback(() => {
      loadSchedule();
    }, [])
  );


  return (
    <View
      style={styles.container}>
      <Text style={styles.title}>WEEKDAYS SCREEN</Text>

      <View>
        <FlatList 
          data={scheduleData} 
          renderItem={({ item }) => {
            return (
            <View>
              <Link href={{pathname:"/weekdaysEdit", params: { weekday: item.weekday } }} style={styles.button}>
                {item.weekday}
              </Link>
              <Text style={styles.link}> {item.splitName} </Text>
            </View>
          );
        }}
        />
      </View>
      
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
    color: '#FFF',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#f90202'
  },
});