import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

var splitName = "";


export default function WeekdaysEdit() {

  async function postWeek(splitName: string, weekday : string): Promise<(any)> {

    if (splitName == "") {
      return "No split to add to weekday"
    } else {

      var json = {command : "putWeek",
                week: {[weekday] : splitName}          
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
        return "Weekday updated successfully!"
      } catch (error) {
        console.log(error)
      }   
    }
  }

  async function getSplits(): Promise<any> {
  
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const url = "http://127.0.0.1:8080/workout/getSplitAll"
    

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
  
  }

  
  const [splitData, setSplitData] = useState<Array<String>>(Array<String>);
  var {weekday} = useLocalSearchParams();
  console.log(weekday)
  
    useEffect(() => {
      const fetchData = async () => {
        const splitData = await getSplits();
        console.log('Split Data:', splitData);  // Check if data is being fetched correctly

        setSplitData(splitData);
        
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
      <Text>WEEKDAYS EDIT SCREEN</Text>
      {splitData.map((split, index) => (
        <View key={index} style={{ marginVertical: 8 }}>
          <Button
            title={`${split}`}
            color="#007AFF"
            
            onPress={() => {
              splitName = String(split)
            }}
          />
        </View>
      ))}
      <Button
        title={"Save"}
        color="#007AFF"
        
        onPress={() => {
          postWeek(splitName, String(weekday))
        }}
      />

      <Link href={{pathname:"/weekdays" }} style={styles.link}>
      back
      </Link>
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