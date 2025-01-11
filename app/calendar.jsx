import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import dayjs from 'dayjs';
import ColorList from '../components/ColorList';
import { useFonts } from 'expo-font';
import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";

const calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [loaded, error] = useFonts({
    'AbhayaLibre-Regular': require('/Users/timiamitchell/daybyday/assets/fonts/AbhayaLibre-Regular.ttf'),
    'Inter-VariableFont_opsz,wght': require('/Users/timiamitchell/daybyday/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'AbhayaLibre-SemiBold': require('/Users/timiamitchell/daybyday/assets/fonts/AbhayaLibre-SemiBold.ttf'),
  });

  const handleDatePress = (date) => {
    setSelectedDate(date);
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
    setCurrentMonth(new Date(newMonth));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const previousMonthDays = new Date(year, month, 0).getDate();

    const days = [];
    let currentDay = new Date(firstDay);

    // Fill the days from the previous month
    while (currentDay.getDay() !== 0) {
      currentDay = new Date(currentDay.setDate(currentDay.getDate() - 1));
    }

    // Generate all days until the Saturday of the last week
    while (currentDay <= lastDay || currentDay.getDay() !== 6) {
      days.push(new Date(currentDay));
      currentDay = new Date(currentDay.setDate(currentDay.getDate() + 1));
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
      

    return (
      <View style={styles.grid}>
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const dateString = day.toISOString().split('T')[0];
          const isSelected = selectedDate === dateString;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                isSelected && styles.selectedDay,
                !isCurrentMonth && styles.outsideDay,
              ]}
              onPress={() => handleDatePress(dateString)}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  !isCurrentMonth && styles.outsideDayText,
                ]}
              >
                {day.getDate()}
              </Text>
            </TouchableOpacity>

          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
    <View style={styles.calendarContainer}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => changeMonth(-1)}>
        <Text style={styles.navText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.monthTitle}>
        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </Text>
      <TouchableOpacity onPress={() => changeMonth(1)}>
        <Text style={styles.navText}>{'>'}</Text>
      </TouchableOpacity>
    </View>
    {renderCalendar()}
  </View>
  </View>
  
  );
  

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF4',
    padding: 20,
  },

  calendarContainer: {
    marginTop: 110,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  navText: {
    fontSize: 18,
  },
  
  monthTitle: {
    fontSize: 40,
    textTransform: 'uppercase',
    color: "#C58940",
    fontFamily: 'AbhayaLibre-SemiBold',
    textAlign: 'center',
    marginBottom: 0,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 5,
  },

  calendarGrid: {
    marginBottom: 10,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: 'Inter-VariableFont_opsz,wght.ttf',
    marginBottom: 8,
  },
  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    color: "#C58940",
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  day: {
    width: `${100 / 7}%`,
    aspectRatio: .5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: .4,
    borderColor: "#C58940", 
    backgroundColor: '#FFFDF4',
  },

  selectedDay: {
    backgroundColor: "#C58940",
  },

  outsideDay: {
    color: "#C5894050",
  },

  dayText: {
    fontSize: 14,
    color: "#C58940",
  },
  
  selectedDayText: {
    color: '#FFFDF4', 
  },

  eventList: {
    flex: 1,
    marginTop: 16,
  },

  outsideDayText: {
    color: '#9ca3af',
  },

  selectedDate: {
    fontSize: 16,
    color: "#C58940",
    marginBottom: 8,
  },

  eventItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
  
  },
  eventDescription: {
    fontSize: 14,
    color: "#C58940",
  },
  noEventsText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 578,
    left: 143,
    width: 75,
    height: 75,
    resizeMode: 'contain'
},

});

export default calendar;