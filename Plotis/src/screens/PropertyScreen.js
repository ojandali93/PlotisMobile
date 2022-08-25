import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { singlePropertyOptions, singlePropertyImages } from '../../zillow'

import CarouselComponent from '../components/PropertyScreenComponents.js/CarouselComponent';
import SummaryComponent from '../components/PropertyScreenComponents.js/SummaryComponent'

import { Dimensions } from 'react-native'
import axios from 'axios'

let deviceWidth = Dimensions.get('window').width
let aspectHeight = (deviceWidth / 1.78) + 1

let carouselImageWidth = (deviceWidth / 4)
let carouselImageHeight = (carouselImageWidth / 1.78) 

const PropertyScreen = ({route}) => {
  const navigation = useNavigation();

  let referenceZpid = route.params.zpid
  singlePropertyOptions.params.zpid = referenceZpid
  singlePropertyImages.params.zpid = referenceZpid

  const [currentHome, setCurrentHome] = useState({})
  const [currentHomeAddress, setCurrentHomeAddress] = useState()
  const [homeImages, setHomeImages] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.request(singlePropertyOptions)
      .then((response) => {
        setCurrentHome(response.data)
        createHomeAddress(response.data.address)
        setSelectedImage(response.data.imgSrc)
        updateImages(response.data.zpid)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const updateImages = (zpid) => {
    axios.request(singlePropertyImages)
      .then((response) => {
        setHomeImages(response.data.images)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const createHomeAddress = (address) => {
    let currentAddress = address.streetAddress + '. ' + address.city + ', ' + address.state + ' ' + address.zipcode
    setCurrentHomeAddress(currentAddress)
  }

  const updateFeaturedImage = (image) => {
    setSelectedImage(image)
  }

  const goToGallery = () => {
    navigation.navigate('GallerStack', {homeImages:homeImages})
  }

  const loadingData = () => {
    return(
      <View>
        <Text>Loading Data</Text>
      </View>
    )
  }

  const loadedData = () => {
    return(
      <View style={styles.fullView}>
        <CarouselComponent 
          homeImages={homeImages} 
          selectedImage={selectedImage} 
          updateFeaturedImage={updateFeaturedImage}
          goToGallery={goToGallery}/>
        <SummaryComponent 
          currentHome={currentHome} 
          currentHomeAddress={currentHomeAddress}/>
        <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
      </View>
    )
  }
  

  return (
    <>
      {
        isLoading == false ? loadedData() : loadingData()
      }
    </>
  )
}

const styles = StyleSheet.create({
  fullView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 44
  },
  separaterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  separater: {
    width: '94%',
    height: 2,
    backgroundColor: 'grey'
  }
})

export default PropertyScreen