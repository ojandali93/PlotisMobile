import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather, FontAwesome } from 'react-native-vector-icons'

import { db } from '../../../firebase'
import { getAuth } from "firebase/auth"
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore'

const QuickActions = (props) => {
  const {currentHome} = props
  const auth = getAuth()

  const [favoritesList, setFavoritesList] = useState([])
  const [favoritesZpid, setFavoritesZpid] = useState([])
  const [inFavorites, setInFavorites] = useState(false)

  const redirectToApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${currentHome.latitude},${currentHome.longitude}`
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })
    Linking.openURL(url)
  }

  useEffect(() => {
    if(auth.currentUser){
      grabFavorites()
    }
  }, [])  

  useEffect(() => {
    setInFavorites(favoritesZpid.includes(currentHome.zpid.toString()))
  }, [favoritesZpid])

  useEffect(() => {
    const newFavorites = []
    favoritesList.forEach((item) => {
      newFavorites.push(item.item.zpid)
    })
    setFavoritesZpid(newFavorites)
  }, [favoritesList])

  const grabFavorites = () => {
    const collectionRef = collection(db, 'Favorites')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
      onSnapshot(q, (snapshot) => {
        let favorites = []
        snapshot.docs.forEach((doc) => {
          favorites.push({ ...doc.data(), id: doc.id })
        })
        setFavoritesList(favorites)
      })
  }

  const addFavorites = () => {
    const collectionRef = collection(db, 'Favorites')
    if(auth.currentUser.uid){
      addDoc(collectionRef, {
        "item": currentHome,
        "userId": auth.currentUser.uid,
        "createdAt": serverTimestamp()
      }).then((response) => {
        console.log('added to faorites')
      }).catch((error) => {
        console.error(error)
      })
    }
  }

  const removeFavorites = () => {
    let selectedFavorite
    favoritesList.forEach((fav) => {
      if(fav.item.zpid == currentHome.zpid){
        selectedFavorite = fav
      }
    })
    console.log(selectedFavorite.id)
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
    <View style={styles.quickActionContainer}>
      <View style={styles.quickActionContent}>
        {
          inFavorites == false ?  <TouchableOpacity onPress={() => {addFavorites()}} style={styles.iconContainer}>
                                    <FontAwesome style={styles.icon} size={28} name='heart-o'/>
                                    <Text>Favorite</Text>
                                  </TouchableOpacity>
                                : <TouchableOpacity onPress={() => {removeFavorites()}} style={styles.iconContainer}>
                                    <FontAwesome style={styles.icon} size={28} name='heart'/>
                                    <Text>Favorite</Text>
                                  </TouchableOpacity>
        }
        <View style={styles.iconContainer}>
          <Feather style={styles.icon} size={28} name='message-square'/> 
          <Text>Connect</Text>
        </View>
        <TouchableOpacity onPress={() => {redirectToApp()}}>
          <View style={styles.iconContainer}>
            <Feather style={styles.icon} size={28} name='map'/> 
            <Text>Location</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Feather style={styles.icon} size={28} name='share'/> 
          <Text>Share</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  quickActionContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 48,
    justifyContent: 'space-between'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 6
  }
})

export default QuickActions