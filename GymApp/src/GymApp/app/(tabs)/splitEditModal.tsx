import { StyleSheet, Text, View, Button, Modal, Alert } from 'react-native';
import { Link, useFocusEffect, useLocalSearchParams} from 'expo-router';
import React, { useState, useEffect, useCallback } from "react";



import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";
// import Splits from './splits';


type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};

type Workouts = { workout: string, weight: number, notes: string};

export default function splitEditModal() {

  var {splitName} = useLocalSearchParams();
  console.log(splitName)

  const database = SQLite.useSQLiteContext();

  const [splits2, setData] = useState<Splits>();


  const loadSplit = async () => {

    const result = await database.getAllAsync<Splits>("SELECT workout1, workout2, workout3, workout4, workout5,"
            + " workout6, workout7, workout8, workout9, workout10 FROM workoutLsts WHERE workoutLst = ?", [
              String(splitName),
            ]);

  
    setData(result.at(0));
  };

  useFocusEffect(
    useCallback(() => {
      loadSplit();
    }, [])
  );

    var [splitList3, setSplitList3] = useState<Workouts[]>([]);
  
    const loadWorkout = async () => {
      if (!splits2 && splitName != "Split Name") {
          console.log("splits not loaded yet: " + splits2)
          return;
        }
      try {
        for (var l = 0; l < splitList3.length; l++) {
          splitList3.pop()
        }
        splitList3.pop()
        console.log("Emptied: " + splitList3)
        const splitParsed = splits2;
        // fucking hell bro
        var  result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout1),
        ]);
        var workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout2),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout3),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout4),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout5),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout6),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout7),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout8),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout9),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        result = await database.getAllAsync<Workouts>("SELECT * FROM workouts WHERE workout = ?", [
          String(splitParsed?.workout10),
        ]);
        workoutParsed = result.at(0)
        if (workoutParsed != undefined) {
          splitList3.push(workoutParsed)
        }
  
        setSplitList3(splitList3);
        console.log(splitList3)
      } catch (error) {
        console.error(error)
      }
      
      };
    
    useEffect(() => {
      if (splits2) {
        loadWorkout();
      }
    }, [splits2]);


  const updateSplit = async () => {
    try {
      if (splitName != "Split Name") {

        var workoutsToUpdateList2 = [];
        if (splits2 == undefined) { // If undefined, postSplit instead of updateSplit
          console.log("new split inserted")
          // workoutsToUpdateList.workoutLst = (String(splitName))
          // workoutsToUpdateList.pop();
          workoutsToUpdateList2.push(String(splitName));

          for (var i = 0; i < 10; i++) {
            if (splitList3.at(i) == undefined || String(splitList3.at(i)) == "undefined" || splitList3.at(i) == null) {
              workoutsToUpdateList2.push(null)
            } else {
              workoutsToUpdateList2.push(String(splitList3.at(i)?.workout))
            }
          }
          

          console.log("workoutsUpdateList: " + workoutsToUpdateList2)

          const query1 = "INSERT INTO workoutLsts (workoutLst, workout1, workout2, workout3, workout4"
              + ", workout5, workout6, workout7, workout8, workout9, workout10) VALUES(?,?,?,?,?,?,?,?,?,?,?);";

          const query2 = "INSERT INTO splits(splitName, workoutLst) VALUES(?,?)";
          
          database.runAsync(query1, workoutsToUpdateList2)

          database.runAsync(query2, String(splitName), String(splitName))

        } else { // updateSplit
          console.log("Split Updated")
          for (var i = 0; i < 10; i++) {
            if (splitList3.at(i) == undefined || String(splitList3.at(i)) == "undefined" || splitList3.at(i) == null) {
              workoutsToUpdateList2.push(null)
            } else {
              workoutsToUpdateList2.push(String(splitList3.at(i)?.workout))
            }
          }

          workoutsToUpdateList2.push(String(splitName))

          console.log("workoutsToUpdateList: " + workoutsToUpdateList2)
          

          const query = "UPDATE workoutLsts SET workout1 = ?, workout2 = ?, workout3 = ?, workout4 = ?,"
                + " workout5 = ?, workout6 = ?, workout7 = ?, workout8 = ?, workout9 = ?, workout10 = ? WHERE workoutLst = ?"
          database.runAsync(query, workoutsToUpdateList2);
        }
      }

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

      <Link href={{pathname:"/splitEdit" }} style={styles.button}>
        back
      </Link>

    <View style={styles.button}>
      <Button
        title={"Save"}
        color="#FFF"
        
        onPress={() => {
          updateSplit();
          }}
      />
      </View>



      <View>
        <FlatList 
          data={allWorkouts} 
          renderItem={({ item }) => {
            return (
            <View style={styles.button}>
              <Button
                
                title={`${item.workout} - ${item.weight} (${item.notes})`}
                color="#FFF"
                
                onPress={() => {
                  console.log("splitList2 before adding a new workout: " + splitList3)
                  var noDupe = true
                  for (var j = 0; j < splitList3.length; j++) {
                    if (item.workout == splitList3.at(j)?.workout) {
                      console.log("Dupe found, not adding")
                      noDupe = false
                      break;
                    }
                  }
                  if (noDupe) {
                    console.log("workout added to update")
                    splitList3.push(item)
                    setSplitList3(splitList3)
                  }
                  
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