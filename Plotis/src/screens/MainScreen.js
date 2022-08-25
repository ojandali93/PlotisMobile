import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'
import SortComponent from '../components/HomeComponents/SortComponent'
import LoadingComponent from '../components/HomeComponents/LoadingComponent'
import ResultViewComponent from '../components/HomeComponents/ResultViewComponent'

import { extendedPropertOptions } from '../../zillow'

const MainScreen = ({navigation, route}) => {
  const [currentSearch, setCurrentSearch] = useState()
  const [activeSearch, setActiveSearch] = useState()
  const [searchHistory, setSearchHistory] = useState()
  const [resultView, setResultView] = useState('list')
  const [isFilter, setIsFilter] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const [sort, setSort] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({})
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [resultCount, setResultCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    axios.request(extendedPropertOptions)
      .then((response) => {
        console.log(response.data)
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

  const updateResultView = (view) => {
    if(view == 'list'){
      setResultView('list')
    }
    if(view == 'map'){
      setResultView('map')
    }
  }

  const updateIsSort = () => {
    if(isSort == false){
      setIsSort(true)
    }
  }

  const updateSort = (sort) => {
    setSort(sort)
    setIsSort(false)
  }

  const updateFilter = () => {
    if(Object.keys(appliedFilters).length === 0){
      navigation.navigate('FilterStack')
    } else {
      navigation.navigate('FilterStack', {appliedFilters:appliedFilters})
    }
  }

  return (
    <View>
      <View style={styles.sortAndFilterContainer}> 
        <SeachAndFilterComponent 
          currentSearch={currentSearch}
          resultView={resultView}
          isFilter={isFilter}
          isSort={isSort}
          setCurrentSearch={setCurrentSearch}
          updateResultView={updateResultView}
          setIsFilter={setIsFilter}
          setIsSort={setIsSort}
          updateIsSort={updateIsSort}
          updateFilter={updateFilter}
        />
      </View>
      {
        isSort == false ? null : <SortComponent updateSort={updateSort} sort={sort}/>
      }
      {
        loading == true ? <LoadingComponent/> : <ResultViewComponent results={results} resultCount={resultCount}/>
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
    borderBottomWidth: 2
  }
})

export default MainScreen