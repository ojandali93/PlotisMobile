import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'

const AdditionalExpensesComponent = (props) => {
  const {

  } = props

  return (
    <View style={styles.additionalExpContainer}>
      <View style={styles.additionalExpHeader}>
        <Feather style={styles.icon} size={28} name='chevrons-down'/> 
        <Text style={styles.label}>Additional Expenses</Text>
        <Feather style={styles.icon} size={28} name='chevrons-down'/> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  additionalExpContainer: {
    width: '94%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '3%',
    marginTop: 8
  },
  additionalExpHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  label: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1c39bb'
  },
  icon: {
    color: '#1c39bb',
    paddingHorizontal: 8
  }
})

export default AdditionalExpensesComponent