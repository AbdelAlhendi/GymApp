import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
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



export default function SplitEdit() {
  // const navigation = useNavigation();

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

  async function getSplits(split: String): Promise<any> {
    
    console.log(split)

    if (split != "Split Name") {
      
      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      const url = "http://127.0.0.1:8080/workout/getSplit/" + split
      // console.log(url)
    

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
var {split} = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      
      splitList = await getSplits(String(split));
      console.log('Split List:', splitList);  // Check if data is being fetched correctly

      setSplitList(splitList);
      
    };

    fetchData(); 
  }, []); 


  console.log(splitList)
  
  // console.log(splitListReturn)
  const [splitName, onChangeText1] = React.useState(split);
  var [workoutUpdate, setWorkoutUpdate] = React.useState("");
// const route = useRoute();
// var splitListReturn = route.params?.splitList2


  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>SPLITS EDIT SCREEN</Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeText1}
          value={String(splitName)}
    />
    {Object.entries(splitList).map(([workout, [weight, notes]], index) => (
            <View key={index} style={{ marginVertical: 8 }}>

                <Link href={{pathname:"/splitValueEditModal", params: {workoutName : workout, weight: weight, notes: notes} }} style={styles.link}>
                  {`${workout} - ${weight}  ${notes}`}
                </Link>


              <Button
                title={"Delete"}
                color="#e43404"
                  onPress={() => {
                    delete splitList[workout]
                    setSplitList(splitList)
                    console.log(splitList)
                  }}
              />
            </View>
            
          ))}
          
          


    <Link href={{pathname:"/splitEditModal", params: {splitName : String(splitName)} }} style={styles.link}>
      Add a Workout
    </Link>

    <Button
      title="save"
      color="#007AFF"
      onPress={() => {
        postSplit(String(splitName), String(split))
        console.log(splitList)
        console.log(splitName)

      }}
      
    />

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



