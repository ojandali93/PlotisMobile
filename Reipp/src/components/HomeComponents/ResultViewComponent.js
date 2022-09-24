import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'

import { Feather, FontAwesome } from 'react-native-vector-icons'

import PropertyTile from '../GeneralComponents/PropertyTile'

import { convertToDollars } from '../../../utilities'

const ResultViewComponent = (props) => {
  const {
    results,
    resultCount,
    activeSearch,
    favoritesZpid,
    favoritesList,
    pageNumber,
    increasePageNumber,
    decreasePageNumber
  } = props

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Results: {convertToDollars(resultCount)} {activeSearch == "" ? null : <Text> -  "{activeSearch}"</Text>}</Text>
        <View style={styles.pageContainer}>
          <TouchableOpacity onPress={() => {decreasePageNumber()}}>
            <Feather style={styles.icon} size={20} name='chevron-left'/> 
          </TouchableOpacity>
          {
            pageNumber > 1 ? <Text style={styles.prevPage}>{pageNumber - 1}</Text> : null
          }
          <Text style={styles.currentPage}>{pageNumber}</Text>
          <Text style={styles.nextPage}>{pageNumber + 1}</Text>
          <TouchableOpacity onPress={() => {increasePageNumber()}}>
            <Feather style={styles.icon} size={20} name='chevron-right'/> 
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.tileList}
        data={results}
        keyExtractor={(item) => item.zpid}
        renderItem={(item) => {
          return(
            <PropertyTile item={item} favoritesList={favoritesList} favoritesZpid={favoritesZpid}/>
          )
        }}
      />
      <View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  tileList: {
    paddingHorizontal: 8,
    width: '100%'
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  currentPage: {
    fontSize: 21,
    fontWeight: '700'
  },
  nextPage: {
    fontSize: 17,
    fontWeight: '500',
    paddingLeft: 4
  },
  prevPage: {
    fontSize: 17,
    fontWeight: '500',
    paddingRight: 4
  }
})

export default ResultViewComponent