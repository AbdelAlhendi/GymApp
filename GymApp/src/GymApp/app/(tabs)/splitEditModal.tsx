import { StyleSheet, Text, View, Button, Modal, Alert } from 'react-native';
import { Link, router} from 'expo-router';
import React, { useState, useEffect } from "react";

import {splitList} from './splitEdit';
import { goBack } from 'expo-router/build/global-state/routing';

export default function splitEditModal() {
      async function getWorkouts(): Promise<any> {
        //Promise<(number | string)[]
        // var json = {"command" : "Workout",
        //   "workouts" : "ShoulderPress"}
      
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'application/json')
        const url = "http://127.0.0.1:8080/workout/getWorkoutAll"
       
    
        try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
          // body: JSON.stringify(json)
        })
    
    
        
        
        const data = await response.json()
        console.log(response)
        console.log(data)
        // if (data == undefined) {
        //     var undefinedJson = [{"workout" : [-1, "undefined"]}];
        //     return [{}];
        // } else {
            return data
        // }
      } catch (error) {
        console.log(error)
      }
    
    
        
      }
    
    //   const [weight, setWeight] = useState<number | null>(null);
    //   const [notes, setNotes] = useState<string>("");
      const [workoutData, setWorkoutData] = useState<JSON>(JSON);
    
      useEffect(() => {
        const fetchData = async () => {
          const workoutData = await getWorkouts();
          console.log('Workout Data:', workoutData);  // Check if data is being fetched correctly
          
        //   for (let i = 0; i < workoutData.length(); i++) {
            
        //   }
          setWorkoutData(workoutData);
          
    
          //const [weight, notes] = workoutData;
    
          //console.log('Fetched Weight:', weight);
          //console.log('Fetched Notes:', notes);
    
          // Set state with the fetched values
          //setWeight(weight);
          //setNotes(notes);
        };
    
        fetchData(); 
      }, []); 

const isPresented = router.canGoBack();
// const [modalVisible, setModalVisible] = useState(true);


  return (
    // <Modal 
    // //animationType="slide"
    // visible={modalVisible}
    // onRequestClose={() => {
    //   Alert.alert('Modal has been closed.');
    //   setModalVisible(!modalVisible);
    // }}>
    <View style={styles.container}>
      <Text>Workouts</Text>
      {Object.entries(workoutData).map(([workout, [weight, notes]], index) => (
        <View key={index} style={{ marginVertical: 8 }}>
          {/* <Text> {workout} - {weight} ({notes})</Text> */}
          <Button
            title={`${workout} - ${weight} (${notes})`}
            color="#007AFF"
            
            onPress={() => {
              splitList[workout] = [weight, notes];
              // setModalVisible(false)
            }}
          />
        </View>
      ))}
      
      {isPresented && <Link href="../splitEdit">Back</Link>}
    </View>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});