import React from "react";
import { Text, View } from "react-native";
import Button from '@/components/Button';
import { Link } from "expo-router";


export default function SplitEdit() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>SPLITS EDIT SCREEN</Text>
    {/* <Link href="/(tabs)/splits"><Button label="Add a new Split"/></Link> */}
    {/* Use a Modal to bring up list of workouts to add: https://docs.expo.dev/router/advanced/modals/ */}
    <Button label="Add a workout"/>
    
      
    </View>
  );
}