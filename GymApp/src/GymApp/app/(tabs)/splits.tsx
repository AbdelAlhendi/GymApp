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
      style={styles.container}
    >
    <Text style={styles.title}>Splits</Text>
    {splitData.map((split, index) => (
            <View key={index} style={{ marginVertical: 8 }}>

              <Link href={{pathname:"/splitEdit", params: {split : String(split)} }} style={styles.button}>
                   {split}
              </Link>
            </View>
          ))}
    <Link href={{pathname:"/splitEdit", params: {split : "Split Name"} }} style={styles.button}> Add a new Split </Link>
      
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