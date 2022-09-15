import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import PropertySampleComponent from '../GeneralComponents/PropertySampleComponent'
import OfferSummaryComponent from './OfferSummaryComponent'

const OfferTileComponent = (props) => {
  const {
    item
  } = props

  console.log(item)

  return (
    <View style={styles.container}>
      <PropertySampleComponent item={item.item.property}/>
      <View style={styles.separater}></View>
      <OfferSummaryComponent item={item.item}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  separater: {
    width: '96%',
    marginLeft: '2%',
    height: 2,
    backgroundColor: 'lightgrey'
  }
})

export default OfferTileComponent