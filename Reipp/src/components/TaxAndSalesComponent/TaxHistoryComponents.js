import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { convertToDollars } from '../../../utilities'

const TaxHistoryComponents = (props) => {
  const {
    taxHistory
  } = props

  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerRow}>
        <View style={styles.yearContainer}>
          <Text style={styles.text}>Year</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.text}>Tax Amount</Text>
        </View>
        <View style={styles.assessedContainer}>
          <Text style={styles.text}>Assessment</Text>
        </View>
      </View>
      <FlatList 
        data={taxHistory}
        keyExtractor={item => item.item}
        style={styles.listContainer}
        renderItem={({item}) => {
          return(
            <View style={styles.row}>
              <View style={styles.yearContainer}>
                <Text style={styles.subText}>2011</Text>
              </View>
              <View style={styles.amountContainer}>
                {
                  item.taxPaid == null ? <Text style={styles.subText}>---</Text> : <Text style={styles.subText}>${convertToDollars(item.taxPaid)}</Text>
                }
              </View>
              <View style={styles.assessedContainer}>
                <Text style={styles.subText}>${convertToDollars(item.value)}</Text>
              </View>
            </View>
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
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  yearContainer: {
    width: '15%',
  },
  amountContainer: {
    width: '30%',
  },
  assessedContainer: {
    width: '35%',
  },
  text: {
    fontSize: 17,
    fontWeight: '700'
  },
  subText: {
    fontSize: 17,
    fontWeight: '400'
  }
})

export default TaxHistoryComponents