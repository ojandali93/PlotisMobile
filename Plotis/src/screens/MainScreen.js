import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'
import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import ResultViewComponent from '../components/HomeComponents/ResultViewComponent'
import MapViewComponent from '../components/HomeComponents/MapViewComponent'
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
  const [appliedFilters, setAppliedFilters] = useState({})

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
        grabUserFavorites()
      })
      .catch((error) => {
        console.error(error)
      })
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   if (route.params?.currentFilters) {
  //     console.log('updated current filter', route.params)
  //     setActiveFilters(route.params.currentFilters)
  //     console.log('active filters', activeFilters)
  //   } else {
  //     console.log('no change')
  //   }
  // }, [route.params])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.currentFilters) {
        setActiveFilters(route.params.currentFilters)
      } else {
        console.log('no change')
      }
      grabUserFavorites()
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
    if(auth.currentUser == null){

    } else {
      const q = query(collectionRef, where('userId', '==', auth.currentUser.uid))
      onSnapshot(q, (snapshot) => {
        let favorites = []
        snapshot.docs.forEach((doc) => {
          favorites.push({ ...doc.data(), id: doc.id })
        })
        setFavoritesList(favorites)
      })
    }
  }

  useEffect(() => {
    if (route.params?.appliedFilters) {
      console.log('recieved filter', route.params.appliedFilters)
      setAppliedFilters(route.params.appliedFilters)
    } else {
      console.log('no filters found')
    }
  }, [route.params])

  const updateFilter = () => {
    console.log(appliedFilters)
    if(Object.keys(appliedFilters).length === 0){
      console.log('redirect with no filter')
      navigation.navigate('FilterStack')
    } else {
      console.log('redirect with filter')
      navigation.navigate('FilterStack', {appliedFilters:appliedFilters})
    }
  }

  const saveSearch = () => {
    console.log(activeFullSearch)
    const collectionRef = collection(db, 'SavedSearches')
    if(auth.currentUser.uid){
      activeFullSearch['sort'] = "Newest"
      addDoc(collectionRef, {
        "parameters": activeFullSearch,
        "userId": auth.currentUser.uid,
        "createdAt": serverTimestamp()
      }).then((response) => {
      }).catch((error) => {
        console.error(error)
      })
    }
  }

  const newSearch = () => {
    const parameters = {}
    // console.log('applied filters', appliedFilters)
    currentsearch == '' ? 
                          activeSearch == '' ? parameters['location'] = 'Los Angeles, CA' : parameters['location'] = activeSearch
                        : 
                          parameters['location'] = currentsearch 
    parameters['home_type'] = appliedFilters['home_type'].toString()
    parameters['sort'] = sort
    parameters['bathsMin'] = appliedFilters['bathsMin']
    parameters['bedsMin'] = appliedFilters['bedsMin']
    appliedFilters['maxPrice'] < 11000000 ? parameters['maxPrice'] = appliedFilters['maxPrice'] : null
    appliedFilters['minPrice'] > 0 ? parameters['minPrice'] = appliedFilters['minPrice'] : null
    appliedFilters['sqftMax'] < 7000 ? parameters['sqftMin'] = appliedFilters['sqftMax'] : null
    appliedFilters['sqftMin'] > 0 ? parameters['sqftMax'] = appliedFilters['sqftMin'] : null
    // console.log('parameters', parameters)
    setActiveSearch(currentsearch)
    setActiveFilters(appliedFilters)
    setActiveSort(sort)
    setActiveFullSearch(parameters)
    console.log(parameters)
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
        loading == true ? <LoadingComponent/> 
                        : currentView == 'list' ? <ResultViewComponent 
                                                    results={results} 
                                                    resultCount={resultCount}
                                                    activeSearch={activeSearch}
                                                    favoritesZpid={favoritesZpid}
                                                    favoritesList={favoritesList}/>
                                                : <MapViewComponent results={results} activeSearch={activeSearch}/>
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