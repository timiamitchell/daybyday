import { useState, useEffect } from "react"
import { View, Text, Image, Modal, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Button, Dimensions, ImageBackground, Keyboard, Platform } from 'react-native'
import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';
import dayjs from 'dayjs'
import ColorList from '../components/ColorList'
import { useFonts } from 'expo-font';
import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { Picker } from "@react-native-picker/picker";

const add = () => {
  const [activeTab, setActiveTab] = useState('Task');

    return (
        <View style={styles.container}>
            <Image
                    style={styles.logo}
                    source={require('/Users/timiamitchell/daybyday/assets/images/logo.png')}
                  />
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Task')} style={[styles.tab, activeTab === 'Task' && styles.activeTab]}>
                    <Text style={styles.tabText}>Task</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Event')} style={[styles.tab, activeTab === 'Event' && styles.activeTab]}>
                    <Text style={styles.tabText}>Event</Text>
                </TouchableOpacity>
            </View>
            {activeTab === 'Task' && <TaskForm />}
            {activeTab === 'Event' && <EventForm />}
        </View>
    );
};

const PrioritySelector = ({ priority, setPriority }) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.priorityLabel}>Priority:</Text>
    <View style={styles.radioGroup}>
      {["Low", "Medium", "High"].map((level) => (
        <TouchableOpacity
          key={level}
          style={[
            styles.radioButton,
            priority === level && styles.radioButtonSelected,
          ]}
          onPress={() => setPriority(level)}
        >
          <Text 
            style={[
              styles.radioText, 
              priority === level && styles.radioTextSelected
            ]}
          >
            {level}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


const RepeatSelector = ({ repeat, setRepeat }) => (
  <View style={styles.buttonContainer}>
    <Text style={styles.priorityLabel}>Repeat:</Text>
    <View style={styles.radioGroup}>
    {["Daily", "Weekly", "Custom"].map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.radioButton,
          repeat === option && styles.radioButtonSelected,
        ]}
        onPress={() => setRepeat(option)}
      >
       <Text 
            style={[
              styles.radioText, 
              repeat === option && styles.radioTextSelected
            ]}
          >
            {option}
          </Text>
      </TouchableOpacity>
    ))}
  </View>
  </View>
);

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(null); 
  const [tempTime, setTempTime] = useState(null);
  const [description, setDescription] = useState(''); 
  const [repeat, setRepeat] = useState("Daily");
  const [priority, setPriority] = useState("Medium");
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  
  
  
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };
  
  const onChangeTime = (event, selectedTime) => {
    if (Platform.OS === 'android') setShowTimePicker(false);
    if (selectedTime) setTime(selectedTime);
  };
  
  
  return (
    <View style={styles.formContainer}>
          <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={'#C5894065'}
              value={title}
              onChangeText={setTitle}
          />

<TouchableWithoutFeedback onPress={() => { setShowDatePicker(false); setShowTimePicker(false); Keyboard.dismiss(); }}>
      <View style={styles.dueBy}>
      <Text style = {{color: '#C58940'}}>Due by</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
          <Ionicons name="chevron-down" style = {styles.downArrow} />
          <Text style = {{color: '#C58940'}}>{date.toDateString()}</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={showDatePicker} animationType="fade">
            <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <DateTimePicker
              value={tempDate || date}
              mode="date"
              display={Platform.OS === 'ios' ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate); // Store in temp state
              }}
            />
            <TouchableOpacity onPress={() => {
        if (tempDate) setDate(tempDate); // Save the selected date
        setShowDatePicker(false); // Close modal
      }}>
        <Text style={styles.modalClose}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          
        <Text style = {{color: '#C58940'}}>at</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
        <Ionicons name="chevron-down" style = {styles.downArrow} />
          <Text style = {{color: '#C58940'}}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={showTimePicker} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
            <DateTimePicker
              value={tempTime || time}
              mode="time"
              display={Platform.OS === 'ios' ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                if (selectedTime) setTempTime(selectedTime); // Store in temp state
              }}
            />
            <TouchableOpacity onPress={() => {
        if (tempTime) setTime(tempTime); // Save the selected time
        setShowTimePicker(false); // Close modal
      }}>
        <Text style={styles.modalClose}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

          
      </View>
      </View>
      </TouchableWithoutFeedback>

          <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor={'#C5894065'}
              value={location}
              onChangeText={setLocation}
          />

          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              placeholderTextColor={'#C5894065'}
              value={description}
              onChangeText={setDescription}
              multiline
          />
         
           <PrioritySelector 
           priority={priority} setPriority={setPriority} 
           />
           <RepeatSelector 
           repeat={repeat} setRepeat={setRepeat} 
           />

            <TouchableOpacity style={styles.submitButton}>
              <Ionicons name="checkmark" size={30} color="#FFFDF4" />
            </TouchableOpacity>

      </View>
  );
};

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempDate, setTempDate] = useState(null); 
  const [tempTime, setTempTime] = useState(null);
  const [repeat, setRepeat] = useState("Daily");
  const [priority, setPriority] = useState("Medium");

  return (
      <View style={styles.formContainer}>
          <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={'#C5894065'}
              value={title}
              onChangeText={setTitle}
          />

<TouchableWithoutFeedback onPress={() => { setShowDatePicker(false); setShowTimePicker(false); Keyboard.dismiss(); }}>
      <View style={styles.dueBy}>
      <Text style = {{color: '#C58940'}}>Date</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
          <Ionicons name="chevron-down" style = {styles.downArrow} />
          <Text style = {{color: '#C58940'}}>{date.toDateString()}</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={showDatePicker} animationType="fade">
            <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            <DateTimePicker
              value={tempDate || date}
              mode="date"
              display={Platform.OS === 'ios' ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                if (selectedDate) setTempDate(selectedDate); // Store in temp state
              }}
            />
            <TouchableOpacity onPress={() => {
        if (tempDate) setDate(tempDate); // Save the selected date
        setShowDatePicker(false); // Close modal
      }}>
        <Text style={styles.modalClose}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
          
        <Text style = {{color: '#C58940'}}>at</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateTimeButton}>
        <Ionicons name="chevron-down" style = {styles.downArrow} />
          <Text style = {{color: '#C58940'}}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={showTimePicker} animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
            <DateTimePicker
              value={tempTime || time}
              mode="time"
              display={Platform.OS === 'ios' ? "spinner" : "default"}
              onChange={(event, selectedTime) => {
                if (selectedTime) setTempTime(selectedTime); // Store in temp state
              }}
            />
            <TouchableOpacity onPress={() => {
        if (tempTime) setTime(tempTime); // Save the selected time
        setShowTimePicker(false); // Close modal
      }}>
        <Text style={styles.modalClose}>Done</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

          
      </View>
      </View>
      </TouchableWithoutFeedback>

          <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor={'#C5894065'}
              value={location}
              onChangeText={setLocation}
          />
          <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              placeholderTextColor={'#C5894065'}
              value={description}
              onChangeText={setDescription}
              multiline
          />

        <PrioritySelector 
           priority={priority} setPriority={setPriority} 
           />
           <RepeatSelector 
           repeat={repeat} setRepeat={setRepeat} 
           />

          <TouchableOpacity style={styles.submitButton}>
              <Ionicons name="checkmark" size={30} color="#FFFDF4" />
            </TouchableOpacity>
          
      </View>
  );
};

