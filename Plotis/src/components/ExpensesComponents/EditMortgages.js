import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const EditMortgages = (props) => {
  const {

  } = props
 
  return (
    <View style={styles.mortgageContainer}>
      <View style={styles.mortgageHeader}>
        <Text style={styles.label}>Principle & Interest:</Text>
        <Text style={styles.label}>$1,234</Text>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Home Price:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Down Payment ($):</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Down Payment (%):</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Loan Program:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Interest Rate:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mortgageContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  mortgageHeader: {
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

export default EditMortgages