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
    return "Split added successfully!"
  } catch (error) {
    console.log(error)
  }


    
  }


const { workoutName } = useLocalSearchParams();
var {weight} = useLocalSearchParams();
var {notes} = useLocalSearchParams();
const isPresented = router.canGoBack();
// const [modalVisible, setModalVisible] = useState(true);

  var [weightVar, onChangeText2] = React.useState(Number(weight));
  var [notesVar, onChangeText3] = React.useState(String(notes));
  return (
    // <Modal 
    // //animationType="slide"
    // visible={modalVisible}
    // onRequestClose={() => {
    //   Alert.alert('Modal has been closed.');
    //   setModalVisible(!modalVisible);
    // }}>
    <View style={styles.container}>
      <Text>{workoutName}</Text>
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
    color="#007AFF"
        onPress={() => {
        splitList[String(workoutName)] = [weightVar, notesVar]
        console.log(splitList)
        
        postWorkout(String(workoutName), weightVar, notesVar)

        }}
    />

      
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});