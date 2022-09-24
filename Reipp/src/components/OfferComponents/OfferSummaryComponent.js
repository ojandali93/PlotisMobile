import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const OfferSummaryComponent = (props) => {
  const {
    item
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Contact Number</Text>
        <Text style={styles.label}>{item.phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contact Email</Text>
        <Text style={styles.label}>{item.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Offer Amount</Text>
        <Text style={styles.label}>{item.offerAmount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Type Of Offer</Text>
        <Text style={styles.label}>{item.typeOfOffer}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Best Times</Text>
        <Text style={styles.label}>{item.bestTime}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Viewed Property</Text>
        <Text style={styles.label}>{item.preApproved}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '96%',
    marginLeft: '2%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 8
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  }
})

export default OfferSummaryComponent