import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'
import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import ResultViewComponent from '../components/HomeComponents/ResultViewComponent'

import { extendedPropertOptions } from '../../zillow'
import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from '../../firebase'

const MainScreen = ({navigation, route}) => {
  const auth = getAuth()

  const [currentsearch, setCurrentSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [activeFilters, setActiveFilters] = useState('')
  const [activeSort, setActiveSort] = useState('')
  const [activeFullSearch, setActiveFullSearch] = useState({})
  const [loading, setLoading] = useState('')
  const [results, setResults] = useState([])
  const [resultCount, setResultCount] = useState('')
  const [currentView, setCurrentView] = useState('list')
  const [sort, setSort] = useState('Homes_for_You')
  const [appliedFilters, setAppliedFilters] = useState({"home_type": 'Houses'})

  const updateCurrentView = (value) => {
    setCurrentView(value)
  }
  useEffect(() => {
    setLoading(true)
    axios.request(extendedPropertOptions)
      .then((response) => {
        setResults(response.data.props)
        setResultCount(response.data.totalResultCount)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    if (route.params?.newFilter) {
      setAppliedFilters(route.params.newFilter);
    }
  }, [route.params])

  const updateFilter = () => {
    if(Object.keys(appliedFilters).length === 0){
      navigation.navigate('FilterStack')
    } else {
      navigation.navigate('FilterStack', {appliedFilters:appliedFilters})
    }
  }

  const saveSearch = () => {
    const collectionRef = collection(db, 'SavedSearches')
    if(auth.currentUser.uid){
      addDoc(collectionRef, {
        "parameters": activeFullSearch,
        "userId": auth.currentUser.uid,
        "createdAt": serverTimestamp()
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.error(error)
      })
    }
  }

  const newSearch = () => {
    console.log(appliedFilters)
    const parameters = {}
    appliedFilters['home_type'].length > 0 ? parameters['homeType'] = appliedFilters['home_type'].toString() : parameters['homeType'] = 'Houses'
    currentsearch == '' ? 
                          activeSearch == '' ? parameters['location'] = 'Los Angeles, CA' : parameters['location'] = activeSearch
                        : 
                          parameters['location'] = currentsearch 
    parameters['sort'] = sort
    parameters['bathsMin'] = appliedFilters['bathsMin']
    parameters['badsMin'] = appliedFilters['bedsMin']
    appliedFilters['maxPrice'] < 11000000 ? parameters['maxPrice'] = appliedFilters['maxPrice'] : null
    appliedFilters['minPrice'] > 0 ? parameters['minPrice'] = appliedFilters['minPrice'] : null
    appliedFilters['sqftMax'] < 7000 ? parameters['sqftMin'] = appliedFilters['sqftMax'] : null
    appliedFilters['sqftMin'] > 0 ? parameters['sqftMax'] = appliedFilters['sqftMin'] : null
    console.log(parameters)
    setActiveSearch(currentsearch)
    setActiveFilters(appliedFilters)
    setActiveSort(sort)
    setActiveFullSearch(parameters)
    extendedPropertOptions.params = parameters
    setLoading(true)
    axios.request(extendedPropertOptions)
      .then((response) => {
        setResults(response.data.props)
        setResultCount(response.data.totalResultCount)
        setCurrentSearch('')
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <View>
      <View style={styles.sortAndFilterContainer}> 
        <SeachAndFilterComponent 
          currentsearch={currentsearch}
          setCurrentSearch={setCurrentSearch}
          setActiveSearch={setActiveSearch}
          updateCurrentView={updateCurrentView}
          currentView={currentView}
          sort={sort}
          setSort={setSort}
          updateFilter={updateFilter}
          newSearch={newSearch}
          saveSearch={saveSearch}
        />
      </View>
      {
        loading == true ? <LoadingComponent/> : <ResultViewComponent 
                                                  results={results} 
                                                  resultCount={resultCount}
                                                  activeSearch={activeSearch}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  sortAndFilterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    marginTop: 44
  }
})

export default MainScreen