import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

import { convertToDollars } from '../../../utilities'

const HomeInsuranceComponent = (props) => {
  const {
    currentHome,
    homeInsurance,
    setHomeInsurance
  } = props

  const [openEdit, setOpenEdit] = useState(false)

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  const updateHomeInsurance = (value) => {
    if(value == ''){
      setHomeInsurance('0')
    } else {
      setHomeInsurance(value)
    }
  }

  return (
    <View style={styles.homeInsuranceContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.homeInsuranceHeader}>
          <Text style={styles.label}>Home Insurance:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>${convertToDollars(Math.round(parseInt(homeInsurance)/12))}</Text>
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
                                            value={homeInsurance}
                                            onChangeText={(value) => {updateHomeInsurance(value)}}
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
  homeInsuranceHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 17,
    fontWeight: '600'
  },
  disclaimer: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 8
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
    marginLeft: 4
  },
  icon: {
    marginLeft: 8
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  disclaimer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  input: {
    width: 100,
    fontSize: 17,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey',
    paddingLeft: 4
  },
  chevronDown: {
    marginLeft: 8,
    color: '#1560bd'
  },
})

export default HomeInsuranceComponent