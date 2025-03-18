import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { Link, router, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import Button from '@/components/Button';


export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home</Text>
      
      {/* <Link href="/(tabs)/workouts"><Button label="Navigate to nested route" /></Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
