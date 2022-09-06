import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import { Feather } from 'react-native-vector-icons'
import { Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width * .4
var aspectHeight = (deviceWidth / 1.78) + 1

const PropertyTile = (props) => {
  const {
    item,
  } = props

  const propAddress1 = item.address.streetAddress + '. ' 
  const propAddress2 = item.address.city + ', ' + item.address.state + ' ' + item.address.zipcode

  return (
    <>
      <View style={styles. titleContainer}>
        <Text style={styles.title }>Searched Property</Text>
      </View>
      <View style={styles.tileContainer}>
        <View>
          <Image style={{height: aspectHeight, width: deviceWidth}} source={{uri: item.imgSrc}}/>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.lowBar}>
            <View style={styles.transparentContainer}>
              <Text style={styles.transparentLabel}>{item.propertyType}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentRow}>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <View style={styles.contentRow}>
              <View>
                <Text style={styles.label}>{item.bedrooms} Beds | {item.bathrooms} Baths | {item.livingArea} Sqft.</Text>
              </View>
              <View>
                <Text style={styles.label}>{item.listingStatus}</Text>
              </View>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.label}>{propAddress1}</Text>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.label}>{propAddress2}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    width: '96%',
    marginLeft: '2%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  hiBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'absolute'
  },
  lowBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 195
  },
  transparentContainer: {
    padding: 4,
    backgroundColor: 'black',
    opacity: .75,
    borderRadius: 3
  },
  transparentLabel: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    opacity: 1
  },
  quickIcons: {
    display: 'flex',
    flexDirection: 'row',
    padding: 4
  },
  iconContainer: {
    marginLeft: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 6
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  price: {
    fontSize: 17,
    fontWeight: '500'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  bottomBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#1c39bb'
  },
  infoContainer: {
    marginLeft: 8
  },
  titleContainer: {
    width: '96%',
    marginLeft: '2%',
    paddingVertical: 8
  },
  title: {
    fontSize: 17,
    fontWeight: '700'
  }
})

export default PropertyTile