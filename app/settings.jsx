import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import dayjs from 'dayjs'
import ColorList from '../components/ColorList'
import { useFonts } from 'expo-font'
import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";

const settings = () => {
    return (
        <View>
          <ColorList color="#FFFDF4" />
        </View>
      )
}



export default settings