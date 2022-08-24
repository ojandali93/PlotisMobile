import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'
import SortComponent from '../components/HomeComponents/SortComponent'
import FilterScreen from './FilterScreen'

const MainScreen = ({navigation, route}) => {

  const [currentSearch, setCurrentSearch] = useState()
  const [activeSearch, setActiveSearch] = useState()
  const [searchHistory, setSearchHistory] = useState()
  const [resultView, setResultView] = useState('list')
  const [isFilter, setIsFilter] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const [sort, setSort] = useState('')
  const [appliedFilters, setAppliedFilters] = useState({})

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
      <View><Text>Sort: {sort}</Text></View>
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