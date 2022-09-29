import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import axios from 'axios'

import PropertySampleComponent from '../components/GeneralComponents/PropertySampleComponent'
import ContactAgentComponent from '../components/PropertyScreenComponents.js/ContactAgentComponent'


const ContactAgentScreen = ({route}) => {

  const extendedPropertOptions = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
    params: {location: 'Los Angeles, CA', home_type: 'Houses'},
    headers: {
      'X-RapidAPI-Key': '75939b7206msh9deac4f592e07fcp1c9832jsna42a1321f2df',
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  }

  const singlePropertyOptions = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/property',
    params: {zpid: '2080998890'},
    headers: {
      'X-RapidAPI-Key': '75939b7206msh9deac4f592e07fcp1c9832jsna42a1321f2df',
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  }

  const [addressLookup, setAddressLookup] = useState('')
  const [currentHome, setCurrentHome] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(route.params?.zpid){
      getPropertyDetails(route.params.zpid)
    }
  }, [])

  const newSearch = () => {
    setIsLoading(true)
    extendedPropertOptions.params.location = addressLookup
    axios.request(extendedPropertOptions)
      .then((response) => {
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
        setCurrentHome(response.data)
        setIsLoading(false)
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
        Object.keys(currentHome).length == 0 ? isLoading == true ? <Text>Loading Property</Text> : null 
                                             : <View style={styles.property}><PropertySampleComponent item={currentHome}/></View>
      }
      <ContactAgentComponent currentHome={currentHome}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 54
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