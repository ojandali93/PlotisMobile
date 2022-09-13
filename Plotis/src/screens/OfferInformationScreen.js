import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { singlePropertyOptions } from '../../zillow';
import axios from 'axios';

import PropertySampleComponent from '../components/GeneralComponents/PropertySampleComponent'
import OfferInformationComponent from '../components/OfferComponents/OfferInformationComponent';
import OfferInputComponent from '../components/OfferComponents/OfferInputComponent';

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

const OfferInformationScreen = ({route}) => {
  const auth = getAuth()
  const navigation = useNavigation()

  const collectionRefOffers = collection(db, 'Offers')
  const collectionRefProfile = collection(db, 'Profiles')

  const [addressResult, setAddressResult] = useState({})
  const [user, setUser] = useState()
  const [offerDetails, setOfferDetails] = useState()
  const [loading, setLoading] = useState(true)

  const [contactNumber, setContactNumber] = useState()
  const [offerAmount, setOfferAmount] = useState()
  const [typeOfOffer, setTypeOfOffer] = useState('Cash')
  const [preApproved, setPreApproved] = useState('Yes')
  const [bestTime, setBestTime] = useState('Mornings')
  const [viewedProperty, setViewedProperty] = useState('Yes')

  useEffect(() => {
    if(auth.currentUser){
      grabUser()
      getPropertyDetails(route.params.zpid)
    } else {
      navigation.navigate('LoginScreen')
    }
  }, [])
  
  useEffect(() => {
    console.log('user', user)
  }, [user])

  const grabUser = () => {
    const q = query(collectionRefProfile, where('userId', '==', auth.currentUser.uid))
    getDocs(q)
      .then((snapshot) => {
        let profiles = []
        snapshot.docs.forEach((doc) => {
          profiles.push({ ...doc.data(), id: doc.id })
        })
        console.log(profiles)
        setUser(profiles[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getPropertyDetails = (zpid) => {
    singlePropertyOptions.params.zpid = zpid
    axios.request(singlePropertyOptions)
      .then((response) => {
        setAddressResult(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submitOffer = () => {
    addDoc(collectionRefOffers, {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "phone": user.phone,
      "contactNumber": contactNumber,
      "offerAmount": offerAmount,
      "typeOfOffer": typeOfOffer,
      "preApproved": preApproved,
      "bestTime": bestTime,
      "viewedProperty": viewedProperty,
      "userId": user.userId,
      "createdAt": serverTimestamp(),
    })
    .then((response) => {
      navigation.navigate('PropertyScreen', {zpid: route.params.zpid})
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Start an offer</Text>
        </View>
        <View style={styles.property}>
          {
            loading == true ? <Text>Loading</Text> : <PropertySampleComponent item={addressResult}/>
          }
        </View>
        <View>
          <OfferInformationComponent user={user}/>
        </View>
        <View style={styles.separater}></View>
        <View>
          <OfferInputComponent 
            contactNumber={contactNumber}
            offerAmount={offerAmount}
            typeOfOffer={typeOfOffer}
            preApproved={preApproved}
            bestTime={bestTime}
            viewedProperty={viewedProperty}
            setContactNumber={setContactNumber}
            setOfferAmount={setOfferAmount}
            setTypeOfOffer={setTypeOfOffer}
            setPreApproved={setPreApproved}
            setBestTime={setBestTime}
            setViewedProperty={setViewedProperty}
            submitOffer={submitOffer}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    marginTop: 44
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey'
  },
  chevronDown: {
    color: '#1c39bb',
    marginLeft: 16,
    marginRight: 6
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16
  },
  input: {
    width: '70%',
    fontSize: 17,
    paddingTop: 4,
    borderBottomColor: 'grey',
    borderBottomWidth: 2
  },
  searcingContainer: {
    marginLeft: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searchSubmit: {
    fontSize: 17,
    color: '#273be2'
  },
  property: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  separater: {
    width: '96%',

  }
})

export default OfferInformationScreen