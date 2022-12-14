import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { convertToDollars } from '../../../utilities'

const SaleHistoryComponent = (props) => {
  const {
    saleHistory
  } = props

  let newSaleHistory = []

  if(saleHistory.length > 10){
    newSaleHistory = saleHistory.slice(0, 10)
  } else {
    newSaleHistory = saleHistory
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.separator}></View>
      <FlatList
        data={newSaleHistory}
        keyExtractor={item => item.time}
        style={styles.flatList}
        renderItem={({item}) => {
          return(
            <>
              <View style={styles.contentRow}>
                <View style={styles.topRow}>
                  <View><Text style={styles.action}>{item.event}</Text></View>
                  <View><Text style={styles.amount}>${convertToDollars(item.price)}</Text></View>
                </View>
                <View style={styles.bottomRow}>
                  <View><Text style={styles.date}>{item.date}</Text></View>
                  <View><Text style={styles.break}> | </Text></View>
                  <View><Text style={styles.mls}>{item.source}</Text></View>
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
    justifyContent: 'flex-start',
    marginTop: 4
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgrey'
  },
  action: {
    fontSize: 17,
    fontWeight: '700'
  },
  amount: {
    fontSize: 17,
    fontWeight: '700'
  }
})

export default SaleHistoryComponent