import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React from 'react'

const ColorList = ({color}) => {
  return (
    <ScrollView 
      contentContainerStyle={styles.container}>
      {
        [1, 0.8, 0.5].map(opacity=> (
          <View 
            key={opacity} 
            style={[styles.color, {backgroundColor: color, opacity}]} 
          />
        ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    color: {
        width: '100%',
        height: 700,
        borderRadius: 0,
    },
})

export default ColorList;