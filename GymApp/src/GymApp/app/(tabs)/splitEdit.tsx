import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from '@/components/Button';
import { Link } from "expo-router";


export default function SplitEdit() {
  async function getWorkouts(): Promise<(any)> {
    //Promise<(number | string)[]
    var json = {"command" : "Workout",
      "workouts" : "ShoulderPress"}
  
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const url = "http://127.0.0.1:8080/workout/getWorkout/shoulderPress"
   

    try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      // body: JSON.stringify(json)
    })


    
    
    const data = await response.json()
    console.log(response)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }


    
  }

  const [weight, setWeight] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const workoutData = await getWorkouts();
      //console.log('Workout Data:', workoutData);  // Check if data is being fetched correctly

      //const [weight, notes] = workoutData;

      //console.log('Fetched Weight:', weight);
      //console.log('Fetched Notes:', notes);

      // Set state with the fetched values
      //setWeight(weight);
      //setNotes(notes);
    };

    fetchData(); 
  }, []); 

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>SPLITS EDIT SCREEN</Text>
    {/* <Link href="/(tabs)/splits"><Button label="Add a new Split"/></Link> */}
    {/* Use a Modal to bring up list of workouts to add: https://docs.expo.dev/router/advanced/modals/ */}
    <Link href="/splitEditModal" style={styles.link}>
        Add a workout
    </Link>
    
    <Text>{weight}</Text>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
});



