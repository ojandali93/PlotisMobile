import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'

const OfferInformationComponent = (props) => {
  const{
    user
  } = props

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.info}>
        Hello {user == undefined ? null : user.firstName}. We are excited that you found an investment property you liked. We want
        to make the process as simple as possible which all starts by filling out some simple information.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 8,
  },
  info: {
    textAlign: 'center',
    fontSize: 17
  }
})

export default OfferInformationComponent