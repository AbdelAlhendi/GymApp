import React from "react";
import { Text, View } from "react-native";
import Button from '@/components/Button';
import { Link } from "expo-router";


export default function Workouts() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>WORKOUTS SCREEN</Text>
      <Link href="/(tabs)/weekdays"><Button label="Weekdays: Assign a Split to your Weekdays"/></Link>

      <Link href="/(tabs)/splits"><Button label="Splits: Create or edit your Splits"/></Link>
      
      
    </View>
  );
}