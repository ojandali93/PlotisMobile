import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import SeachAndFilterComponent from '../components/HomeComponents/SeachAndFilterComponent'

const MainScreen = () => {

  const [currentSearch, setCurrentSearch] = useState()
  const [activeSearch, setActiveSearch] = useState()
  const [searchHistory, setSearchHistory] = useState()
  const [resultView, setResultView] = useState('list')
  const [isFilter, setIsFilter] = useState()
  const [isSort, setIsSort] = useState()

  const updateResultView = (view) => {
    if(view == 'list'){
      setResultView('list')
    }
    if(view == 'map'){
      setResultView('map')
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
        />
      </View>
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