import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";


export default function Weekdays() {
  async function getWeekdays(): Promise<any> {

      const headers: Headers = new Headers()
      headers.set('Content-Type', 'application/json')
      const url = "http://127.0.0.1:8080/workout/getWeekAll"
    

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

  var [weekList, setWeekList] = useState<{}>({});

  useEffect(() => {
    const fetchData = async () => {
      
      weekList = await getWeekdays();
      console.log('Week List:', weekList);  // Check if data is being fetched correctly

      setWeekList(weekList);
    };

    fetchData(); 
  }, []); 
  const weekListString = JSON.parse(JSON.stringify(weekList));
  console.log(weekListString)


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>WEEKDAYS SCREEN</Text>
      <Text>Sunday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "sunday" } }} style={styles.link}>
        {weekListString["sunday"]}
      </Link>
      <Text>Monday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "monday" } }} style={styles.link}>
        {weekListString["monday"]}
      </Link>
      <Text>Tuesday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "tuesday" } }} style={styles.link}>
        {weekListString["tuesday"]}
      </Link>
      <Text>Wednesday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "wednesday" } }} style={styles.link}>
        {weekListString["wednesday"]}
      </Link>
      <Text>Thursday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "thursday" } }} style={styles.link}>
        {weekListString["thursday"]}
      </Link>
      <Text>Friday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "friday" } }} style={styles.link}>
        {weekListString["friday"]}
      </Link>
      <Text>Saturday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "saturday" } }} style={styles.link}>
        {weekListString["saturday"]}
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