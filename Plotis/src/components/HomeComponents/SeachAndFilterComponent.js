import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView } from 'react-native'
import { FontAwesome, Feather } from 'react-native-vector-icons'

import ResultViewComponent from './ResultViewComponent'

const SeachAndFilterComponent = (props) => {
  const {
    currentSearch,
    resultView,
    isFilter,
    isSort,
    setCurrentSearch,
    updateResultView,
    setIsFilter,
    setIsSort,
    updateIsSort
  } = props

  return (
    <>
      <View style={styles.bar}> 
        <View style={styles.searchContainer}> 
          <View style={styles.iconContainer}>
            <Feather size={20} name='search'/>
          </View>
          <SafeAreaView> 
            <TextInput 
              style={styles.input}
              value={currentSearch}
              onChangeText={setCurrentSearch}
              placeholder='Search city or address...'
            />
          </SafeAreaView>
        </View>
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => {updateResultView('list')}}>
            {
              resultView == 'list' 
                ? 
                  <View style={styles.viewOptionSelected}> 
                    <Feather style={styles.icon} size={16} name='list'/>
                  </View>
                : 
                  <View style={styles.viewOptionUnelected}> 
                    <Feather style={styles.icon} size={16} name='list'/>
                  </View>
            }
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => {updateResultView('map')}}>
            {
              resultView == 'map' 
                ? 
                  <View style={styles.viewOptionSelected}> 
                    <Feather style={styles.icon} size={16} name='map'/>
                  </View>
                : 
                  <View style={styles.viewOptionUnelected}> 
                    <Feather style={styles.icon} size={16} name='map'/>
                  </View>
            }
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separtor}></View>
      <View style={styles.bar}> 
        <View style={styles.filterAndSortContainer}> 
          <TouchableOpacity>
            <View style={[styles.actionContainer, styles.mgnr8]}> 
              <Feather size={18} name='filter'/>
              <Text style={[styles.label, styles.ml8]}>
                Filter
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {updateIsSort()}}>
            <View style={styles.actionContainer}> 
              <FontAwesome size={18} name='sort'/>
              <Text style={[styles.label, styles.ml8]}>
                Sort
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.actionContainer, styles.saveStyle]}> 
          <Text style={[styles.label, styles.fcw]}>Save Serach</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 5,
    alignItems: 'center'
  },
  viewOptionSelected: {
    backgroundColor: 'lightgrey',
    margin: 1,
    borderRadius: 5
  },
  viewOptionUnselected: {
    margin: 2,
    borderRadius: 5
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
    width: 280,
    paddingHorizontal: 8
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
  icon: {
    marginHorizontal: 6,
    marginVertical: 6,
  },
  saveStyle: {
    backgroundColor: '#1c39bb',
  },
  fcw: {
    color: 'white',
  },
  ml8: {
    marginLeft: 4
  }
})

export default SeachAndFilterComponent