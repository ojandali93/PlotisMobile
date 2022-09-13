import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather,AntDesign, Ionicons, SimpleLineIcons} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

import { db } from '../../firebase'
import { getAuth, signOut } from 'firebase/auth'

const ProfileScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  useEffect(() => {
    if(auth.currentUser){
      console.log(auth.currentUser)
    } else {
      navigation.navigate('LoginScreen')
    }
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        navigation.navigate('LoginStack')
      } else {
        console.log('logged in')
      }
    })
    return unsubscribe
  }, [navigation])

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out')
        navigation.navigate('LoginScreen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const goToRecentViews = () => {
    navigation.navigate('RecentViewScreen')
  }

  const goToContactAgent = () => {
    navigation.navigate('ContactAgentScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Omar jandali</Text>
        <Feather style={styles.chevronDown} size={20} name='settings'/>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => {goToRecentViews()}}>
        <Feather style={styles.chevronDown} size={20} name='eye'/>
        <Text style={styles.text}>Recent Views</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <SimpleLineIcons style={styles.chevronDown} size={20} name='calculator'/>
        <Text style={styles.text}>Payment Calculator</Text>
      </View>
      <View style={styles.row}>
        <Ionicons style={styles.chevronDown} size={20} name='wallet-outline'/>
        <Text style={styles.text}>how much can i affort</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => {goToContactAgent()}}>
        <AntDesign style={styles.chevronDown} size={20} name='team'/>
        <Text style={styles.text}>Connect with agent</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Feather style={styles.chevronDown} size={20} name='calendar'/>
        <Text style={styles.text}>Current Offers</Text>
      </View>
      <View style={styles.row}>
        <Feather style={styles.chevronDown} size={20} name='briefcase'/>
        <Text style={styles.text}>Careers</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {signoutUser()}}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey'
  },
  chevronDown: {
    color: '#1c39bb',
    marginHorizontal: 16
  },
  logout: {
    fontSize: 17,
    marginLeft: 16,
    color: '#1c39bb'
  },
  text: {
    fontSize: 17,
  },
  headerText: {
    fontSize: 22,
    marginLeft: 16
  }
})

export default ProfileScreen