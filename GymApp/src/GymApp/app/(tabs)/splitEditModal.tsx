import { StyleSheet, Text, View, Button, Modal, Alert } from 'react-native';
import { Link, router, useFocusEffect, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect, useCallback } from "react";
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';


// import {splitList} from './splitEdit';
import { goBack } from 'expo-router/build/global-state/routing';
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";

// type RootTabParamList = {
//   Home: undefined;
//   Settings: undefined;
//   SplitEditModal: undefined;
// };
// type Props = BottomTabScreenProps<RootTabParamList, 'SplitEditModal'>;
type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};

type Workouts = { workout: string, weight: number, notes: string};

export default function splitEditModal() {
      // async function getWorkouts(): Promise<any> {
      
      //   const headers: Headers = new Headers()
      //   headers.set('Content-Type', 'application/json')
      //   const url = "http://127.0.0.1:8080/workout/getWorkoutAll"
       
    
      //   try {
      //   const response = await fetch(url, {
      //     method: "GET",
      //     headers: headers,
      //     // body: JSON.stringify(json)
      //   })
      //   const data = await response.json()
      //   console.log(response)
      //   console.log(data)
      //       return data
      // } catch (error) {
      //   console.log(error)
      // }
      // }
      // const [workoutData, setWorkoutData] = useState<JSON>(JSON);
    
      // useEffect(() => {
      //   const fetchData = async () => {
      //     const workoutData = await getWorkouts();
      //     console.log('Workout Data:', workoutData);  // Check if data is being fetched correctly
      //     setWorkoutData(workoutData);
      //   };
    
      //   fetchData(); 
      // }, []); 



  // async function postSplit(splitName: string, splitCheck : String): Promise<(any)> {

  //   if (Object.keys(splitList).length == 0) {
  //     return "No workouts in split."
  //   } else {

  //     var workoutLst = []
  //     for (let i = 0; i < Object.keys(splitList).length; i++) {
  //       workoutLst.push(Object.keys(splitList).at(i))
  //     }
  //     console.log("workoutLst:" + workoutLst)

  //     console.log("split Check: " + splitCheck)
      
  //     if (splitCheck == "Split Name") { // new split
  //       var json = {command : "postSplit",
  //           splitName : {[splitName] : workoutLst}
  //       }
  //     } else { // updating already existing split
  //       var json = {command : "putSplit",
  //           splitName : {[splitName] : workoutLst}
  //       }
  //     }

  //     console.log(json)
      
      
    
  //     const headers: Headers = new Headers()
  //     headers.set('Content-Type', 'application/json')
  //     const url = "http://127.0.0.1:8080/workout"
    

  //       try {
  //       const response = await fetch(url, {
  //         method: "POST",
  //         headers: headers,
  //         body: JSON.stringify(json)
  //       })

        
        
  //       const data = await response.json()
  //       console.log(response)
  //       console.log(data)
  //       return "Split added successfully!"
  //     } catch (error) {
  //       console.log(error)
  //     }


      
  //   }
  // }

  // async function getSplits(splitName: String): Promise<any> {
    
  //   console.log(splitName)

  //   if (splitName != "Split Name") {
      
  //     const headers: Headers = new Headers()
  //     headers.set('Content-Type', 'application/json')
  //     const url = "http://127.0.0.1:8080/workout/getSplit/" + splitName
    

  //     try {
  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: headers,
  //       })
        
  //       const data = await response.json()
  //       console.log(response)
  //       console.log(data)
        
  //       return data
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     return {}
  //   }
  // }

//   const [weight, setWeight] = useState<number | null>(null);
//   const [notes, setNotes] = useState<string>("");
// var [splitList, setSplitList] = useState<Record<string, [number, string]>>({});
var [splitCheck, setSplitCheck] = useState<String>();
var {splitName} = useLocalSearchParams();
console.log(splitName)
// var {splitListReturn} = useLocalSearchParams();
// console.log(splitListReturn)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     splitList = await getSplits(String(splitName));
      
  //     console.log('Split List:', splitList);  // Check if data is being fetched correctly
  //     setSplitList(splitList);

  //     if (Object.keys(splitList).length == 0) { // if empty, no existing split in db, new split being made
  //       splitCheck = "Split Name"
  //       setSplitCheck(splitCheck)
  //     } else {
  //       splitCheck = "Existing Split"
  //       setSplitCheck(splitCheck)
  //     }

      
  //   };

  //   fetchData(); 
  // }, []); 



  const database = SQLite.useSQLiteContext();

  const [splits, setData] = useState<Splits[]>([]);


  const loadSplit = async () => {

    const result = await database.getAllAsync<Splits>("SELECT workout1, workout2, workout3, workout4, workout5,"
            + " workout6, workout7, workout8, workout9, workout10 FROM workoutLsts WHERE workoutLst = ?", [
              String(splitName),
            ]);

  
    setData(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadSplit();
    }, [])
  );

    var [splitList2, setSplitList2] = useState<Workouts[]>([]);
  
    const loadWorkout = async () => {
      try {
  
        const splitParsed = splits.at(0);
        // fucking hell bro
        var  result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout1),
        ]);
        var workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout2),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout3),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout4),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout5),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout6),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout7),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout8),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout9),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout10),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList2.push(workoutParsed)
        }
  
        setSplitList2(splitList2);
        console.log(splitList2)
      } catch (error) {
        console.error(error)
      }
      
      };
    
      useFocusEffect(
        useCallback(() => {
          loadWorkout();
        }, [])
      );

  const updateSplit = async () => {
    try {
      var workoutsToUpdateList = [];
      workoutsToUpdateList.push(String(splits.at(0)?.workoutLst))
      for (var i = 0; i < splitList2.length; i++) {
        workoutsToUpdateList.push(String(splitList2.at(i)?.workout))
      }
      

      const query = "UPDATE workoutLsts SET workout1 = ?, workout2 = ?, workout3 = ?, workout4 = ?,"
            + " workout5 = ?, workout6 = ?, workout7 = ?, workout8 = ?, workout9 = ?, workout10 = ? WHERE workoutLst = ?"
      database.runAsync(query, workoutsToUpdateList);

    } catch (error) {
      console.error(error)
    }
  };


  const [allWorkouts, setWorkoutData] = useState<Workouts[]>([]);


  const loadWorkouts = async () => {
    const result = await database.getAllAsync<Workouts>("SELECT * FROM workouts;");
    console.log(result)
    setWorkoutData(result);
    console.log(allWorkouts)
  };

  useFocusEffect(
    useCallback(() => {
      loadWorkouts();
    }, [])
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workouts</Text>

      <Link href={{pathname:"/splitEdit" }} style={styles.link}>
        back
      </Link>

      <View>
        <FlatList 
          data={allWorkouts} 
          renderItem={({ item }) => {
            return (
            <View>
              <Button
                title={`${item.workout} - ${item.weight} (${item.notes})`}
                color="#f90202"
                
                onPress={() => {
                  splitList2.push(item)
                  updateSplit();
                  console.log(splitList2)
                  setSplitList2(splitList2)
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