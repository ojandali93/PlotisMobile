import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { singlePropertyOptions, singlePropertyImages } from '../../zillow'

import CarouselComponent from '../components/PropertyScreenComponents.js/CarouselComponent';
import SummaryComponent from '../components/PropertyScreenComponents.js/SummaryComponent'
import QuickActions from '../components/PropertyScreenComponents.js/QuickActions';
import KeyDetailCompoent from '../components/PropertyScreenComponents.js/KeyDetailCompoent';
import DescriptionComponent from '../components/PropertyScreenComponents.js/DescriptionComponent';
import ExpensesComponents from '../components/PropertyScreenComponents.js/ExpensesComponents';
import RevenueComponent from '../components/PropertyScreenComponents.js/RevenueComponent';
import PreapprovedComponent from '../components/PropertyScreenComponents.js/PreapprovedComponent';
import InvestmentMetricsComponent from '../components/PropertyScreenComponents.js/InvestmentMetricsComponent';
import TaxAndPriceComponent from '../components/PropertyScreenComponents.js/TaxAndPriceComponent';
import MapComponent from '../components/PropertyScreenComponents.js/MapComponent';
import StartOfferComponent from '../components/PropertyScreenComponents.js/StartOfferComponent';
import ContactAgentComponent from '../components/PropertyScreenComponents.js/ContactAgentComponent';
import SchoolsComponent from '../components/PropertyScreenComponents.js/SchoolsComponent';

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
  const [isLoading, setIsLoading] = useState(true)
  const [taxHistory, setTaxHistory] = useState([])
  const [saleHistory, setSaleHistory] = useState([])
  const [long, setLong] = useState([])
  const [lat, setLat] = useState([])
  const [schools, setSchools] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios.request(singlePropertyOptions)
      .then((response) => {
        setCurrentHome(response.data)
        createHomeAddress(response.data.address)
        setSelectedImage(response.data.imgSrc)
        setSaleHistory(response.data.priceHistory)
        setTaxHistory(response.data.taxHistory)
        setLong(response.data.longitude)
        setLat(response.data.latitude)
        setSchools(response.data.schools)
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <CarouselComponent 
            homeImages={homeImages} 
            selectedImage={selectedImage} 
            updateFeaturedImage={updateFeaturedImage}
            goToGallery={goToGallery}/>
          <SummaryComponent 
            currentHome={currentHome} 
            currentHomeAddress={currentHomeAddress}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <QuickActions currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <KeyDetailCompoent currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <DescriptionComponent description={currentHome.description}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <ExpensesComponents currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <RevenueComponent currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <PreapprovedComponent />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <InvestmentMetricsComponent />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <TaxAndPriceComponent saleHistory={saleHistory} taxHistory={taxHistory.splice(0, 10)}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <MapComponent long={long} lat={lat} currentHomeAddress={currentHomeAddress}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <StartOfferComponent />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <SchoolsComponent schools={schools}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <ContactAgentComponent />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
        </ScrollView>
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
    width: '100%',
    height: 2,
    backgroundColor: 'lightgrey'
  }
})

export default PropertyScreen