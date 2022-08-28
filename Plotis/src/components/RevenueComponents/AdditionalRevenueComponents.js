import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const AdditionalRevenueComponents = (props) => {
  const {

  } = props

  return (
    <View style={styles.additionalRevenueContainer}>
      <View style={styles.additionalReveueHeader}>
        <Text style={styles.label}>Additional Revenue:</Text>
        <Text style={styles.label}>$1,234</Text>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Other Revenue:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  additionalRevenueContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  additionalReveueHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    fontSize: 17,
    fontWeight: '600'
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

export default AdditionalRevenueComponents