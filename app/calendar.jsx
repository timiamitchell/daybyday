import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import dayjs from 'dayjs';
import ColorList from '../components/ColorList';
import { useFonts } from 'expo-font';
import { useFocusEffect } from '@react-navigation/native';



const calendar = () => {

  const events = {
    '2025-02-27': [
      { id: '1', title: 'No events scheduled for today.' },
    ],
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      {item.description ? <Text style={styles.eventDescription}>{item.description}</Text> : null}
    </View>
  );
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
    setDisplayDate(selectedDate);
    }
}, [selectedDate]);

  
  
  const [loaded, error] = useFonts({
    'AbhayaLibre-Regular': require('/Users/timiamitchell/daybyday/assets/fonts/AbhayaLibre-Regular.ttf'),
    'Inter-VariableFont_opsz,wght': require('/Users/timiamitchell/daybyday/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'AbhayaLibre-SemiBold': require('/Users/timiamitchell/daybyday/assets/fonts/AbhayaLibre-SemiBold.ttf'),
    
  });

  const [fontsLoaded, setFontsLoaded] = useState(false);

useEffect(() => {
  if (loaded) {
    setFontsLoaded(true);
  }
}, [loaded]);

if (!fontsLoaded) {
  return null; // Prevent rendering until fonts are loaded
}

const handleDatePress = (date) => {
  setSelectedDate(date); 
  setDisplayDate(date); // Ensure immediate UI update
};




  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + direction));
    setCurrentMonth(new Date(newMonth));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // First and last days of the current month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    // Calculate the start of the calendar grid (Sunday before the first day of the month)
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(startDay.getDate() - startDay.getDay());
  
    // Calculate the end of the calendar grid (Saturday after the last day of the month)
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(endDay.getDate() + (6 - endDay.getDay()));
  
    // Generate all dates from startDay to endDay
    const days = [];
    let currentDay = new Date(startDay);
    while (currentDay <= endDay) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
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
          const isSelected = selectedDate && selectedDate === dateString;

          return (
            <TouchableOpacity
        key={index}
        style={[
          styles.day,
          isSelected && styles.selectedDay,
          !isCurrentMonth && styles.outsideDay,
        ]}
        onPress={() => {
          handleDatePress(dateString);
          setDisplayDate(dateString);
        }}
        
        
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

  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert to Date object
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options); 
  };
  
  

  return (
    <View style={styles.container}>
<Image
        style={styles.logo}
        source={require('/Users/timiamitchell/daybyday/assets/images/logo.png')}
      />
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
  
  {/* Weekdays Header */}
  <View style={styles.weekHeader}>
    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
      <Text key={index} style={styles.weekHeaderText}>
        {day}
      </Text>
    ))}
  </View>

  {/* Calendar Grid */}
  {renderCalendar()}
</View>
    {/* Selected Date Message */}
    <Text style={styles.infoText}>
  {displayDate
    ? `No events scheduled for ${formatDate(displayDate)}.`
    : 'Select a date to see details.'}
    </Text>


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
    flex: 1,
    justifyContent: 'flex-start',  
    alignItems: 'center',         // Center items horizontally
    marginHorizontal: 10,
    marginTop: 120,   // Ensure enough space at the top
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,

  },

  navText: {
    fontSize: 18,
    paddingHorizontal: 5,

  },
  
  monthTitle: {
    fontFamily: 'AbhayaLibre-SemiBold',
    fontSize: 40,
    textTransform: 'uppercase',
    color: "#C58940",
    textAlign: 'center',
    marginBottom: 0,
  },

  grid: {
    flexDirection: 'row', // Ensures rows of cells
    flexWrap: 'wrap', // multiple rows
    width: '100%', // for consistent layout

  },
  
  calendarGrid: {
    marginBottom: 10,

  },

  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  weekHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#C58940',
    textTransform: 'uppercase'
  },
  
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  day: {
    width: '14.285%',
    aspectRatio: 1,
    paddingVertical: 14.285,
    alignItems: 'center',
    alignContent: 'center',
    borderColor: "#C58940",
    borderWidth: .5, 
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
    color: '#C58940',
    textAlign: 'center', // aligns text horizontally within the cell
    textAlignVertical: 'center',

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

  infoText: {
    color: "#C58940",
    fontFamily:'Inter-VariableFont_opsz,wght',
    textAlign: 'left',
    fontSize: 15,
    paddingHorizontal: 10,
  },

  logo: {
    position: "absolute",
    justifyContent: 'center',
    top: 60,
    width: 75,
    height: 75,
    resizeMode: 'contain',
    alignSelf: "center",
},

});

export default calendar;