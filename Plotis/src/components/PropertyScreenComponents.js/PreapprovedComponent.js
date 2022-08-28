import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const PreapprovedComponent = (props) => {
  const {

  } = props
  
  return (
    <View style={styles.preapprovedContainer}>
      <Text style={styles.label}>Get Pre-approved</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  preapprovedContainer: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 16,
    borderRadius: 5,
    overflow: 'hidden'
  },
  label: {
    fontSize: 17,
    fontWeight: '800'
  }
})

export default PreapprovedComponent