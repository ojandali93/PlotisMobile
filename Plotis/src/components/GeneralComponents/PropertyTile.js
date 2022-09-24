import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import FavoriteSelected from '../PropertyTileComponents/FavoriteSelected'
import FavoriteUnselected from '../PropertyTileComponents/FavoriteUnselected'

import { Feather, FontAwesome } from 'react-native-vector-icons'
import { Dimensions } from 'react-native'

import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase'

import { convertToDollars, convertFirstUpper } from '../../../utilities'

let deviceWidth = Dimensions.get('window').width - 16
var aspectHeight = (deviceWidth / 1.78) + 1

const PropertyTile = (props) => {
  const {
    item,
    favoritesZpid,
    favoritesList
  } = props

  const auth = getAuth()
  const navigation = useNavigation();

  const updateShare = () => {
    console.log('share')
  }

  const goToDetailsPage =(zpid) => {
    const collectionRef = collection(db, 'RecentViews')
    if(auth.currentUser){
      addDoc(collectionRef, {
        "item": item.item,
        "userId": auth.currentUser.uid,
        "createdAt": serverTimestamp()
      }).then((response) => {
        console.log('added to faorites')
      }).catch((error) => {
        console.error(error)
      })
    }
    navigation.navigate('PropertyScreen', {zpid: zpid})
  }

  const addToFavorites = () => {
    const collectionRef = collection(db, 'Favorites')
    if(auth.currentUser){
      addDoc(collectionRef, {
        "item": item.item,
        "userId": auth.currentUser.uid,
        "zpid": item.item.zpid,
        "createdAt": serverTimestamp()
      }).then((response) => {
        console.log('added to faorites')
      }).catch((error) => {
        console.error(error)
      })
    }
  }

  const removeFromFavorites = (zpid) => {
    let selectedFavorite
    favoritesList.forEach((fav) => {
      console.log(fav)
      if(fav.zpid == zpid){
        selectedFavorite = fav
      }
    })
    console.log(selectedFavorite)
    const docRef = doc(db, 'Favorites', selectedFavorite.id)
    deleteDoc(docRef)
      .then((response) => {
        console.log('delete favorite')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <TouchableOpacity onPress={() => {goToDetailsPage(item.item.zpid)}}>
        <View style={styles.tileContainer}>
          <View>
            <Image style={{height: aspectHeight, width: deviceWidth}} source={{uri: item.item.imgSrc}}/>
          </View>
          <View style={styles.hiBar}>
            <View style={styles.quickIcons}>
              <TouchableOpacity onPress={() => {updateShare()}}>
                {/* <View style={styles.iconContainer}>
                  <Feather style={styles.icon} size={20} name='share'/> 
                </View> */}
              </TouchableOpacity>
              {
                favoritesZpid == null ? null : favoritesZpid.includes(item.item.zpid) ? <FavoriteSelected item={item} removeFromFavorites={removeFromFavorites}/> : <FavoriteUnselected addToFavorites={addToFavorites}/>
              }
            </View>
          </View>
          <View style={styles.lowBar}>
            <View style={styles.transparentContainer}>
              <Text style={styles.transparentLabel}>{item.item.propertyType}</Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.contentRow}>
              <Text style={styles.price}>${convertToDollars(item.item.price)}</Text>
            </View>
            <View style={styles.contentRow}>
              <View>
                <Text style={styles.label}>{item.item.bedrooms} Beds | {item.item.bathrooms} Baths | {convertToDollars(item.item.livingArea)} Sqft.</Text>
              </View>
              <View>
                <Text style={styles.label}>{convertFirstUpper(item.item.listingStatus)}</Text>
              </View>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.label}>{item.item.address}</Text>
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white'
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

export default PropertyTile