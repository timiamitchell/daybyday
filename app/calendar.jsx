import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import dayjs from 'dayjs';
import ColorList from '../components/ColorList';
import { useFonts } from 'expo-font';
import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";

const calendar = () => {
  // Hardcode, will change to dynamic code for later
  const month = "February";
  const year = 2025;
  const daysInMonth = 28;
  const startDay = 6; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Generate days array with empty slots for days before the start of the month
  const daysArray = Array(startDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  return (
    <View style={styles.container}>
      {/* header */}
      <Text style={styles.header}>{month} {year}</Text>

      {/* days of the week */}
      <View style={styles.weekRow}>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <Text key={day} style={styles.weekday}>{day}</Text>
        ))}
      </View>

      {/* Calendar Days */}
      <FlatList
        data={daysArray}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.dayCell}>
            <Text style={styles.dayText}>{item ? item : ''}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#555',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
});

export default calendar;