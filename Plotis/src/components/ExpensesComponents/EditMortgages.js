import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const EditMortgages = (props) => {
  const {

  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [homePrice, setHomePrice] = useState('111,111')
  const [downPaymentPercent, setDownPaymentPercent] = useState('20')
  const [downPaymentAmount, setDownPaymentAmount] = useState('22,222')
  const [loanProgram, setLoanProgram] = useState('30 Year')
  const [interestRate, setInterestRate] = useState('5.08')

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }
 
  return (
    <View style={styles.mortgageContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.mortgageHeader}>
          <Text style={styles.label}>Principle & Interest:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>$1,234</Text>
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
                                        value={homePrice}
                                        onChangeText={setHomePrice}
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
                                        value={downPaymentAmount}
                                        onChangeText={setDownPaymentAmount}
                                        keyboardType='numeric'
                                        style={styles.input}
                                      />
                                      <View style={styles.values}>
                                      <Text style={styles.value}>%</Text>
                                      <TextInput 
                                        value={downPaymentPercent}
                                        onChangeText={setDownPaymentPercent}
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
                                        value={interestRate}
                                        onChangeText={setInterestRate}
                                        keyboardType='numeric'
                                        style={styles.input}
                                      />
                                    </View>
                                  </View>
      }
      {
        openEdit == false ? null : <View style={styles.keyValueRow}>
                                    <Text style={styles.title}>Loan Program:</Text>
                                    <TextInput 
                                      value={loanProgram}
                                      onChangeText={setLoanProgram}
                                      keyboardType='numeric'
                                      style={styles.input}
                                    />
                                  </View>
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
  }
})

export default EditMortgages