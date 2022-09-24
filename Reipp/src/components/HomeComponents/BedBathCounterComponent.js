import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const BedBathCounterComponent = (props) => {
  const {
    item,
    count,
    updateBedCount
  } = props

  if(item.amount == count){
    return(
      <TouchableOpacity onPress={() => {updateBedCount(item.amount)}}>
        <View style={styles.itemContainerBlue}>
          <Text style={{color:'white'}}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  } else {
    return(
      <TouchableOpacity onPress={() => {updateBedCount(item.amount)}}>
        <View style={styles.itemContainer}>
          <Text>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  bedContainer: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 5,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center'
  },
  itemContainer: {
    padding: 16,
    backgroundColor: 'lightgrey',
    borderRadius:1,
    borderColor:'grey',
    borderWidth:1
  },
  itemContainerBlue: {
    padding: 16,
    backgroundColor: '#273be2',
    borderRadius:1,
    borderColor:'grey',
    borderWidth:1
  }
})

export default BedBathCounterComponent