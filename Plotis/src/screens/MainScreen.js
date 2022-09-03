import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'
import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import ResultViewComponent from '../components/HomeComponents/ResultViewComponent'
import { extendedPropertOptions } from '../../zillow'

import { db } from '../../firebase'
import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore'

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
  const [appliedFilters, setAppliedFilters] = useState({
    home_type: ['Houses'],
    minPrice: 0,
    maxPrice: 11000000,
    bathsMin: 0,
    bedsMin: 0,
    sqftMin: 0,
    sqftMax: 7000,
  })
  const [favoritesList, setFavoritesList] = useState([])
  const [favoritesZpid, setFavoritesZpid] = useState([])

  const collectionRef = collection(db, 'Favorites')

  const updateCurrentView = (value) => {
    setCurrentView(value)
  }
  useEffect(() => {
    setLoading(true)
    axios.request(extendedPropertOptions)
      .then((response) => {
        setResults(response.data.props)
        setResultCount(response.data.totalResultCount)
        if(auth.currentUser == null){
          console.log('nothing')
        } else {
          grabUserFavorites()
        }
      })
      .catch((error) => {
        console.error(error)
      })
    setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        console.log('not logged in')
      } else {
        grabUserFavorites()
      }
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const newFavorites = []
    favoritesList.forEach((item) => {
      newFavorites.push(item.item.zpid)
    })
    setFavoritesZpid(newFavorites)
    // console.log(favoritesZpid)
  }, [favoritesList])

  const grabUserFavorites = () => {
    const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
    onSnapshot(q, (snapshot) => {
      let favorites = []
      snapshot.docs.forEach((doc) => {
        favorites.push({ ...doc.data(), id: doc.id })
      })
      setFavoritesList(favorites)
    })
  }

  useEffect(() => {
    if (route.params?.currentFilters) {
      setAppliedFilters(route.params.currentFilters);
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
    const parameters = {}
    currentsearch == '' ? 
                          activeSearch == '' ? parameters['location'] = 'Los Angeles, CA' : parameters['location'] = activeSearch
                        : 
                          parameters['location'] = currentsearch 
    parameters['home_type'] = appliedFilters['home_type'].toString()
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
                                                  activeSearch={activeSearch}
                                                  favoritesZpid={favoritesZpid}
                                                  favoritesList={favoritesList}/>
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