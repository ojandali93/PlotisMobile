import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const MortgageInsuranceComponent = (props) => {
  const {

  } = props

  return (
    <View style={styles.homeInsuranceContainer}>
      <View style={styles.homeInsuranceHeader}>
        <Text style={styles.label}>Mortgage Insurance:</Text>
        <Text style={styles.label}>$0</Text>
      </View>
      <View style={styles.keyValueRow}>
        <Text>* Ususally equired for down payments below 20%. *</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  homeInsuranceContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  homeInsuranceHeader: {
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
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 8
  },
})

export default MortgageInsuranceComponent