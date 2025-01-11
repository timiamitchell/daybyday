import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import React from 'react'
import dayjs from 'dayjs'
import ColorList from '../components/ColorList'
import { useFonts } from 'expo-font';
//import logo from "/Users/timiamitchell/daybyday/assets/images/logo.png";



export default function Home() {
  const [date, setDate] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const [loaded, error] = useFonts({
    'AbhayaLibre-Regular': require('/Users/timiamitchell/daybyday/assets/fonts/AbhayaLibre-Regular.ttf'),
    'Inter-VariableFont_opsz,wght': require('/Users/timiamitchell/daybyday/assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

 
  return (
    
      

      <View style={{backgroundColor: '#FFFDF4', flex:1}}>
        <Text 
          style={styles.date1}> {date.format("dddd")}
        </Text>
        <Text 
          style={styles.date2}> {date.format("MMMM DD")}
        </Text>
        <Image
        style={styles.logo}
        source={require('/Users/timiamitchell/daybyday/assets/images/logo.png')}
      />
      </View>
    )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF4",
    },

  date1: {
    color: "#C58940",
    textTransform: 'uppercase',
    textAlign: 'left',
    top: 105,
    fontFamily:'Inter-VariableFont_opsz,wght',
    paddingHorizontal: 30,
    height: 30,
    paddingVertical: 25,
    fontSize: 20,
    fontWeight: "500",
    marginTop: 0,
  },

    date2: {
      color: "#C58940",
      textTransform: 'uppercase',
      fontFamily: 'AbhayaLibre-Regular',
      textAlign: 'left',
      top: 35,
      paddingHorizontal: 20,
      height: 20,
      paddingVertical: 70,
      fontSize: 62,
      fontWeight: "500",
      marginTop: 0,

  },
  
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 430,
        left: 163,
        width: 75,
        height: 75,
        resizeMode: 'contain'
  },
});