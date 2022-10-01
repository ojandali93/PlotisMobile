import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
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
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState()

  const [favoritesList, setFavoritesList] = useState([])
  const [favoritesZpid, setFavoritesZpid] = useState([])

  const updateCurrentView = (value) => {
    setCurrentView(value)
  }
  useEffect(() => {
    setLoading(true)
    axios.request(extendedPropertOptions)
      .then((response) => {
        setResults(response.data.props)
        setResultCount(response.data.totalResultCount)
        setTotalPages(response.data.totalPages)
        grabUserFavorites()
      })
      .catch((error) => {
        console.error(error)
      })
    setLoading(false)
  }, [])

  useEffect(() => {
    if(currentsearch == ''){
    } else {
      setActiveSearch(currentsearch)
    }
  }, [currentsearch])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.currentFilters) {
        setActiveFilters(route.params.currentFilters)
      } else {
      }
      grabUserFavorites()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const newFavorites = []
    favoritesList.forEach((item) => {
      newFavorites.push(item.zpid)
    })
    setFavoritesZpid(newFavorites)
  }, [favoritesList])

  const grabUserFavorites = () => {
    if(auth.currentUser == null){

    } else {
      const collectionRef = collection(db, 'Favorites')
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
      setAppliedFilters(route.params.appliedFilters)
    } else {
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
    if(auth.currentUser){
      activeFullSearch['sort'] = "Newest"
      activeFullSearch['bathsMin'] == undefined ? activeFullSearch['bathsMin'] == 0 : null
      activeFullSearch['bedsMin'] == undefined ? activeFullSearch['bedsMin'] == 0 : null
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

  const increasePageNumber = () => {
    if(pageNumber < totalPages){
      setPageNumber(pageNumber + 1)
    }
  }

  const decreasePageNumber = () => {
    if(pageNumber > 1){
      setPageNumber(pageNumber - 1)
    }
  }

  useEffect(() => {
    newSearch()
  }, [pageNumber])

  const newSearch = () => {
    if(Object.keys(appliedFilters).length == 0){
      const appliedFilters = {
        "home_type": 'Houses',
      }
    }
    const parameters = {}
    currentsearch == '' ? activeSearch == '' ? parameters['location'] = 'Los Angeles, CA'
                                             : parameters['location'] = activeSearch
                        : parameters['location'] = currentsearch 
    appliedFilters['home_type'] ? parameters['home_type'] = appliedFilters['home_type'].toString() : parameters['home_type'] = 'Houses'
    parameters['sort'] = sort
    parameters['bathsMin'] = appliedFilters['bathsMin']
    parameters['bedsMin'] = appliedFilters['bedsMin']
    appliedFilters['maxPrice'] < 11000000 ? parameters['maxPrice'] = appliedFilters['maxPrice'] : null
    appliedFilters['minPrice'] > 0 ? parameters['minPrice'] = appliedFilters['minPrice'] : null
    appliedFilters['sqftMax'] < 7000 ? parameters['sqftMin'] = appliedFilters['sqftMax'] : null
    appliedFilters['sqftMin'] > 0 ? parameters['sqftMax'] = appliedFilters['sqftMin'] : null
    parameters['page'] = pageNumber
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
        loading == true ? <LoadingComponent/> 
                        : currentView == 'list' ? <ResultViewComponent 
                                                    results={results} 
                                                    resultCount={resultCount}
                                                    activeSearch={activeSearch}
                                                    favoritesZpid={favoritesZpid}
                                                    favoritesList={favoritesList}
                                                    pageNumber={pageNumber}
                                                    increasePageNumber={increasePageNumber}
                                                    decreasePageNumber={decreasePageNumber}/>
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
    marginTop: 54
  }
})

export default MainScreen