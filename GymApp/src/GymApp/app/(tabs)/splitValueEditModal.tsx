import { StyleSheet, Text, View, Button, Modal, Alert, TextInput } from 'react-native';
import { Link, router, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect } from "react";

import {splitList} from './splitEdit';
import { goBack } from 'expo-router/build/global-state/routing';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { navigate } from "expo-router/build/global-state/routing";



export default function splitValueEditModal() {

async function postWorkout(workoutName: string, weight: number, notes: string): Promise<(any)> {

    var json = {command : "putWorkout",
                workouts: {[workoutName] : [weight, notes]}
    }
    console.log(json)
    
    
  
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const url = "http://127.0.0.1:8080/workout"
   

    try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(json)
    })

    
    
    const data = await response.json()
    // console.log(response)
    console.log(data)
    return "Workout updated successfully!"
  } catch (error) {
    console.log(error)
  }


    
  }

  async function addWorkout(workoutName: string, weight: number, notes: string): Promise<(any)> {

    var json = {command : "postWorkout",
                workouts: {[workoutName] : [weight, notes]}
    }
    console.log(json)
  
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const url = "http://127.0.0.1:8080/workout"
   

    try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(json)
    })

    
    
    const data = await response.json()
    // console.log(response)
    console.log(data)
    return "Workout added successfully!"
  } catch (error) {
    console.log(error)
  }

  }


var { workoutName } = useLocalSearchParams();
var {weight} = useLocalSearchParams();
var {notes} = useLocalSearchParams();
const isPresented = router.canGoBack();
// const [modalVisible, setModalVisible] = useState(true);

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
      {/* <Text>{workoutName}</Text> */}
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
        splitList[String(workoutName)] = [weightVar, notesVar]
        console.log(splitList)
        
        postWorkout(String(workoutVar), weightVar, notesVar)

        }}
    />
    <Button
    title={"Add Workout"}
    color="#f90202"
        onPress={() => {
        addWorkout(String(workoutVar), weightVar, notesVar)
        

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
    height: 40,
    margin: 12,
    borderWidth: 5,
    padding: 10,
    color: '#FFFFFF',
    backgroundColor: '#000000',
    borderColor: '#f90202'
  },
});