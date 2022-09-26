import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const GridItemComponent = (props) => {
  const {
    item,
    updateSelectedHomeTypes,
    selectedHomeTypes
  } = props

  return(
    <>
      {
        selectedHomeTypes.includes(item.item.value) ? <TouchableOpacity  style={styles.itemContainerBlue} onPress={() => {updateSelectedHomeTypes(item.item.value)}}>
                                                        <View style={styles.item}>
                                                          <Image style={styles.icon} source={item.item.image}/>
                                                          <Text style={styles.label}>{item.item.value}</Text>
                                                        </View>
                                                      </TouchableOpacity>
                                                    : <TouchableOpacity  style={styles.itemContainer} onPress={() => {updateSelectedHomeTypes(item.item.value)}}>
                                                        <View style={styles.item}>
                                                          <Image style={styles.icon} source={item.item.image}/>
                                                          <Text style={styles.label}>{item.item.value}</Text>
                                                        </View>
                                                      </TouchableOpacity>
          }
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '33.33%',
    display: 'flex',
    paddingVertical: 22,
    borderColor: 'grey',
    borderWidth: 1,
  },
  itemContainerBlue: {
    width: '33.33%',
    display: 'flex',
    paddingVertical: 22,
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: '#273be2'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    marginBottom: 8
  },
  label: {
    fontSize: 17
  }
})

export default GridItemComponent