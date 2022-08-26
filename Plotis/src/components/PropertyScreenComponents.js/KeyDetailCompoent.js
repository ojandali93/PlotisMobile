import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const KeyDetailCompoent = (props) => {
  const {currentHome} = props
  // console.log(currentHome)
  // console.log(currentHome.resoFacts)

  const home = currentHome.resoFacts
  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Key Details</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={[styles.col, styles.extraPadding]}>
          <View style={styles.row}>
            <Text style={styles.text}>Days On Zillow:</Text>
            <Text style={styles.text}>{home.daysOnZillow}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Living Space:</Text>
            <Text style={styles.text}>{home.livingArea}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Price / Sqft.: </Text>
            <Text style={styles.text}>${home.pricePerSquareFoot}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Parking Spaces:</Text>
            <Text style={styles.text}>{home.parking}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Heating</Text>
            <Text style={styles.text}>{home.hasHeating}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Property Type:</Text>
            <Text style={styles.text}>{home.homeType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>55+ Community:</Text>
            <Text style={styles.text}>{home.isSeniorCommunity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Parcel #:</Text>
            <Text style={styles.text}>{home.parcelNumber}</Text>
          </View>
        </View>
        <View style={[styles.col]}>
          <View style={styles.row}>
            <Text style={styles.text}>Year Built: </Text>
            <Text style={styles.text}>{home.yearBuilt}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Lot Size:</Text>
            <Text style={styles.text}>{home.lotSize}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>HOA Fee: </Text>
            <Text style={styles.text}>{home.hoaFee}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Levels: </Text>
            <Text style={styles.text}>{home.levels}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Cooling: </Text>
            <Text style={styles.text}>{home.hasCooling}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Style: </Text>
            <Text style={styles.text}>{home.architecturalStyle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Subdivision: </Text>
            <Text style={styles.text}>{home.subdivisionName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>MLS #: </Text>
            <Text style={styles.text}>{currentHome.mlsid}</Text>
          </View>
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
    paddingLeft: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    width: '49%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    marginBottom: 8
  },
  text: {
    fontSize: 17,
    fontWeight: '500'
  },
})

export default KeyDetailCompoent