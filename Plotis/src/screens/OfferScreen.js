import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore'

import OfferTileComponent from '../components/OfferComponents/OfferTileComponent'

const OfferScreen = () => {
  const auth = getAuth()

  const [offerList, setOfferList] = useState()
  const [loading, setLoading] = useState(true)

  const collectionRef = collection(db, 'Offers')

  useEffect(() => {
    if(auth.currentUser){
      grabOffers()
    }
  }, [])

  const grabOffers = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let currentOffers = []
      snapshot.docs.forEach((doc) => {
        currentOffers.push({ ...doc.data(), id: doc.id })
      })
      setOfferList(currentOffers)
      setLoading(false)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Current Offers: </Text>
      </View>
      <View>
        <FlatList
          style={styles.flatlist}
          data={offerList}
          keyExtractor={(item) => item.id}
          renderItem={(item) => {
            return(
              <OfferTileComponent item={item}/>
            )
          }}
        />
      </View>
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
})

export default OfferScreen