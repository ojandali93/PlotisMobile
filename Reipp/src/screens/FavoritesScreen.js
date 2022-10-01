import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import FavoritesPropertyTileComponent from '../components/GeneralComponents/FavoritesPropertyTileComponent'

import { Dimensions } from 'react-native'
const loadingDeviceHeight = Dimensions.get('window').height-44
const loadingDeviceWidth = Dimensions.get('window').width

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const FavoritesScreen = ({navigation}) => {
  const auth = getAuth()

  const [favoritesList, setFavoritesList] = useState([])
  const [loading, setLoading] = useState(false)

  const collectionRef = collection(db, 'Favorites')

  useEffect(() => {
    if(auth.currentUser == null){
      navigation.navigate('LoginFavoriteScreen')
    } else {
      setLoading(true)
      grabUserFavorites()
    }
  }, [])

  const grabUserFavorites = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let favorites = []
      snapshot.docs.forEach((doc) => {
        favorites.push({ ...doc.data(), id: doc.id })
      })
      if(favorites.length == 0){
        setFavoritesList([])
        setLoading(false)
      } else {
        setFavoritesList(favorites)
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        navigation.navigate('LoginFavoriteScreen')
      } else {
        setLoading(true)
        grabUserFavorites()
      }
    })
    return unsubscribe
  }, [navigation])


  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Favorited Properties: </Text>
        </View>
        {
          loading == true ? <LoadingComponent/> : favoritesList.length == 0 ? <View style={[styles.screen, {height: loadingDeviceHeight, width: loadingDeviceWidth}]}>
                                                                                <View style={styles.content}>
                                                                                  <View style={styles.headerContainer}>
                                                                                    <Text style={styles.tagline}>No Favorited Properties</Text>
                                                                                  </View>
                                                                                </View>
                                                                              </View>
                                                                            : <FlatList
                                                                                style={styles.tileList}
                                                                                data={favoritesList}
                                                                                keyExtractor={(item) => item.zpid}
                                                                                renderItem={(item) => {
                                                                                  return(
                                                                                    <FavoritesPropertyTileComponent item={item.item}/>
                                                                                  )
                                                                                }}
                                                                              />
        }
      </View>
    </> 
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    marginBottom: 8
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16,
    fontWeight: '700'
  },
  tileList: {
    paddingHorizontal: 8,
    width: '100%'
  },
  content: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 225,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  tagline: {
    fontSize: 22,
    fontWeight: '800'
  },
})

export default FavoritesScreen