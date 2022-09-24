import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather } from 'react-native-vector-icons'

import { convertToDollars } from '../../../utilities'

import MonthlyRevenueComponent from '../RevenueComponents/MonthlyRevenueComponent'
import AdditionalRevenueComponents from '../RevenueComponents/AdditionalRevenueComponents'
import StlMonthlyRevenueComponent from '../RevenueComponents/StlMonthlyRevenueComponent'

const RevenueComponent = (props) => {
  const {
    currentHome,
    monthlyRevenue,
    setMonthlyRevenue
  } = props

  const [selected, setSelected] = useState('longTerm')
  // const [monthlyRevenue, setMonthlyRevenue] = useState('0')
  const [additionalRevenue, setAdditionalRevenue] = useState('0')
  const [ltlMonthlyRevenue, setLtlMonthlyRevenue] = useState(currentHome.rentZestimate == null ? '0' : currentHome.rentZestimate.toString())
  const [strMonthlyRevenue, setStrMonthlyRevenue] = useState('1700')

  const updateSelected = (value) => {
    setSelected(value)
  }

  useEffect(() => {
    if(selected == 'longTerm'){
      setMonthlyRevenue(parseInt(ltlMonthlyRevenue) + parseInt(additionalRevenue))
    } else {
      setMonthlyRevenue(parseInt(strMonthlyRevenue) + parseInt(additionalRevenue))
    }
  }, [selected])

  useEffect(() => {
    if(selected == 'longTerm'){
      setMonthlyRevenue(parseInt(ltlMonthlyRevenue) + parseInt(additionalRevenue))
    } else {
      setMonthlyRevenue(parseInt(strMonthlyRevenue) + parseInt(additionalRevenue))
    }
  }, [additionalRevenue])

  useEffect(() => {
    if(selected == 'longTerm'){
      setMonthlyRevenue(parseInt(ltlMonthlyRevenue) + parseInt(additionalRevenue))
    } else {
      setMonthlyRevenue(parseInt(strMonthlyRevenue) + parseInt(additionalRevenue))
    }
  }, [ltlMonthlyRevenue])

  useEffect(() => {
    if(selected == 'longTerm'){
      setMonthlyRevenue(parseInt(ltlMonthlyRevenue) + parseInt(additionalRevenue))
    } else {
      setMonthlyRevenue(parseInt(strMonthlyRevenue) + parseInt(additionalRevenue))
    }
  }, [strMonthlyRevenue])

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Revenue</Text>
        <Text style={styles.label}>${convertToDollars(monthlyRevenue)}</Text>
      </View>
      <View style={styles.rentalTypeContainer}>
      {
        selected == 'longTerm'  ? <>
                                    <TouchableOpacity  
                                        style={[styles.button, styles.selected]} 
                                        onPress={() => {updateSelected('longTerm')}}>
                                      <Text style={[styles.text, styles.selectedText]}>Long Term Lease</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.button, styles.unselected]} 
                                          onPress={() => {updateSelected('shortTerm')}}>
                                      <Text style={styles.text}>Short Term Rental</Text>
                                    </TouchableOpacity>
                                  </>
                                : <>
                                    <TouchableOpacity  
                                        style={[styles.button, styles.unselected]}
                                        onPress={() => {updateSelected('longTerm')}}>
                                      <Text>Long Term Lease</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={[styles.button, styles.selected]} 
                                          onPress={() => {updateSelected('shortTerm')}}>
                                      <Text style={[styles.text, styles.selectedText]}>Short Term Rental</Text>
                                    </TouchableOpacity>
                                  </>
                                
      }
      </View>
      {
        selected == 'longTerm'  ? <>
                                    <MonthlyRevenueComponent 
                                      currentHome={currentHome} 
                                      setLtlMonthlyRevenue={setLtlMonthlyRevenue}
                                      ltlMonthlyRevenue={ltlMonthlyRevenue}/>
                                    <View style={styles.separateContainer}></View>
                                    <AdditionalRevenueComponents additionalRevenue={additionalRevenue} setAdditionalRevenue={setAdditionalRevenue}/>
                                  </>
                                : <>
                                    <StlMonthlyRevenueComponent currentHome={currentHome} strMonthlyRevenue={strMonthlyRevenue} setStrMonthlyRevenue={setStrMonthlyRevenue}/>
                                    <View style={styles.separateContainer}></View>
                                    <AdditionalRevenueComponents additionalRevenue={additionalRevenue} setAdditionalRevenue={setAdditionalRevenue}/>
                                  </>
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
    borderRadius: 5,
    color: 'white'
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

export default RevenueComponent