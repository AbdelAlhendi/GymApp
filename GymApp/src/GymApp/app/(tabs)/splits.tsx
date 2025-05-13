import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import Button from '@/components/Button';
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';



export default function Splits( ) {
    const navigation = useNavigation();
  
        async function getSplits(): Promise<any> {
          //Promise<(number | string)[]
          // var json = {"command" : "Workout",
          //   "workouts" : "ShoulderPress"}
        
          const headers: Headers = new Headers()
          headers.set('Content-Type', 'application/json')
          const url = "http://127.0.0.1:8080/workout/getSplitAll"
         
      
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
          // }
        } catch (error) {
          console.log(error)
        }
      
      
          
        }
      
      //   const [weight, setWeight] = useState<number | null>(null);
      //   const [notes, setNotes] = useState<string>("");
        const [splitData, setSplitData] = useState<Array<String>>(Array<String>);
      
        useEffect(() => {
          const fetchData = async () => {
            const splitData = await getSplits();
            console.log('Split Data:', splitData);  // Check if data is being fetched correctly
            
          //   for (let i = 0; i < workoutData.length(); i++) {
              
          //   }
            setSplitData(splitData);
            
      
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
    <Text>Splits</Text>
    {splitData.map((split, index) => (
            <View key={index} style={{ marginVertical: 8 }}>

              <Link href={{pathname:"/splitEdit", params: {split : String(split)} }} style={styles.link}>
                   {split}
              </Link>
            </View>
          ))}
    <Link href={{pathname:"/splitEdit", params: {split : "Split Name"} }} style={styles.link}> Add a new Split </Link>
      
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});