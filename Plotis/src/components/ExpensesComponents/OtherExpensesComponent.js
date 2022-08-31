import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const OtherExpensesComponent = (props) => {
  const {
    currentHome,
    setAdditionalExpenses,
    additionalExpenses
  } = props

  const [openEdit, setOpenEdit] = useState(false)
  const [internet, setInternet] = useState('0')
  const [maintenance, setMaintenance] = useState('0')
  const [management, setManagement] = useState('0')
  const [repairs, setRepairs] = useState('0')
  const [homeWarranty, setHomeWarranty] = useState('0')
  const [other, setOther] = useState('0')

  const updateOpenEdit = () => {
    if(openEdit == false){
      setOpenEdit(true)
    } else {
      setOpenEdit(false)
    }
  }

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [internet])

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [maintenance])

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [management])

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [repairs])

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [homeWarranty])

  useEffect(() => {
    setAdditionalExpenses(parseInt(internet) + 
                          parseInt(maintenance) + 
                          parseInt(management) + 
                          parseInt(repairs) + 
                          parseInt(homeWarranty) + 
                          parseInt(other))
  }, [other])

  return (
    <View style={styles.additionalExpensesContainer}>
      <TouchableOpacity onPress={() => {updateOpenEdit()}}>
        <View style={styles.additionalExpensesHeader}>
          <Text style={styles.label}>Additional Expenses:</Text>
          <View style={styles.dropDown}>
            <Text style={styles.label}>${additionalExpenses}</Text>
            <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
          </View>
        </View>
      </TouchableOpacity>
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Internet:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={internet}
                                            onChangeText={setInternet}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Maintenance:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={maintenance}
                                            onChangeText={setMaintenance}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Management:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={management}
                                            onChangeText={setManagement}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Repairs:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={repairs}
                                            onChangeText={setRepairs}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Home Warranty:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={homeWarranty}
                                            onChangeText={setHomeWarranty}
                                            keyboardType='numeric'
                                            style={styles.input}
                                          />
                                        </View>
                                      </View></>
      }
      {
        openEdit == false ? null : <><View style={styles.keyValueRow}>
                                        <Text style={styles.title}>Other:</Text>
                                        <View style={styles.values}>
                                          <Text style={styles.value}>$</Text>
                                          <TextInput 
                                            value={other}
                                            onChangeText={setOther}
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
  additionalExpensesContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%'
  },
  additionalExpensesHeader: {
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

export default OtherExpensesComponent