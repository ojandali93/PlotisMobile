import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { Dimensions } from 'react-native'
let deviceHeight = Dimensions.get('window').height - 60

const ThankYouScreen = () => {
  const navigation = useNavigation()

  const closePage = () => {
    navigation.navigate('ProfileScreen')
  }

  return (
    <View style={styles.content}>
      <View style={styles.messages}>
        <Text style={styles.header}>We will reach out soon!</Text>
        <Text style={styles.label}>Thank you for choosing us to help you sell your home. One of our agents 
          will be reaching out to you within the next 24 hours to go over options.</Text>
      </View>
      <TouchableOpacity style={styles.closePageContainer} onPress={() => {closePage()}}>
        <Text style={styles.closePage}>Close Page</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: 44,
    width: '90%',
    marginLeft: '5%',
    height: deviceHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600'
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16
  },
  closePageContainer: {
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
  closePage: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  }
})

export default ThankYouScreen