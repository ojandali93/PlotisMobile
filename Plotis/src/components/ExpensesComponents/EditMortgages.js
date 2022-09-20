import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import {Picker} from '@react-native-picker/picker';

import { calculateLoanAmount, calculateDownPaymentPercent, calculateDownPaymentAmount } from './metrics'
import { calculateClosingCost, calculateMortgagePayment } from './metrics'

import { convertToDollars } from '../../../utilities'

const EditMortgages = (props) => {
  const {
    currentHome, 
    mortgage, 
    setMortgage,
    setTotalDownPaymentPercent,
    setTotalLoanAmount,
    setTotalDownPayment
  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [homePrice, setHomePrice] = useState(currentHome.price.toString())
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [downPaymentAmount, setDownPaymentAmount] = useState(calculateDownPaymentAmount(homePrice, downPaymentPercent))
  const [loanAmount, setLoanAmount] = useState(calculateLoanAmount(homePrice, downPaymentAmount))
  const [loanProgram, setLoanProgram] = useState('30 Year Fixed')
  const [loanProgramYears, setLoanProgramYears] = useState(30)
  const [interestRate, setInterestRate] = useState(currentHome.mortgageRates.thirtyYearFixedRate)
  const [openSelectProgram, setOpenSelectProgram] = useState(false)

  useEffect(() => {
    setDownPaymentAmount(calculateDownPaymentAmount(homePrice, downPaymentPercent))
    setTotalDownPayment(calculateDownPaymentAmount(homePrice, downPaymentPercent))
    setLoanAmount(calculateLoanAmount(homePrice, downPaymentAmount))
  }, [homePrice])

  useEffect(() => {
    setDownPaymentPercent(calculateDownPaymentPercent(homePrice, downPaymentAmount))
    setLoanAmount(calculateLoanAmount(homePrice, downPaymentAmount))
  }, [downPaymentAmount])

  useEffect(() => {
    setDownPaymentAmount(calculateDownPaymentAmount(homePrice, downPaymentPercent))
    setTotalDownPayment(calculateDownPaymentAmount(homePrice, downPaymentPercent))
    setLoanAmount(calculateLoanAmount(homePrice, downPaymentAmount))
    setTotalDownPaymentPercent(downPaymentPercent)
  }, [downPaymentPercent])

  useEffect(() => {
    setTotalLoanAmount(loanAmount)
    setMortgage(calculateMortgagePayment(loanAmount, parseFloat(interestRate)))
  }, [loanAmount])

  useEffect(() => {
    setMortgage(calculateMortgagePayment(loanAmount, parseFloat(interestRate)))
  }, [interestRate])

  useEffect(() => {
    if(loanProgram == '30 Year Fixed'){
      setLoanProgramYears(30)
    }
    if(loanProgram == '15 Year Fixed'){
      setLoanProgramYears(15)
    }
    if(loanProgram == '5 Year Amoritized'){
      setLoanProgramYears(5)
    }
  }, [loanProgram])

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  const updateHomePrice = (value) => {
    let price = value
    if(value == ""){
      setHomePrice(0)
    } else {
      setHomePrice(parseInt(price))
    }
  }

  const updateDownPaymentAmount = (value) => {
    let price = value
    if(value == ""){
      setDownPaymentAmount(0)
      setTotalDownPayment(0)
    } else {
      setDownPaymentAmount(parseInt(price))
      setTotalDownPayment(parseInt(price))
    }
  }

  const updateDownPaymentPercent = (value) => {
    let price = value
    if(value == ""){
      setDownPaymentPercent(0)
    } else {
      setDownPaymentPercent(parseInt(price))
    }
  }

  const updateInterestRate = (value) => {
    let price = value
    console.log(price)
    if(value == ""){
      setInterestRate('0')
    } else {
      setInterestRate(price)
    }
  }

  const updateLoanProgram = (value) => {
    let price = value
    if(value == ""){
      setOpenSelectProgram(false)
      setLoanProgram('30 Year Fixed')
    } else {
      setOpenSelectProgram(false)
      setLoanProgram(price)

    }
  }

  const selectProgram = () => {
    if(openSelectProgram == false){
      setOpenSelectProgram(true)
    } else {
      setOpenSelectProgram(false)
    }
  }
 
  return (
    <View style={styles.mortgageContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.mortgageHeader}>
          <Text style={styles.label}>Principle & Interest:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>${convertToDollars(mortgage)}</Text>
            <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
          </View>
        </View>
      </TouchableOpacity>
      {
        openEdit == false ? null : <View style={styles.keyValueRow}>
                                    <Text style={styles.title}>Home Price:</Text>
                                    <View style={styles.values}>
                                      <Text style={styles.value}>$</Text>
                                      <TextInput 
                                        value={homePrice.toString()}
                                        onChangeText={(value) => {updateHomePrice(value)}}
                                        keyboardType='numeric'
                                        style={styles.input}
                                      />
                                    </View>
                                  </View>
      }
      {
        openEdit == false ? null : <View style={styles.keyValueRow}>
                                    <Text style={styles.title}>Down Payment:</Text>
                                    <View style={styles.values}>
                                      <Text style={styles.value}>$</Text>
                                      <TextInput 
                                        value={downPaymentAmount.toString()}
                                        onChangeText={(value) => {updateDownPaymentAmount(value)}}
                                        keyboardType='numeric'
                                        style={styles.input}
                                      />
                                      <View style={styles.values}>
                                      <Text style={styles.value}>%</Text>
                                      <TextInput 
                                        value={downPaymentPercent.toString()}
                                        onChangeText={(value) => {updateDownPaymentPercent(value)}}
                                        keyboardType='numeric'
                                        style={styles.shortInput}
                                      />
                                    </View>
                                    </View>
                                  </View>
      }
      {
        openEdit == false ? null : <View style={styles.keyValueRow}>
                                    <Text style={styles.title}>Interest Rate:</Text>
                                    <View style={styles.values}>
                                      <Text style={styles.value}>%</Text>
                                      <TextInput 
                                        value={interestRate.toString()}
                                        onChangeText={(value) => {updateInterestRate(value)}}
                                        keyboardType='numeric'
                                        style={styles.input}
                                      />
                                    </View>
                                  </View>
      }
      {
        openEdit == false ? null
                          : <View style={styles.keyValueRow}>
                              <Text style={styles.title}>Loan Program:</Text>
                              <TouchableOpacity style={styles.pickerOpen} onPress={() => {selectProgram()}}>
                                <Text style={styles.selectText}>{loanProgram}</Text>
                                <Feather style={styles.chevronDown} size={20} name='chevron-down'/>
                              </TouchableOpacity>
                            </View>
      }
      {
        openSelectProgram == false ? null : <Picker
                                              selectedValue={loanProgram}
                                              onValueChange={(itemValue, itemIndex) =>
                                                updateLoanProgram(itemValue)
                                              }>
                                              <Picker.Item label="30 Year Fixed" value={'30 Year Fixed'} />
                                              <Picker.Item label="15 Year Fixed" value={'15 Year Fixed'} />
                                              <Picker.Item label="5 Year Amoritized" value={'5 Year Amoritized'}/>
                                            </Picker>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mortgageContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  mortgageHeader: {
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
    marginTop: 8
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
  pickerOpen: {
    display: 'flex',
    flexDirection: 'row'
  },
  selectText: {
    fontSize: 17,
    fontWeight: '500'
  }
})

export default EditMortgages