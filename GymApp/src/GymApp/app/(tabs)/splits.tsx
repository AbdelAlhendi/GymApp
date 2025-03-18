import React from "react";
import { Text, View } from "react-native";
import Button from '@/components/Button';
import { Link } from "expo-router";


export default function Splits() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>SPLITS SCREEN</Text>
    <Link href="/(tabs)/splitEdit"><Button label="Add a new Split"/></Link>
      
    </View>
  );
}