import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const UtilitiesComponent = (props) => {
  const {

  } = props
 
  return (
    <View style={styles.UtilitiesContainer}>
      <View style={styles.UtilitiesHeader}>
        <Text style={styles.label}>Utilities:</Text>
        <Text style={styles.label}>$1,234</Text>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Gas:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Water:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Electricity:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Sewer:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
      <View style={styles.keyValueRow}>
        <Text style={styles.title}>Trash:</Text>
        <View style={styles.values}>
          <Text style={styles.value}>$1,234</Text>
          <Feather style={styles.icon} size={20} name='edit-3'/> 
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  UtilitiesContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  UtilitiesHeader: {
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

export default UtilitiesComponent