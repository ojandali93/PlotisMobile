import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { FontAwesome, Feather } from 'react-native-vector-icons'

const ResultViewComponent = (props) => {
  const {
    style
  } = props

  return (
    <View style={style}> 
      <Feather size={16} name='grid'/>
    </View>
  )
}

const styles = StyleSheet.create({
  
})

export default ResultViewComponent