import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'

import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import PropertyTile from '../components/GeneralComponents/PropertyTile'

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"

const RecentViewsComponent = () => {
  const auth = getAuth()

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
  }, [recentViewsList])

  const grabRecentViews = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
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
                                                    keyExtractor={(item) => item.zpid}
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

export default RecentViewsComponent