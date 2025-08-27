import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";

// var splitName = "";

import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";


type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};

export default function WeekdaysEdit() {
  const {weekday} = useLocalSearchParams();


  const database = SQLite.useSQLiteContext();


  const putWeekday = async (weekday: string, splitName: string) => {
  try {
    console.log(weekday)
    console.log(splitName)
    const query = "UPDATE schedule SET splitName = ? WHERE weekday = ?;";
    database.runAsync(query, [
      splitName,
      weekday,
    ]);
  } catch (error) {
    console.error(error)
  }
};

  const [splits, setData] = useState<Splits[]>([]);

  const loadSplits = async () => {

    const result = await database.getAllAsync<Splits>("SELECT * FROM workoutLsts;");
    setData(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadSplits();
    }, [])
  );


  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>Weekdays Edit Screen</Text>

      <Link href={{pathname:"/weekdays" }} style={styles.button}>
        back
      </Link>

      <View>
        <FlatList 
          data={splits} 
          renderItem={({ item }) => {
            return (
            <View>
              <Button
                title={String(item.workoutLst)}
                color="#e43404"
                
                onPress={() => {
                  putWeekday(String(weekday), String(item.workoutLst))
                }}
              />
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
  link: {
    paddingTop: 20,
    fontSize: 20,
    
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});