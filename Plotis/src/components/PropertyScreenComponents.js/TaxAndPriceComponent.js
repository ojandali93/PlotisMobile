import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const TaxAndPriceComponent = (props) => {
  const {

  } = props 

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Sale & Tax History</Text>
      </View>
      <View style={styles.rentalTypeContainer}>
        <View style={[styles.button, styles.unselected]}>
          <Text style={styles.text}>Sales History</Text>
        </View>
        <View style={[styles.button, styles.selected]}>
          <Text style={styles.text}>Tax History</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  separateContainer: {
    width: '94%',
    marginLeft: '2%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  },
  rentalTypeContainer: {
    width: '94%',
    marginLeft: '3%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8
  },
  button: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
  unselected: {
    margin: 4,
    borderRadius: 5
  },
  selected: {
    backgroundColor: 'lightgrey',
    margin: 2,
    borderRadius: 5
  },
  separateContainer: {
    width: '94%',
    marginLeft: '3%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  }
})

export default TaxAndPriceComponent