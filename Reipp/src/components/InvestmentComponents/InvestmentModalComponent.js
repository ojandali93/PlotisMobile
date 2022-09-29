import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'

import { metricInfo } from '../../../metrics'

const InvestmentModalComponent = (props) => {
  const {
    toggle,
    item
  } = props

  const metric = metricInfo[item]

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{metric.label}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{metric.info}</Text>
      </View>
      <TouchableOpacity style={styles.buttomContainer} onPress={() => {toggle(false)}}>
        <Text style={styles.buttom}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    textAlign: 'center'
  },
  info: {
    fontWeight: 17,
    fontWeight: '400',
    textAlign: 'center'
  },
  buttomContainer: {
    marginTop: 16
  },
  buttom: {
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1c39bb',
    borderRadius: 8,
    overflow: 'hidden',
    color: 'white'
  }
})

export default InvestmentModalComponent