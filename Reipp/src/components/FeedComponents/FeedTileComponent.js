import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

let deviceWidth = 350
var aspectHeight = (deviceWidth / 1.78) + 1

const FeedTileComponent = (props) => {
  const {
    item
  } = props

  const navigation = useNavigation();

  const goToDetailsPage =(zpid) => {
    navigation.navigate('PropertyFavoriteScreen', {zpid: zpid})
  }

  return (
    <>
      <TouchableOpacity onPress={() => {goToDetailsPage(item.zpid)}}>
        <View style={styles.tileContainer}>
          <View>
            <Image style={{height: aspectHeight, width: deviceWidth}} source={{uri: item.imgSrc}}/>
          </View>
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
              <Text style={styles.label}>{item.address}</Text>
            </View>
          </View>
          <View style={styles.bottomBar}></View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginRight: 8
  },
  hiBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 8
  },
  lowBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 160
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
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  price: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  bottomBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#1c39bb'
  }
})

export default FeedTileComponent