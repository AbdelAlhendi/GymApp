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

export var workoutUpdate = "";
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";


type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};

type Workouts = { workout: string, weight: number, notes: string};

// type splitLst = {workout: string, [weight: number, notes: string]};


export default function SplitEdit() {

  const database = SQLite.useSQLiteContext();
  var {split} = useLocalSearchParams();

  var [splitName, onChangeText1] = React.useState(split);


  var [splits, setData] = useState<Splits>();


  const loadSplit = async () => {
    try {
      console.log("splitName: " + splitName)

      const result = await database.getAllAsync<Splits>("SELECT workout1, workout2, workout3, workout4, workout5,"
              + " workout6, workout7, workout8, workout9, workout10 FROM workoutLsts WHERE workoutLst = ?", [
                String(splitName),
              ]);

      splits = result.at(0)
      setData(splits);
      console.log(splits)
    } catch (error) {
      console.log(error)
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSplit();
    }, [])
  );

    

  var [splitList2, setSplitList2] = useState<Workouts[]>([]);

  const loadWorkout = async () => {
    if (!splits && splitName != "Split Name") {
      console.log("splits not loaded yet: " + splits)
      return;
    }
    try {
      for (var l = 0; l < splitList2.length; l++) {
        splitList2.pop()
      }
      splitList2.pop()
      console.log("Emptied: " + splitList2)

      const splitParsed = splits;
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

  useEffect(() => {
    if (splits) {
      loadWorkout();
    }
  }, [splits]);


  const updateSplit = async () => {
    try {
      var workoutsToUpdateList = [];
      for (var i = 0; i < 10; i++) {
        if (splitList2.at(i) == undefined || String(splitList2.at(i)) == "undefined" || splitList2.at(i) == null) {
          workoutsToUpdateList.push(null)
        } else {
          workoutsToUpdateList.push(String(splitList2.at(i)?.workout))
        }
      }
          workoutsToUpdateList.push(String(splitName))
          console.log("workoutsToUpdateList: " + workoutsToUpdateList)

          const query = "UPDATE workoutLsts SET workout1 = ?, workout2 = ?, workout3 = ?, workout4 = ?,"
                + " workout5 = ?, workout6 = ?, workout7 = ?, workout8 = ?, workout9 = ?, workout10 = ? WHERE workoutLst = ?"
          database.runAsync(query, workoutsToUpdateList);
        
      

    } catch (error) {
      console.error(error)
    }
  };

  // const [currentPage2, setCurrentPage2] = useState(0);
  
  // const _handleLoadMore = () => {
  //   setCurrentPage2(currentPage2 + 10);
  //   console.log("Load more items")
  // }

  return (
    
    <View style={styles.container}>
    <Text style={styles.title}>Splits Edit Screen</Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeText1}
          value={String(splitName)}
    />

    <Link href={{pathname:"/splitEditModal", params: {splitName : String(splitName)} }} style={{
      marginTop: 2,
      flexDirection: "row",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: '#f90202',
      borderRadius: 2,
      backgroundColor: '#000000',
      color: '#FFF',
      textAlign: "center",
      fontSize: 15,

    }}>
      Add a Workout
    </Link>
{/* 
    <Button
      title={"Load More"}
      color="#FFF"
      
      
      onPress={() => {
        _handleLoadMore();
        }}
    /> */}

    <View>
      <FlatList 
        data={splitList2} 
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
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
                        
                        splitList2.splice(i, 1)
                        break;
                      }
                    }
                    setSplitList2(splitList2)
                    console.log("splitList2 after deletion: " +splitList2)
                    updateSplit();
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
    marginTop: 5,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#f90202',
    borderRadius: 2,
    backgroundColor: '#000000',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 15,
  },
  title: {
    marginTop: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 4,
    borderColor: '#f90202',
    borderRadius: 10,
    backgroundColor: '#000000',
    color: '#FFF',
    textAlign: 'center',
    fontSize: 25,
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



