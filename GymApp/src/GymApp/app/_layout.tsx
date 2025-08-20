import { Stack } from "expo-router";
// import * as SQLite from 'expo-sqlite';
// import { SQLiteProvider, SQLiteDatabase } from "expo-sqlite";
import * as SQLite from 'expo-sqlite';

import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import React from "react";


// const db = SQLite.openDatabaseSync('workoutDB.db');


export default function RootLayout() {


  const createDbIfNeeded = async (db: SQLiteDatabase) => {

    
    const table = "CREATE TABLE IF NOT EXISTS workouts (\n"
                    + "   workout TEXT PRIMARY KEY,\n"
                    + "   weight INTEGER NOT NULL,\n"
                    + "   notes TEXT NOT NULL\n" +
                    ");";

    const table2 = "CREATE TABLE IF NOT EXISTS splits (\n"
    + "   splitName TEXT PRIMARY KEY,\n"
    + "   workoutLst TEXT NOT NULL,\n"
    + "   FOREIGN KEY (workoutLst) REFERENCES workoutLsts(workoutLst)\n" + 
    ");";

    const table3 = "CREATE TABLE IF NOT EXISTS schedule (\n"
    + "   weekday TEXT PRIMARY KEY,\n"
    + "   splitName TEXT NOT NULL,\n"
    + "   FOREIGN KEY (splitName) REFERENCES splits(splitName)\n" + 
    ");";

    const table4 = "CREATE TABLE IF NOT EXISTS workoutLsts (\n"
    + "   workoutLst TEXT PRIMARY KEY,\n"
    + "   workout1 TEXT,\n"
    + "   workout2 TEXT,\n"
    + "   workout3 TEXT,\n"
    + "   workout4 TEXT,\n"
    + "   workout5 TEXT,\n"
    + "   workout6 TEXT,\n"
    + "   workout7 TEXT,\n"
    + "   workout8 TEXT,\n"
    + "   workout9 TEXT,\n"
    + "   workout10 TEXT,\n"
    + "   FOREIGN KEY (workout1) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout2) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout3) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout4) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout5) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout6) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout7) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout8) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout9) REFERENCES workouts(workout)\n"
    + "   FOREIGN KEY (workout10) REFERENCES workouts(workout)\n" +
    ");";
    console.log("Creating db if needed")
    await db.execAsync(
      table
    );
    await db.execAsync(
      table2
    );
    await db.execAsync(
      table3
    );
    await db.execAsync(
      table4
    );
  };


  return (
    <SQLiteProvider databaseName="workoutDB.db" onInit={createDbIfNeeded}>
      
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}