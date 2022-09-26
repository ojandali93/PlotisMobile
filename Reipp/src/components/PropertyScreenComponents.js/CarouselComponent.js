import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { Dimensions } from 'react-native'

let deviceWidth = Dimensions.get('window').width
let aspectHeight = (deviceWidth / 1.78) + 1

let carouselImageWidth = (deviceWidth / 4)
let carouselImageHeight = (carouselImageWidth / 1.78) 

const CarouselComponent = (props) => {
  const {
    homeImages,
    selectedImage,
    updateFeaturedImage,
    goToGallery
  } = props
  
  return (
    <View style={styles.ImageContainer}>
      <TouchableOpacity onPress={() => {goToGallery()}}>
        <View style={styles.featuredImage}>
          <Image style={{width: deviceWidth, height: aspectHeight}} source={{uri: selectedImage}}/>
        </View>
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <FlatList 
          horizontal
          data={homeImages}
          renderItem={({item}) => {
            return(
              <TouchableOpacity onPress={() => {updateFeaturedImage(item)}}>
                <Image style={[{width: carouselImageWidth, height: carouselImageHeight}, styles.carouselImage]} source={{uri: item}}/>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ImageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  featuredImage: {
    marginBottom: 2
  },
  carouselContainer: {
    width: '100%',
    display: 'flex',
  },
  carouselImage: {
    marginRight: 2
  }
})

export default CarouselComponent