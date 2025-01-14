import { useState, useEffect } from "react"
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import React from 'react'
import dayjs from 'dayjs'
import ColorList from '../components/ColorList'
import { useFonts } from 'expo-font';
import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const TaskForm = () => (
  <View style={styles.formContainer}>
    <TextInput style={styles.input} placeholder="Task Title" placeholderTextColor="#C58940" />
    <TextInput
      style={[styles.input, styles.multilineInput]}
      placeholder="Task Description"
      placeholderTextColor="#9ca3af"
      multiline
    />
    <TextInput style={styles.input} placeholder="Due Date (YYYY-MM-DD)" placeholderTextColor="#9ca3af" />
    <TouchableOpacity style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Add Task</Text>
    </TouchableOpacity>
  </View>
);

const EventForm = () => (
  <View style={styles.formContainer}>
    <TextInput style={styles.input} placeholder="Event Title" placeholderTextColor="#9ca3af" />
    <TextInput
      style={[styles.input, styles.multilineInput]}
      placeholder="Event Location"
      placeholderTextColor="#9ca3af"
      multiline
    />
    <TextInput style={styles.input} placeholder="Event Date (YYYY-MM-DD)" placeholderTextColor="#9ca3af" />
    <TextInput style={styles.input} placeholder="Event Time (HH:MM AM/PM)" placeholderTextColor="#9ca3af" />
    <TouchableOpacity style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Add Event</Text>
    </TouchableOpacity>
  </View>
);

const TextEntryForm = () => (
  <View style={styles.formContainer}>
    <TextInput
      style={[styles.input, styles.multilineInput]}
      placeholder="Title"
      placeholderTextColor="#C5894050"
      multiline
    />
    <TouchableOpacity style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Enter</Text>
    </TouchableOpacity>
    <Image
        style={styles.logo}
        source={require('/Users/timiamitchell/daybyday/assets/images/logo.png')}
      />
  </View>
);

const add = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'task', title: 'Task' },
    { key: 'event', title: 'Event' },
    { key: 'text', title: 'Text Entry' },
  ]);

  const renderScene = SceneMap({
    task: TaskForm,
    event: EventForm,
    text: TextEntryForm,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      activeColor='#C58940'
      inactiveColor="#9ca3af"
    />
  );

  return ( 
    <TabView
      style = { styles.addContainer }
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={renderTabBar}
    />
    
    
  );
};

const styles = StyleSheet.create({

  addContainer: {
    paddingVertical: 110,
    backgroundColor: '#FFFDF4'
  },

  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFDF4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFFDF4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#FFFFFFF',
    backgroundColor: '#FFF7DA',
  },
  multilineInput: {
    height: 40,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#C58940',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    backgroundColor: '#FFFDF4',
  },
  tabIndicator: {
    backgroundColor: '#C58940',
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C58940',
  },

  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 571,
    left: 143,
    width: 75,
    height: 75,
    resizeMode: 'contain'
},
});

export default add;