import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import FeedLabelComponents from '../components/FeedComponents/FeedLabelComponents';

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';

let deviceHeight = Dimensions.get('window').height - 120

const FeedScreen = () => {
  const [savedSearchList, setSavedSeachList] = useState()

  const auth = getAuth()
  const navigation = useNavigation()

  useEffect(() => {
    if(auth.currentUser){
      grabSavedSearches()
    } else {
      navigation.navigate('LoginScreen')
    }
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser){
        grabSavedSearches()
      } else {
        navigation.navigate('LoginScreen')
      }
    })
      return unsubscribe
  }, [navigation])

  const grabSavedSearches = () => {
    const collectionRef = collection(db, 'SavedSearches')
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let savedSearches = []
      snapshot.docs.forEach((doc) => {
        savedSearches.push({ ...doc.data(), id: doc.id })
      })
      setSavedSeachList(savedSearches)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Feed:</Text>
      </View>
      <View>
        <FlatList
          style={styles.flatlist}
          data={savedSearchList}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return (
              <> 
                <FeedLabelComponents item={item}/>
              </>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
    height: deviceHeight,
    paddingBottom: 60
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16,
    fontWeight: '700'
  },
  tileList: {
    paddingHorizontal: 8,
    width: '100%'
  }
})

export default FeedScreen