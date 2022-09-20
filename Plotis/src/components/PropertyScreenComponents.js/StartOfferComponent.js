import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const StartOfferComponent = (props) => {
  const {
    currentHome
  } = props
  const navigation = useNavigation()

  const startOffer = (zpid) => {
    navigation.navigate('OfferInformationScreen', {zpid: zpid})
  }
  
  return (
    <>
      <TouchableOpacity style={[styles.preapprovedContainer, styles.shadowBox]} onPress={() => {startOffer(currentHome.zpid)}}>
        <Text style={styles.label}>Make An Offer</Text>
      </TouchableOpacity>
    </>
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
    backgroundColor: '#1560bd',
    paddingVertical: 16,
    borderRadius: 5
  },
  label: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  },
  shadowBox: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  }
})

export default StartOfferComponent