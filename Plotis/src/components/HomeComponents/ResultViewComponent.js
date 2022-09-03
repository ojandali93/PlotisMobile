import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native'

import PropertyTile from '../GeneralComponents/PropertyTile'

const ResultViewComponent = (props) => {
  const {
    results,
    resultCount,
    activeSearch,
    favoritesZpid,
    favoritesList
  } = props

  return (
    <>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Total Results: {resultCount} {activeSearch == "" ? null : <Text> -  "{activeSearch}"</Text>}</Text>
        <View>

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
  }
})

export default ResultViewComponent