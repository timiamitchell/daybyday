import { View, Text } from 'react-native'
import { useFonts } from 'expo-font';
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "HOME",
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "CALENDAR",
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "ADD",
          headerShown: false, 
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "SETTINGS",
          headerShown: false,
        }}
      />
    </Tabs>
  )
}

export default _layout