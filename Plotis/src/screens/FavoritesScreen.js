import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import PropertyTile from '../components/GeneralComponents/PropertyTile'

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore'

const FavoritesScreen = ({navigation, route}) => {
  const auth = getAuth()

  const [favoritesList, setFavoritesList] = useState([])
  const [favoritesZpid, setFavoritesZpid] = useState([])
  const [loading, setLoading] = useState(true)

  const collectionRef = collection(db, 'Favorites')

  useEffect(() => {
    if(auth.currentUser == null){
      navigation.navigate('LoginScreen')
    } else {
      grabUserFavorites()
    }
  }, [])

  useEffect(() => {
    const newFavorites = []
    favoritesList.forEach((item) => {
      newFavorites.push(item.item.zpid)
    })
    setFavoritesZpid(newFavorites)
    // console.log(favoritesZpid)
  }, [favoritesList])

  const grabUserFavorites = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let favorites = []
      snapshot.docs.forEach((doc) => {
        favorites.push({ ...doc.data(), id: doc.id })
      })
      setFavoritesList(favorites)
      setLoading(false)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        console.log('not logged in')
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
          <Text style={styles.headerText}>Saved Properties</Text>
        </View>
        {
          loading == true ? <LoadingComponent/> : <FlatList
                                                    style={styles.tileList}
                                                    data={favoritesList}
                                                    keyExtractor={(item) => item.zpid}
                                                    renderItem={(item) => {
                                                      return(
                                                        <PropertyTile item={item.item} 
                                                                      favoritesList={favoritesList} 
                                                                      favoritesZpid={favoritesZpid}/>
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
  width: '100%'}
})

export default FavoritesScreen