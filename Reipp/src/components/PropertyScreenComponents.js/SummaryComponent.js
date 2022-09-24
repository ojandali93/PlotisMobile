import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import { convertToDollars, convertFirstUpper } from '../../../utilities'

const SummaryComponent = (props) => {
  const {
    currentHome,
    currentHomeAddress
  } = props

  return (
    <View style={styles.contentContainer}>
      <View style={styles.contentRow}>
        <Text style={styles.price}>${convertToDollars(currentHome.price)}</Text>
      </View>
      <View style={styles.contentRow}>
        <View>
          <Text style={styles.label}>{currentHome.bedrooms} Beds | {currentHome.bathrooms} Baths | {convertToDollars(currentHome.livingArea)} Sqft.</Text>
        </View>
        <View>
          <Text style={styles.label}>{convertFirstUpper(currentHome.homeType)}</Text>
        </View>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.label}>{currentHomeAddress}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 16,
    paddingHorizontal: 8
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8
  },
  price: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
})

export default SummaryComponent