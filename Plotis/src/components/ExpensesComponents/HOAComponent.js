import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const HOAComponent = (props) => {
  const {

  } = props

  return (
    <View style={styles.hoaContainer}>
      <View style={styles.hoaHeader}>
        <Text style={styles.label}>HOA:</Text>
        <Text style={styles.label}>$125</Text>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Monthly HOA:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.disclaimer}>
        <Text>* HOA dues to cover common amenities or services *</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hoaContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  hoaHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    fontSize: 17,
    fontWeight: '600'
  },
  disclaimer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 8
  },
  keyValueRow: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginBottom: 8
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  },
  values: {
    display: 'flex',
    flexDirection: 'row',
  },
  value: {
    fontSize: 17,
    fontWeight: '500'
  },
  icon: {
    marginLeft: 8
  }
})

export default HOAComponent