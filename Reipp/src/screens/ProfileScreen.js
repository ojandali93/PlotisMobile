import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { Feather,AntDesign, Ionicons, SimpleLineIcons} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

import { getAuth, signOut } from 'firebase/auth'

const ProfileScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  useEffect(() => {
    if(auth.currentUser){
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

  const goToOfferScreen = () => {
    navigation.navigate('OfferScreen')
  }

  const goToPaymentCalculator = () => {
    navigation.navigate('PaymentCalculatorScreen')
  }

  const goToSellHome = () => {
    navigation.navigate('SellHomeScreen')
  }

  const openJobs = () => {
    Linking.canOpenURL('https://angel.co/company/rippe/jobs').then(() => {
      Linking.openURL('https://angel.co/company/rippe/jobs');
    });
  }

  const goToSettings = () => {
    navigation.navigate('SettingsScreen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Omar jandali</Text>
        <TouchableOpacity onPress={() => {goToSettings()}}>
          <Feather style={styles.chevronDown} size={20} name='settings'/>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Searches</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => {goToRecentViews()}}>
        <Feather style={styles.chevronDown} size={20} name='eye'/>
        <Text style={styles.text}>Recent Views</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.row} onPress={() => {}}>
        <Feather style={styles.chevronDown} size={20} name='search'/>
        <Text style={styles.text}>Saved Searches</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.row} onPress={() => {goToOfferScreen()}}>
        <Feather style={styles.chevronDown} size={20} name='calendar'/>
        <Text style={styles.text}>Current Offers</Text>
      </TouchableOpacity>
      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Finances</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => {goToPaymentCalculator()}}>
        <SimpleLineIcons style={styles.chevronDown} size={20} name='calculator'/>
        <Text style={styles.text}>Payment Calculator</Text>
      </TouchableOpacity>
      <View style={styles.rowsb}>
        <View style={styles.rowLabel}>
          <Ionicons style={styles.chevronDown} size={20} name='wallet-outline'/>
          <Text style={styles.text}>What I Can Affort</Text>
        </View>
        <View style={styles.cscontainer}>
          <Text style={styles.cs}>Coming Soon</Text>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.label}>Houses</Text>
      </View>
      <TouchableOpacity style={styles.row} onPress={() => {goToSellHome()}}>
        <Feather style={styles.chevronDown} size={20} name='tag'/>
        <Text style={styles.text}>Sell My Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => {goToContactAgent()}}>
        <AntDesign style={styles.chevronDown} size={20} name='team'/>
        <Text style={styles.text}>Connect with agent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row} onPress={() => {openJobs()}}>
        <Feather style={styles.chevronDown} size={20} name='briefcase'/>
        <Text style={styles.text}>Careers</Text>
      </TouchableOpacity>
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
    width: '100%',
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
    borderBottomWidth: 2,
    justifyContent: 'space-between',
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
    fontWeight: '700',
    marginLeft: 16
  },
  sectionHeader: {
    width: '100%',
    paddingLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  rowsb: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowLabel: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  cs: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginRight: 8,
    backgroundColor: 'green',
    borderRadius: 5,
    overflow: 'hidden',
    color: 'white'
  },
})

export default ProfileScreen