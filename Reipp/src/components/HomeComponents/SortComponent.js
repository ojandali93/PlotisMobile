import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native'
import { FontAwesome, Feather } from 'react-native-vector-icons'

const SortComponent = (props) => {
  const {
    sort,
    updateSort
  } = props

  return (
    <View style={styles.sortContainer}>
      <TouchableOpacity onPress={() => {updateSort('Homes_for_You')}}>
        <View style={styles.optionContainer}>
          <View>
            <Text style={styles.label}>Relevant</Text>
          </View>
          <View>
            {
              sort === 'Homes_for_You' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Newest')}}>
        <View style={styles.optionContainer}>
          <View>
            <Text style={styles.label}>Newest</Text>
          </View>
          <View>
            {
              sort == 'Newest' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Price_High_Low')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Price</Text>
            <Feather size={20} name='arrow-down'/>
          </View>
          <View>
            {
              sort == 'Price_High_Low' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Price_Low_High')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Price</Text>
            <Feather size={20} name='arrow-up'/>
          </View>
          <View>
            {
              sort == 'Price_Low_High' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Bedrooms')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Bedrooms</Text>
          </View>
          <View>
            {
              sort == 'Bedrooms' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Bathrooms')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Bathrooms</Text>
          </View>
          <View>
            {
              sort == 'Bathrooms' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Square_Feet')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Square Feet</Text>
          </View>
          <View>
            {
              sort == 'Square_Feet' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {updateSort('Lot_Size')}}>
        <View style={styles.optionContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.label}>Lot Size</Text>
          </View>
          <View>
            {
              sort == 'Lot_Size' ? <Feather size={18} name='check'/> : null
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  sortContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  optionContainer: {
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row'
  },  
  label: {
    fontSize: 17
  }
})

export default SortComponent