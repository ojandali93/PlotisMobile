import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PreapprovedComponent = (props) => {
  const {

  } = props
  
  return (
    <View style={[styles.preapprovedContainer, styles.shadowBox]}>
      <Text style={styles.label}>Get Pre-approved</Text>
      <View style={styles.cscontainer}>
        <Text style={styles.cs}>Coming Soon</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  preapprovedContainer: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1560bd',
    paddingVertical: 16,
    borderRadius: 5
  },
  label: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  },
  shadowBox: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  cscontainer: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 260
  },
  cs: {
    color: 'white'
  }
})

export default PreapprovedComponent