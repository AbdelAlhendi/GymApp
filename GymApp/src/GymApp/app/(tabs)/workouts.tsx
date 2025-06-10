import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from '@/components/Button';
import { Link } from "expo-router";


export default function Workouts() {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.title}>WORKOUTS SCREEN</Text>
      <Link href="/(tabs)/weekdays" style={styles.button}>Weekdays: Assign a Split to your Weekdays</Link>

      <Link href="/(tabs)/splits" style={styles.button}>Splits: Create or edit your Splits</Link>
      
      
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
});