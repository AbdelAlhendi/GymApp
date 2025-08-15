import { StyleSheet, Text, View, Button, Modal, Alert } from 'react-native';
import { Link, router, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect } from "react";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


// import {splitList} from './splitEdit';
import { goBack } from 'expo-router/build/global-state/routing';

// type RootTabParamList = {
//   Home: undefined;
//   Settings: undefined;
//   SplitEditModal: undefined;
// };
// type Props = BottomTabScreenProps<RootTabParamList, 'SplitEditModal'>;


export default function splitEditModal() {
      async function getWorkouts(): Promise<any> {
      
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
            return data
      } catch (error) {
        console.log(error)
      }
      }
      const [workoutData, setWorkoutData] = useState<JSON>(JSON);
    
      useEffect(() => {
        const fetchData = async () => {
          const workoutData = await getWorkouts();
          console.log('Workout Data:', workoutData);  // Check if data is being fetched correctly
          setWorkoutData(workoutData);
        };
    
        fetchData(); 
      }, []); 



  async function postSplit(splitName: string, splitCheck : String): Promise<(any)> {

    if (Object.keys(splitList).length == 0) {
      return "No workouts in split."
    } else {

      var workoutLst = []
      for (let i = 0; i < Object.keys(splitList).length; i++) {
        workoutLst.push(Object.keys(splitList).at(i))
      }
      console.log("workoutLst:" + workoutLst)

      console.log("split Check: " + splitCheck)
      
      if (splitCheck == "Split Name") { // new split
        var json = {command : "postSplit",
            splitName : {[splitName] : workoutLst}
        }
      } else { // updating already existing split
        var json = {command : "putSplit",
            splitName : {[splitName] : workoutLst}
        }
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
        console.log(response)
        console.log(data)
        return "Split added successfully!"
      } catch (error) {
        console.log(error)
      }


      
    }
  }

  async function getSplits(splitName: String): Promise<any> {
    
    console.log(splitName)

    if (splitName != "Split Name") {
      
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      const url = "http://127.0.0.1:8080/workout/getSplit/" + splitName
    

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        })
        
        const data = await response.json()
        console.log(response)
        console.log(data)
        
        return data
      } catch (error) {
        console.log(error)
      }
    } else {
      return {}
    }
  }

//   const [weight, setWeight] = useState<number | null>(null);
//   const [notes, setNotes] = useState<string>("");
var [splitList, setSplitList] = useState<Record<string, [number, string]>>({});
var [splitCheck, setSplitCheck] = useState<String>();
var {splitName} = useLocalSearchParams();
console.log(splitName)
// var {splitListReturn} = useLocalSearchParams();
// console.log(splitListReturn)
  useEffect(() => {
    const fetchData = async () => {
      splitList = await getSplits(String(splitName));
      
      console.log('Split List:', splitList);  // Check if data is being fetched correctly
      setSplitList(splitList);

      if (Object.keys(splitList).length == 0) { // if empty, no existing split in db, new split being made
        splitCheck = "Split Name"
        setSplitCheck(splitCheck)
      } else {
        splitCheck = "Existing Split"
        setSplitCheck(splitCheck)
      }

      
    };

    fetchData(); 
  }, []); 

  return (

    
    <View style={styles.container}>
      <Text>Workouts</Text>
      {Object.entries(workoutData).map(([workout, [weight, notes]], index) => (
        <View key={index} style={{ marginVertical: 8 }}>
          <Button
            title={`${workout} - ${weight} (${notes})`}
            color="#f90202"
            
            onPress={() => {
              splitList[workout] = [weight, notes];
              setSplitList(splitList)
              console.log(splitList)
              }}
          />
        </View>
      ))}
      <Button
            title={"Save"}
            color="#f90202"
            
            onPress={() => {
              postSplit(String(splitName), String(splitCheck))
            }}
          />
      <Link href={{pathname:"/splitEdit" }} style={styles.link}>
      back
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