import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { FontAwesome, Feather } from 'react-native-vector-icons'

import SortComponent from './SortComponent'


const SeachAndFilterComponent = (props) => {
  const {
    currentsearch,
    setCurrentSearch,
    updateCurrentView,
    currentView,
    sort,
    setSort,
    updateFilter,
    newSearch,
    saveSearch
  } = props

  const [openSort, setOpenSort] = useState(false)

  const updateOpenSort = () => {
    openSort == false ? setOpenSort(true) : setOpenSort(false)
  }

  const updateSort = (sort) => {
    setSort(sort)
    setOpenSort(false)
  }

  return (
    <>
      <View>
        <View style={styles.bar}> 
          <View style={styles.searchContainer}> 
            <View style={styles.iconContainer}>
              <Feather size={20} name='search'/>
            </View>
            <SafeAreaView> 
              <TextInput 
                style={styles.input}
                value={currentsearch}
                onChangeText={setCurrentSearch}
                placeholder='Search city or address...'
              />
            </SafeAreaView>
            <TouchableOpacity style={styles.searcingContainer} onPress={() => {newSearch()}}>
              <Text style={styles.searchSubmit}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewContainer}>
            <TouchableOpacity onPress={() => {updateCurrentView('list')}}>
              {
                currentView == 'list' 
                  ? 
                    <View style={styles.viewOptionSelected}> 
                      <Feather style={styles.selectedIcon} size={16} name='list'/>
                    </View>
                  : 
                    <View style={styles.viewOptionUnelected}> 
                      <Feather style={styles.unselectedIcon} size={16} name='list'/>
                    </View>
              }
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => {updateCurrentView('map')}}>
              {
                currentView == 'map' 
                  ? 
                    <View style={styles.viewOptionSelected}> 
                      <Feather style={styles.selectedIcon} size={16} name='map'/>
                    </View>
                  : 
                    <View style={styles.viewOptionUnelected}> 
                      <Feather style={styles.unselectedIcon} size={16} name='map'/>
                    </View>
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separtor}></View>
        <View style={styles.bar}> 
          <View style={styles.filterAndSortContainer}> 
            <TouchableOpacity onPress={() => {updateFilter()}}>
              <View style={[styles.actionContainer, styles.mgnr8]}> 
                <Feather size={18} name='filter'/>
                <Text style={[styles.label, styles.ml8]}>
                  Filter
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {updateOpenSort()}}>
              <View style={styles.actionContainer}> 
                <FontAwesome size={18} name='sort'/>
                <Text style={[styles.label, styles.ml8]}>
                  Sort
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.actionContainer, styles.saveStyle]} onPress={() => {saveSearch()}}>
            <Text style={[styles.label, styles.fcw]}>Save Serach</Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        openSort == false ? null : <SortComponent updateSort={updateSort} sort={sort}/>
      }
    </>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  searcingContainer: {
    marginLeft: 8
  },  
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 5,
    alignContent: 'center'
  },
  viewOptionSelected: {
    backgroundColor: 'lightgrey',
    margin: 2,
    borderRadius: 5,
  },
  viewOptionUnselected: {
    margin: 3,
    borderRadius: 5,
    color: 'white'
  },
  filterAndSortContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center'
  },
  input: {
    fontSize: 17,
    width: 240,
    paddingHorizontal: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginLeft: 4
  },
  separtor: {
    width: '100%',
    height: 1,
    marginVertical: 6,
    backgroundColor: 'grey'
  },
  label: {
    fontSize: 17
  },
  mgnr8: {
    marginRight: 8
  },
  unselectedIcon: {
    marginHorizontal: 6,
    marginVertical: 6
  },
  selectedIcon: {
    marginHorizontal: 6,
    marginVertical: 6,
  },
  saveStyle: {
    backgroundColor: '#1560bd',
  },
  fcw: {
    color: 'white',
  },
  ml8: {
    marginLeft: 4
  },
  searchSubmit: {
    fontSize: 17,
    color: '#273be2'
  }
})

export default SeachAndFilterComponent