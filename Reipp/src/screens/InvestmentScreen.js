import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Dimensions } from 'react-native'

import InvestmentPropertyTileComponent from '../components/GeneralComponents/InvestmentPropertyTileComponent'

const loadingDeviceHeight = Dimensions.get('window').height-44
const loadingDeviceWidth = Dimensions.get('window').width

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { collection, query, where, onSnapshot } from 'firebase/firestore'

const InvestmentScreen = ({navigation}) => {
  const auth = getAuth()

  const [investmentList, setInvestmentList] = useState([])
  const [loading, setLoading] = useState(false)

  const collectionRef = collection(db, 'InvestmentProperties')

  useEffect(() => {
    if(auth.currentUser == null){
      navigation.navigate('LoginScreen')
    } else {
      setLoading(true)
      grabInvestmentProperties()
    }
  }, [])

  const grabInvestmentProperties = () => {
    const q = query(collectionRef)
    onSnapshot(q, (snapshot) => {
      let investments = []
      snapshot.docs.forEach((doc) => {
        investments.push({ ...doc.data(), id: doc.id })
      })
      setInvestmentList(investments)
      setLoading(false)
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        setLoading(true)
        grabInvestmentProperties()
    })
    return unsubscribe
  }, [navigation])

  // useEffect(() => {
  //   console.log(investmentList)
  // }, [investmentList])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Investment Properties: </Text>
        </View>
        {
          loading == true ? <Text>Loading</Text> : investmentList.length == 0 ? <View style={[styles.screen, {height: loadingDeviceHeight, width: loadingDeviceWidth}]}>
                                                                                <View style={styles.content}>
                                                                                  <View style={styles.headerContainer}>
                                                                                    <Text style={styles.tagline}>No Investment Properties</Text>
                                                                                  </View>
                                                                                </View>
                                                                              </View>
                                                                            : <FlatList
                                                                                style={styles.tileList}
                                                                                data={investmentList}
                                                                                keyExtractor={(item) => item.zpid}
                                                                                renderItem={(item) => {
                                                                                  return(
                                                                                    <InvestmentPropertyTileComponent item={item.item}/>
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
    marginTop: 54,
    marginBottom: 60
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

export default InvestmentScreen