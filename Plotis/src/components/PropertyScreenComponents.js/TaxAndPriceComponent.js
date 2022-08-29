import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import TaxHistoryComponents from '../TaxAndSalesComponent/TaxHistoryComponents'
import SaleHistoryComponent from '../TaxAndSalesComponent/SaleHistoryComponent'

const TaxAndPriceComponent = (props) => {
  const {

  } = props 

  const [selected,setSelected] = useState('sales')

  const updateSelected = (selection) => {
    setSelected(selection)
  }

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Sale & Tax History</Text>
      </View>
      <View style={styles.rentalTypeContainer}>
        {
          selected == 'sales' ? <>
                                  <TouchableOpacity  
                                      style={[styles.button, styles.selected]} 
                                      onPress={() => {updateSelected('sales')}}>
                                    <Text style={[styles.text, styles.selectedText]}>Sales History</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                      style={[styles.button, styles.unselected]} 
                                        onPress={() => {updateSelected('taxes')}}>
                                    <Text style={styles.text}>Tax History</Text>
                                  </TouchableOpacity>
                                </>
                              : <>
                                  <TouchableOpacity 
                                      style={[styles.button, styles.unselected]} 
                                      onPress={() => {updateSelected('sales')}}>
                                    <Text style={styles.text}>Sales History</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity 
                                      style={[styles.button, styles.selected]} 
                                      onPress={() => {updateSelected('taxes')}}>
                                    <Text style={[styles.text, styles.selectedText]}>Tax History</Text>
                                  </TouchableOpacity>
                                </>
        }
      </View>
      {
        selected == 'sales' ? <SaleHistoryComponent /> : null
      }
      {
        selected == 'taxes' ? <TaxHistoryComponents /> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  separateContainer: {
    width: '94%',
    marginLeft: '2%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  },
  rentalTypeContainer: {
    width: '94%',
    marginLeft: '3%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8
  },
  button: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
  unselected: {
    margin: 4,
    borderRadius: 5
  },
  selected: {
    backgroundColor: '#1560bd',
    margin: 2,
    borderRadius: 5
  },
  separateContainer: {
    width: '94%',
    marginLeft: '3%',
    height: 2,
    backgroundColor: 'grey',
    marginVertical: 8
  },
  selectedText: {
    color: 'white'
  }
})

export default TaxAndPriceComponent