import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const MortgageInsuranceComponent = (props) => {
  const {

  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [mortgageInsurance, setMortgageInsurance] = useState('0')

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  return (
    <View style={styles.homeInsuranceContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.mortgageHeader}>
          <Text style={styles.label}>Mortgage Insurance:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>$1,234</Text>
            <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
          </View>
        </View>
      </TouchableOpacity>
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Annual Insurance:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={mortgageInsurance}
                                            onChangeText={setMortgageInsurance}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View>
                                      <View style={styles.disclaimer}>
                                        <Text>* Ususally equired for down payments below 20%. *</Text>
                                      </View></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  homeInsuranceContainer: {
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
  disclaimer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  }
})

export default MortgageInsuranceComponent