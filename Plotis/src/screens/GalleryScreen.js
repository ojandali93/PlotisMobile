import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Image } from 'react-native'
import { Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width
let aspectHeight = (deviceWidth / 1.78) + 1

const GalleryScreen = ({route}) => {

  const [homeImages, setHomeImages] = useState(route.params.homeImages)

  return (
    <View style={styles.carouselContainer}>
      <FlatList 
        data={homeImages}
        renderItem={({item}) => {
          return(
            <View style={styles.image}>
              <Image style={[{width: deviceWidth, height: aspectHeight}, styles.carouselImage]} source={{uri: item}}/>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    marginTop: 44
  },
  image: {
    marginBottom: 8
  }
})

export default GalleryScreen