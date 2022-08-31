import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const UtilitiesComponent = (props) => {
  const {
    currentHome,
    setUtilities,
    utilities
  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [gas, setGas] = useState('0')
  const [water, setWater] = useState('0')
  const [electricity, setElectricity] = useState('0')
  const [sewerAndTrash, setSewerAndTrash] = useState('0')

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(water) + parseInt(electricity) + parseInt(sewerAndTrash))
  },[gas])

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(water) + parseInt(electricity) + parseInt(sewerAndTrash))
  },[water])

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(water) + parseInt(electricity) + parseInt(sewerAndTrash))
  },[electricity])

  useEffect(() => {
    setUtilities(parseInt(gas) + parseInt(water) + parseInt(electricity) + parseInt(sewerAndTrash))
  },[sewerAndTrash])

  return (
    <View style={styles.UtilitiesContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.UtilitiesHeader}>
          <Text style={styles.label}>Utilities:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>${parseInt(utilities)}</Text>
            <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
          </View>
        </View>
      </TouchableOpacity>
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Gas:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={gas}
                                            onChangeText={setGas}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Water:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={water}
                                            onChangeText={setWater}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Electricity:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={electricity}
                                            onChangeText={setElectricity}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Sewer & Trash:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={sewerAndTrash}
                                            onChangeText={setSewerAndTrash}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  UtilitiesContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  UtilitiesHeader: {
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
    marginLeft: 8 ,
    color: '#1560bd'
  },
})

export default UtilitiesComponent