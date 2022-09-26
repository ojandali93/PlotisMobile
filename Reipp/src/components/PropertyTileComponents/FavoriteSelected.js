import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from 'react-native-vector-icons'

const FavoriteSelected = (props) => {
  const {
    item,
    removeFromFavorites
  } = props

  return (
    <>
      <TouchableOpacity onPress={() => {removeFromFavorites(item.item.zpid)}}>
        <View style={styles.iconContainer}>
          <FontAwesome style={styles.icon} size={20} name='heart'/>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50,
  },
  icon: {
    color: '#1560bd'
  }
})

export default FavoriteSelected