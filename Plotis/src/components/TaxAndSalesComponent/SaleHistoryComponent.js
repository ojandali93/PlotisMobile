import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageEditor } from 'react-native'

const SaleHistoryComponent = (props) => {
  const {

  } = props

  const sampleSale = [
    {
      'key': '0',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '1',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '2',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '3',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '4',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '5',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '6',
      'year': '2011',
      'Tax Amount': '1,234',
      'Assessment': '12,458'
    },
    {
      'key': '7',
      'year': '2011',
      'taxAmount': '1,234',
      'assessment': '12,458'
    }
  ]

  return (
    <View style={styles.contentContainer}>
      <View style={styles.separator}></View>
      <FlatList
        data={sampleSale}
        keyExtractor={item => item.key}
        style={styles.flatList}
        renderItem={({}) => {
          return(
            <>
              <View style={styles.contentRow}>
                <View style={styles.topRow}>
                  <View><Text style={styles.action}>Listed For Sale</Text></View>
                  <View><Text style={styles.amount}>$1,000,000</Text></View>
                </View>
                <View style={styles.bottomRow}>
                  <View><Text style={styles.date}>Aug. 12, 2021</Text></View>
                  <View><Text style={styles.break}>||</Text></View>
                  <View><Text style={styles.mls}>MLS#: 15134561615</Text></View>
                </View>
              </View>
              <View style={styles.separator}></View>
            </>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    width: '94%',
    marginLeft: '3%',
    marginTop: 16
  },
  contentRow: {
    marginVertical: 8
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey'
  }
})

export default SaleHistoryComponent