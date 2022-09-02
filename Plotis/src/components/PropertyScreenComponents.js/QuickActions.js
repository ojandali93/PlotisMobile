import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Feather, MaterialCommunityIcons } from 'react-native-vector-icons'

const QuickActions = (props) => {
  const {currentHome} = props

  const redirectToApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${currentHome.latitude},${currentHome.longitude}`
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })
    Linking.openURL(url)
  }

  return (
    <View style={styles.quickActionContainer}>
      <View style={styles.quickActionContent}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons style={styles.icon} size={28} name='cards-heart-outline'/> 
          <Text>Favorite</Text>
        </View>
        <View style={styles.iconContainer}>
          <Feather style={styles.icon} size={28} name='message-square'/> 
          <Text>Connect</Text>
        </View>
        <TouchableOpacity onPress={() => {redirectToApp()}}>
          <View style={styles.iconContainer}>
            <Feather style={styles.icon} size={28} name='map'/> 
            <Text>Location</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Feather style={styles.icon} size={28} name='share'/> 
          <Text>Share</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  quickActionContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 48,
    justifyContent: 'space-between'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 6
  }
})

export default QuickActions