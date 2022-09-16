import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

import PropertySampleComponent from '../components/GeneralComponents/PropertySampleComponent'

import { extendedPropertOptions, singlePropertyOptions } from '../../zillow'

import { Dimensions } from 'react-native'

import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from '../../firebase'

let deviceWidth = Dimensions.get('window').height - 250

const SellHomeScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const [addressLookup, setAddressLookup] = useState('')
  const [addressResult, setAddressResult] = useState({})

  const [timing, setTiming] = useState('3 days')
  const [reason, setReason] = useState('Upgrade my home')
  const [purchase, setPurchase] = useState('Yes')
  const [improvements, setImprovements] = useState('Yes')
  const [purchaseDetails, setPurchaseDetails] = useState('')
  const [improvementsDetails, setImprovementsDetails] = useState('')
  const [phone, setPhone] = useState('')
  const [aboutYourself, setAboutYourself] = useState('')

  const [message, setMessage] = useState('')

  const newSearch = () => {
    extendedPropertOptions.params.location = addressLookup
    axios.request(extendedPropertOptions)
      .then((response) => {
        console.log(response.data)
        Object.keys(response.data).length == 1 ? getPropertyDetails(response.data.zpid) : console.log('no detail found')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getPropertyDetails = (zpid) => {
    singlePropertyOptions.params.zpid = zpid
    axios.request(singlePropertyOptions)
      .then((response) => {
        setAddressResult(response.data)
        setMessage('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const submitInformation = () => {
    const collectionRef = collection(db, 'SellHome')
    const info = {
      'property': addressResult,
      'timing': timing,
      'reason': reason,
      'purchase': purchase,
      'purchaseDetails': purchaseDetails,
      'improvements': improvements,
      'improvementsDetails': improvementsDetails,
      'phone': phone,
      'aboutYourself': aboutYourself
    }
    if(Object.keys(addressResult).length == 0){
      setMessage('Must add a property to sell')
    } else {
      if(auth.currentUser.uid){
        addDoc(collectionRef, {
          "item": info,
          "userId": auth.currentUser.uid,
          "createdAt": serverTimestamp()
        }).then((response) => {
          console.log('added to SellHome')
          navigation.navigate('ThankYouScreen')
        }).catch((error) => {
          console.error(error)
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sell Your Home: </Text>
      </View>
      <View style={styles.rowSearch}>
        <Feather style={styles.chevronDownSearch} size={20} name='search'/>
        <TextInput 
          value={addressLookup}
          style={styles.inputSearch}
          onChangeText={setAddressLookup}
          placeholder={'Enter an address'}
        />
        <TouchableOpacity style={styles.searcingContainer} onPress={() => {newSearch()}}>
          <Text style={styles.searchSubmit}>Search</Text>
        </TouchableOpacity>
      </View>
      <View  style={styles.message}>
        {
          message == '' ? null : <Text style={styles.labelRed}>{message}</Text>
        }
      </View>
      <ScrollView style={{height: deviceWidth}}>
        {
          Object.keys(addressResult).length == 0 ? null : <View style={styles.property}><PropertySampleComponent item={addressResult}/></View>
        }
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.subheader}>How Soon are you looking to sell?</Text>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('3 days')}}>
              <Text style={styles.label}>3 days</Text>
              {
                timing == '3 days' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('1 week')}}>
              <Text style={styles.label}>1 Week</Text>
              {
                timing == '1 week' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('2 weeks')}}>
              <Text style={styles.label}>2 Weeks</Text>
              {
                timing == '2 weeks' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('1 month')}}>
              <Text style={styles.label}>1 Month</Text>
              {
                timing == '1 month' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('2 months')}}>
              <Text style={styles.label}>2 Months</Text>
              {
                timing == '2 months' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('3+ months')}}>
              <Text style={styles.label}>3+ Months</Text>
              {
                timing == '3+ months' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setTiming('other')}}>
              <Text style={styles.label}>Other</Text>
              {
                timing == 'other' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Reason for Selling?</Text>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Upgrade my home')}}>
              <Text style={styles.label}>Upgrade my home</Text>
              {
                reason == 'Upgrade my home' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Selling non-primary home')}}>
              <Text style={styles.label}>Selling non-primary home</Text>
              {
                reason == 'Selling non-primary home' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Relocation')}}>
              <Text style={styles.label}>Relocation</Text>
              {
                reason == 'Relocation' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Downsizing')}}>
              <Text style={styles.label}>Downsizing </Text>
              {
                reason == 'Downsizing' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Retiring')}}>
              <Text style={styles.label}>Retiring</Text>
              {
                reason == 'Retiring' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setReason('Other')}}>
              <Text style={styles.label}>Other</Text>
              {
                reason == 'Other' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Are you looking to purchase a home?</Text>
            <TouchableOpacity style={styles.row} onPress={() => {setPurchase('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                purchase == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
              {
                purchase == 'Yes' ? <View style={styles.column}>
                                      <Text style={styles.label}>What are you looking for?</Text>
                                      <TextInput 
                                        value={purchaseDetails}
                                        onChangeText={(value) => {setPurchaseDetails(value)}}
                                        multiline={true}
                                        style={styles.input}
                                        placeholder={'New home...'}
                                      />
                                    </View>
                                  : null
              }
            <TouchableOpacity style={styles.row} onPress={() => {setPurchase('No')}}>
              <Text style={styles.label}>No</Text>
              {
                purchase == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => {setPurchase('Undecided')}}>
              <Text style={styles.label}>Undecided</Text>
              {
                purchase == 'Undecided' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <Text style={styles.subheader}>Any Improvements to the property?</Text>
            <TouchableOpacity style={styles.row} onPress={() => {setImprovements('Yes')}}>
              <Text style={styles.label}>Yes</Text>
              {
                improvements == 'Yes' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
            {
                improvements == 'Yes' ? <View style={styles.column}>
                                      <Text style={styles.label}>Describe improvements:</Text>
                                      <TextInput 
                                        value={improvementsDetails}
                                        onChangeText={(value) => {setImprovementsDetails(value)}}
                                        multiline={true}
                                        style={styles.input}
                                        placeholder={'Improvements...'}
                                      />
                                    </View>
                                  : null
              }
            <TouchableOpacity style={styles.row} onPress={() => {setImprovements('No')}}>
              <Text style={styles.label}>No</Text>
              {
                improvements == 'No' ? <Feather style={styles.chevronDown} size={20} name='check'/> : null
              }
            </TouchableOpacity>
          </View>
          <View style={styles.separater}></View>
          <View style={styles.section}>
            <Text style={styles.subheader}>About you</Text>
            <View style={styles.column}>
              <Text style={styles.label}>Contact Number:</Text>
              <TextInput 
                value={phone}
                onChangeText={(value) => {setPhone(value)}}
                style={styles.input}
                keyboardType={'numeric'}
                placeholder={'(951) 534-3666...'}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>About Yourself:</Text>
              <TextInput 
                value={aboutYourself}
                onChangeText={(value) => {setAboutYourself(value)}}
                style={styles.input}
                multiline={true}
                placeholder={'Any details we should know about your or your property...'}
              />
            </View>
          </View>
          <View style={styles.disclaimer}>
            <Text style={styles.disclaim}>** Rippe charges a 1.5% listing fee based on selling price **</Text>
          </View>
          <TouchableOpacity style={styles.submitContainer} onPress={() => {submitInformation()}}>
            <Text style={styles.submitLabel}>Submit Information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  contentContainer: {
    width: '100%',
    padding: 8
  },
  subheader: {
    width: '100%',
    paddingVertical: 8,
    fontSize: 17,
    fontWeight: '600',
    paddingHorizontal: 8,
    backgroundColor: 'lightgrey'
  },
  row: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 17
  },
  labelRed: {
    fontSize: 17,
    color: 'red'
  },
  separater: {
    height: 16
  },
  input: {
    width: '100%',
    backgroundColor: 'lightgrey',
    fontSize: 17,
    paddingVertical: 4,
    color: 'black',
    marginTop: 6
  },
  rowSearch: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  chevronDownSearch: {
    color: '#1c39bb',
    marginLeft: 16,
    marginRight: 6
  },
  inputSearch: {
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
  submitContainer: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1560bd',
    paddingVertical: 16,
    borderRadius: 5
  },
  submitLabel: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 8
  },
  disclaimer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  }
})

export default SellHomeScreen