const styles = StyleSheet.create({
    
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)", // Dimmed background effect
    },
    modalContainer: {
      backgroundColor: "#FFF",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalClose: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "#C58940",
    },

    container: { 
      flex: 1, 
      padding: 20, 
      paddingVertical: 140,
      backgroundColor: '#FFFDF4' 
    },

    downArrow: {
      size: 14,
      color: "#C58940",
      paddingRight: 5,

    },

    picker: { 
      height: 50, 
      marginBottom: 16, 
      color: "#9ca3af" 
    },

   radioGroup: { 
      flexDirection: "row", 
      justifyContent: "space-evenly",
      flex: 1,
      paddingRight: 5
      },

    radioButton: { 
      padding: 3, 
      borderColor: "#9ca3af", 
      borderRadius: 8
    },

    radioButtonSelected: { 
      backgroundColor: "#C58940",
    },

    radioText: { 
      color: "#C58940",  
    },

    radioTextSelected: {
      color: "#FFFDF4",
    },

    buttonContainer: {
      flexDirection: "row", 
      alignItems: "center",
      justifyContent: "space-between", 
      padding: 10, 
      borderWidth: 1, 
      borderColor: '#C58940', 
      borderRadius: 15, 
      marginBottom: 10,
    },

    priorityLabel: {
      color: "#C58940",
      fontSize: 14,
      fontWeight: "500",
      marginRight: 10,
    },

    tabContainer: { 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      marginBottom: 10, 
      //borderWidth: 1,
      //borderRadius: 15,
     // borderColor: '#C58940', 
    },


    tab: { 
      padding: 10, 
      borderBottomWidth: 2, 
      borderColor: 'transparent' 
    },

    activeTab: { 
      borderColor: '#C58940' 
    },

    tabText: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      color: '#C58940' 
    },

    formContainer: { 
      padding: 10 
    },

    input: { 
      borderWidth: 1, 
      borderColor: '#C58940', 
      padding: 10, 
      borderRadius: 15, 
      marginBottom: 10 
    },

    dueBy: {
      padding: 10, 
      borderWidth: 1, 
      borderColor: '#C58940', 
      borderRadius: 15, 
      marginBottom: 10,  
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "start"
      
    },

    dateTimeButton: {
      paddingHorizontal: 15,
      marginLeft: -10,
      flexDirection: "row",
      alignItems: "center",
    },

    textArea: { 
      height: 100 
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

  submitButton: {
    position: "absolute", // Fixes it at the bottom right
    bottom: -160, // Distance from the bottom
    right: 15, // Distance from the right
    backgroundColor: "#C58940", // Green checkmark button
    width: 60, // Circular button size
    height: 60, 
    borderRadius: 30, // Makes it round
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Adds shadow for Android
  },

});

export default add;