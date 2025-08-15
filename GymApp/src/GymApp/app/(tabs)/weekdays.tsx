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
      style={styles.container}
    >
      <Text style={styles.title}>WEEKDAYS SCREEN</Text>
      <Text>Sunday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "sunday" } }} style={styles.button}>
        {weekListString["sunday"]}
      </Link>
      <Text>Monday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "monday" } }} style={styles.button}>
        {weekListString["monday"]}
      </Link>
      <Text>Tuesday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "tuesday" } }} style={styles.button}>
        {weekListString["tuesday"]}
      </Link>
      <Text>Wednesday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "wednesday" } }} style={styles.button}>
        {weekListString["wednesday"]}
      </Link>
      <Text>Thursday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "thursday" } }} style={styles.button}>
        {weekListString["thursday"]}
      </Link>
      <Text>Friday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "friday" } }} style={styles.button}>
        {weekListString["friday"]}
      </Link>
      <Text>Saturday</Text>
      <Link href={{pathname:"/weekdaysEdit", params: { weekday: "saturday" } }} style={styles.button}>
        {weekListString["saturday"]}
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