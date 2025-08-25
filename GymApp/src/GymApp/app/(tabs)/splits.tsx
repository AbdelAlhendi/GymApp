import React, { useCallback } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import Button from '@/components/Button';
import { Link, useFocusEffect } from "expo-router";
import { useState, useEffect } from "react";
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { FlatList } from "react-native";


type Splits = {workoutLst: String, workout1: String, workout2: String, workout3: String, workout4: String, workout5: String,
workout6: String, workout7: String, workout8: String, workout9: String, workout10: String};


export default function Splits( ) {

    const database = SQLite.useSQLiteContext();

    const deleteSplit = async (splitName: string) => {
    try {
      const query1 = "DELETE FROM splits WHERE splitName = ?";

      const query2 = "DELETE FROM workoutLsts WHERE workoutLst = ?";
      database.runAsync(query1, [
        splitName,
      ]);

      database.runAsync(query2, [
        splitName,
      ]);

    } catch (error) {
      console.error(error)
    }
  };
      const [splits, setData] = useState<Splits[]>([]);
    
      
    
      const loadSplits = async () => {
        const result = await database.getAllAsync<Splits>("SELECT * FROM workoutLsts;");
        setData(result);
        console.log(result)
      };
    
      useFocusEffect(
        useCallback(() => {
          loadSplits();
        }, [])
      );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splits</Text>
      <Link href={{pathname:"/splitEdit", params: {split : "Split Name"} }} style={styles.button}> Add a new Split </Link>

      <View>
        <FlatList 
          data={splits} 
          renderItem={({ item }) => {
            return (
            <View>

              <Link href={{pathname:"/splitEdit", params: {split : String(item.workoutLst)} }} style={styles.button}>
                    {String(item.workoutLst)}
              </Link>

              <Button
                  title={"Delete"}
                  color="#e43404"
                    onPress={() => {
                      
                      deleteSplit(String(item.workoutLst))
                      console.log(String(item.workoutLst) + "has been deleted")
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