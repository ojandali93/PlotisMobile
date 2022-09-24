import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

import { convertToDollars } from '../../../utilities'

const StlMonthlyRevenueComponent = (props) => {
  const {
    currentHome,
    strMonthlyRevenue,
    setStrMonthlyRevenue
  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [yearlyRent, setYearlyRent] = useState((strMonthlyRevenue * 12).toString())
  
  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  const updateYearlyRent = (value) => {
    if(value == ''){
      setYearlyRent('0')
      setStrMonthlyRevenue('0')
    } else {
      setYearlyRent(value)
      setStrMonthlyRevenue(Math.round(parseInt(value) / 12).toString())
    }
  }

  const updateMonthlyRent = (value) => {
    if(value == ''){
      setYearlyRent('0')
      setStrMonthlyRevenue('0')
    } else {
      setYearlyRent((parseInt(value) * 12).toString())
      setStrMonthlyRevenue(value)
    }
  }

  return (
    <View style={styles.revenueContainer}>
    <TouchableOpacity onPress={() => {updateOpenEdit()}}>
      <View style={styles.revenueHeader}>
        <Text style={styles.label}>Rent:</Text>
        <View style={styles.dropDown}>
          <Text style={styles.label}>${convertToDollars(parseInt(strMonthlyRevenue))}</Text>
          <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
        </View>
      </View>
    </TouchableOpacity>
    {
      openEdit == false ? null : <><View style={styles.keyValueRow}>
                                      <Text style={styles.title}>Monthly Rent:</Text>
                                      <View style={styles.values}>
                                        <Text style={styles.value}>$</Text>
                                        <TextInput 
                                          value={strMonthlyRevenue}
                                          onChangeText={(value) => {updateMonthlyRent(value)}}
                                          keyboardType='numeric'
                                          style={styles.input}
                                        />
                                      </View>
                                    </View></>
    }
    {
      openEdit == false ? null : <><View style={styles.keyValueRow}>
                                      <Text style={styles.title}>Yearly Rent:</Text>
                                      <View style={styles.values}>
                                        <Text style={styles.value}>$</Text>
                                        <TextInput 
                                          value={yearlyRent}
                                          onChangeText={(value) => {updateYearlyRent(value)}}
                                          keyboardType='numeric'
                                          style={styles.input}
                                        />
                                      </View>
                                    </View></>
    }
    {
      openEdit == false ? null :  <>
                                    <View style={styles.disclaimerContainer}>
                                      <Text style={styles.disclaimer}>
                                        * Rent estimate is powered by 
                                      </Text>
                                      <TouchableOpacity> 
                                        <Text style={styles.disclaimer}>
                                          AirDna
                                        </Text>
                                      </TouchableOpacity>
                                      <Text style={styles.disclaimer}>
                                         rent estimator. *
                                      </Text>
                                    </View>
                                  </>
    }
  </View>
  )
}

const styles = StyleSheet.create({
  revenueContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%',
    marginTop: 16
  },
  revenueHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    fontSize: 17,
    fontWeight: '600'
  },
  chevronDown: {
    marginLeft: 8,
    color: '#1560bd'
  },
  keyValueRow: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginVertical: 8
  },
  title: {
    fontSize: 17,
    fontWeight: '500'
  },
  values: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 4
  },
  value: {
    fontSize: 17,
    fontWeight: '500',
  },
  icon: {
    marginLeft: 8
  },
  input: {
    width: 100,
    fontSize: 17,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey',
    paddingLeft: 4
  },
  shortInput: {
    width: 35,
    fontSize: 17,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey'
  },
  disclaimerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  disclaimer: {
    marginTop: 8,
  }
})

export default StlMonthlyRevenueComponent