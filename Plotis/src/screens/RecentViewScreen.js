import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';


import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import PropertyTile from '../components/GeneralComponents/PropertyTile'

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore'


const RecentViewScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const [recentViewsList, setRecentViewsList] = useState([])
  const [recentViewsZpid, setRecentViewsZpid] = useState([])
  const [loading, setLoading] = useState(true)

  const collectionRef = collection(db, 'RecentViews')

  useEffect(() => {
    if(auth.currentUser == null){
      navigation.navigate('LoginScreen')
    } else {
      grabRecentViews()
    }
  }, [])

  useEffect(() => {
    const newRecentViews = []
    recentViewsList.forEach((item) => {
      newRecentViews.push(item.item.zpid)
    })
    setRecentViewsZpid(newRecentViews)
    // console.log(favoritesZpid)
  }, [recentViewsList])

  const grabRecentViews = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid), orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshot) => {
      let recentViews = []
      snapshot.docs.forEach((doc) => {
        recentViews.push({ ...doc.data(), id: doc.id })
      })
      setRecentViewsList(recentViews)
      setLoading(false)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        console.log('not logged in')
      } else {
        setLoading(true)
        grabRecentViews()
      }
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Recently Viewed Properties: </Text>
        </View>
        {
          loading == true ? <LoadingComponent/> : <FlatList
                                                    style={styles.tileList}
                                                    data={recentViewsList}
                                                    keyExtractor={(item) => item.item.zpid}
                                                    renderItem={(item) => {
                                                      return(
                                                        <PropertyTile item={item.item} 
                                                                      favoritesList={null} 
                                                                      favoritesZpid={null}/>
                                                      )
                                                    }}
                                                  />
        }
      </View>
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

export default RecentViewScreen