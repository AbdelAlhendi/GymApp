import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { navigate } from "expo-router/build/global-state/routing";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import splitEditModal from "./splitEditModal";
import splitValueEditModal from "./splitValueEditModal";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

export var splitList: Record<string, [number, string]> = {};
export var workoutUpdate = "";
// export var splitListReturn: Record<string, [number, string]> = {};
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";
import Index from ".";


type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};

type Workouts = { workout: string, weight: number, notes: string};

// type splitLst = {workout: string, [weight: number, notes: string]};


export default function SplitEdit() {
  // const navigation = useNavigation();

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

  // async function getSplits(split: String): Promise<any> {
    
  //   console.log(split)

  //   if (split != "Split Name") {
  //     console.log(split)
      
  //     const headers: Headers = new Headers()
  //     headers.set('Content-Type', 'application/json')
  //     const url = "http://127.0.0.1:8080/workout/getSplit/" + split
  //     // console.log(url)
    

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


  


  // useEffect(() => {
  //   const fetchData = async () => {
      
  //     splitList = await getSplits(String(split));
  //     console.log('Split List:', splitList);  // Check if data is being fetched correctly

  //     setSplitList(splitList);
      
  //   };

  //   fetchData(); 
  // }, []); 


  // console.log(splitList)

  const database = SQLite.useSQLiteContext();
  var {split} = useLocalSearchParams();
  
  var [splitName, onChangeText1] = React.useState(split);


  const [splits, setData] = useState<Splits[]>([]);


  const loadSplit = async (splitName: String) => {

    const result = await database.getAllAsync<Splits>("SELECT workout1, workout2, workout3, workout4, workout5,"
            + " workout6, workout7, workout8, workout9, workout10 FROM workoutLsts WHERE workoutLst = ?", [
              String(splitName),
            ]);

  
    setData(result);
  };

  useFocusEffect(
    useCallback(() => {
      loadSplit(String(splitName));
    }, [])
  );

  

  var [splitList, setSplitList] = useState<Record<string, [number, string]>>({});
  var [splitList2, setSplitList2] = useState<Workouts[]>([]);
  var [workoutData, setWorkout] = useState<Workouts>();

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

  return (
    
    <View style={styles.container}>
    <Text style={styles.title}>SPLITS EDIT SCREEN</Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeText1}
          value={String(splitName)}
    />

    <Link href={{pathname:"/splitEditModal", params: {splitName : String(splitName)} }} style={styles.button}>
      Add a Workout
    </Link>

    <View>
      <FlatList 
        data={splitList2} 
        renderItem={({ item }) => {
          return (
          <View>
            <Link href={{pathname:"/splitValueEditModal", params: {workoutName : item.workout, weight: item.weight, notes: item.notes} }} style={styles.button}>
                  {`${item.workout} - ${item.weight}  ${item.notes}`}
            </Link>
            <Button
                title={"Delete"}
                color="#e43404"
                  onPress={() => {
                    for (var i = 0; i < splitList2.length; i++) {
                      if (item.workout == splitList2.at(i)?.workout) {
                        splitList2 = splitList2.splice(i, 1)
                        break;
                      }
                    }
                    setSplitList2(splitList2)
                    console.log(splitList2)
                    updateSplit();
                  }}
              />
          </View>
        );
      }}
      />
    </View>

    <Link href={{pathname:"/splitEditModal", params: {splitName : String(splitName)} }} style={styles.button}>
      Add a Workout
    </Link>

    {/* <Button
      title="save"
      color="#f90202"
      onPress={() => {
        postSplit(String(splitName), String(split))
        console.log(splitList)
        console.log(splitName)

      }}
      
    /> */}

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



