import { StyleSheet, Text, View, Button, Modal, Alert, TextInput } from 'react-native';
import { Link, router, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect } from "react";


import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";


type Workouts = { workout: string, weight: number, notes: string};

export default function splitValueEditModal() {

  const database = SQLite.useSQLiteContext();

  var { workoutName } = useLocalSearchParams();
  var {weight} = useLocalSearchParams();
  var {notes} = useLocalSearchParams();

  const updateWorkout = async () => {
    try {
      const query = "UPDATE workouts SET weight = ?, notes = ? WHERE workout = ?"
      database.runAsync(query, [
        weightVar,
        notesVar,
        workoutVar,
      ]);
      console.log("workout updated: " + workoutVar + " - " + weightVar + " - " + notesVar)
    } catch (error) {
      console.error(error)
    }
  };


const isPresented = router.canGoBack();

  var [weightVar, onChangeText2] = React.useState(Number(weight));
  var [notesVar, onChangeText3] = React.useState(String(notes));
  var [workoutVar, onChangeText4] = React.useState(String(workoutName));
  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={String(workoutName)}
        onChangeText={newWorkout => onChangeText4(String(newWorkout))}
        value={String(workoutVar)}
        
    />
    <TextInput
        style={styles.input}
        placeholder={String(weight)}
        onChangeText={newWeight => onChangeText2(Number(newWeight))}
        value={String(weightVar)}
    />
    <TextInput
        style={styles.input}
        placeholder={String(notes)}
        onChangeText={newNotes => onChangeText3(newNotes)}
        value={notesVar}
    />
    <Button
    title={"Save Weight and Notes"}
    color="#f90202"
        onPress={() => {
        updateWorkout();
        }}
    />
      
      {isPresented && <Link href="../splitEdit">Back</Link>}
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
  input: {
    marginTop: 40,
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#f90202'
  },
});