import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import axios from 'axios'

import PropertySampleComponent from '../components/GeneralComponents/PropertySampleComponent'
import ContactAgentComponent from '../components/PropertyScreenComponents.js/ContactAgentComponent'

import { extendedPropertOptions, singlePropertyOptions } from '../../zillow'

import { Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width - 16
var aspectHeight = (deviceWidth / 1.78) + 1

const ContactAgentScreen = () => {
  const [addressLookup, setAddressLookup] = useState('')
  const [addressResult, setAddressResult] = useState({})

  const newSearch = () => {
    extendedPropertOptions.params.location = addressLookup
    console.log(extendedPropertOptions)
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
    console.log(singlePropertyOptions)
    axios.request(singlePropertyOptions)
      .then((response) => {
        console.log(response.data)
        setAddressResult(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Connect With An Agent</Text>
      </View>
      <View style={styles.row}>
        <Feather style={styles.chevronDown} size={20} name='search'/>
        <TextInput 
          value={addressLookup}
          style={styles.input}
          onChangeText={setAddressLookup}
          placeholder={'Enter an address'}
        />
        <TouchableOpacity style={styles.searcingContainer} onPress={() => {newSearch()}}>
          <Text style={styles.searchSubmit}>Search</Text>
        </TouchableOpacity>
      </View>
      {
        Object.keys(addressResult).length == 0 ? null : <View style={styles.property}><PropertySampleComponent item={addressResult}/></View>
      }
      <ContactAgentComponent />
    </View>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default ContactAgentScreen