import React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
// import Button from '@/components/Button';
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";


export default function Workouts() {
  
  const database = useSQLiteContext();

  const postWorkout = async (workoutVar: string, weightVar: number, notesVar: string) => {
    try {
      const query = "INSERT INTO workouts(workout,weight,notes) VALUES(?,?,?)";
      database.runAsync(query, [
        workoutVar,
        weightVar,
        notesVar,
      ]);
    } catch (error) {
      console.error(error)
    }
  };

  const putWorkout = async (workoutVar: string, weightVar: number, notesVar: string) => {
    try {
      const query = "UPDATE workouts SET weight = ?, notes = ? WHERE workout = ?";
      database.runAsync(query, [
        weightVar,
        notesVar,
        workoutVar,
      ]);
    } catch (error) {
      console.error(error)
    }
  };

  var [weightVar, onChangeText2] = React.useState(Number(0));
  var [notesVar, onChangeText3] = React.useState("");
  var [workoutVar, onChangeText4] = React.useState("");
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>WORKOUTS SCREEN</Text>
      <Link href="/(tabs)/weekdays" style={styles.button}>Weekdays: Assign a Split to your Weekdays</Link>

      <Link href="/(tabs)/splits" style={styles.button}>Splits: Create or edit your Splits</Link>
      <TextInput
              style={styles.input}
              placeholder={workoutVar}
              onChangeText={newWorkout => onChangeText4(String(newWorkout))}
              value={String(workoutVar)}
              
          />
          <TextInput
              style={styles.input}
              placeholder={String(weightVar)}
              onChangeText={newWeight => onChangeText2(Number(newWeight))}
              value={String(weightVar)}
          />
          <TextInput
              style={styles.input}
              placeholder={String(notesVar)}
              onChangeText={newNotes => onChangeText3(newNotes)}
              value={notesVar}
          />
          <Button
          title={"Save Weight and Notes"}
          color='#f90202'
              onPress={() => {
              
              putWorkout(String(workoutVar), weightVar, notesVar)
      
              }}
          />
          <Button
          title={"Add Workout"}
          color='#f90202'
              onPress={() => {
              postWorkout(String(workoutVar), weightVar, notesVar)
              
      
              }}
          />
      
      
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
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#f90202'
  },
});