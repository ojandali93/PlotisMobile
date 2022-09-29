import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
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

import { db } from '../../firebase'
import { addDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore'

const loadingDeviceHeight = Dimensions.get('window').height-44
const loadingDeviceWidth = Dimensions.get('window').width

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

  const [totalExpWithoutMortgage, setTotalExpWithoutMortgage] = useState(0)
  const [mortgatePandI, setMortgagePandI] = useState(0)
  const [totalDownPayment, setTotalDownPayment] = useState((currentHome.price * .8).toFixed(2))
  const [monthlyNOI, setMonthlyNOI] = useState(0)
  const [yearlyNOI, setYearlyNOI] = useState(0)
  const [capRate, setCapRate] = useState(0)
  const [monthlyCashFlow, setMonthlyCashFlow] = useState(0)
  const [yearlyCashFlow, setYearlyCashFlow] = useState(0)
  const [cashOnCashReturn, setCashOnCashReturn] = useState(0)
  const [year1ROI, setYear1ROI] = useState(0)
  const [monthlyRevenue, setMonthlyRevenue] = useState(0)
  const [yearlyRevenue, setYearlyRevenue] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)
  const [yearlyExpenses, setYearlyExpenses] = useState(0)

  

  useEffect(() => {
    setYearlyRevenue(monthlyRevenue * 12)
    setMonthlyNOI(monthlyRevenue - totalExpWithoutMortgage)
  }, [monthlyRevenue])

  useEffect(() => {
    setYearlyExpenses(monthlyExpenses * 12)
  }, [monthlyExpenses])

  useEffect(() => {
    setMonthlyNOI(monthlyRevenue - totalExpWithoutMortgage)
  }, [totalExpWithoutMortgage])

  useEffect(() => {
    setYearlyNOI(monthlyNOI * 12)
    setMonthlyCashFlow(monthlyNOI - mortgatePandI)
  }, [monthlyNOI])

  useEffect(() => {
    setCapRate(((yearlyNOI/currentHome.price) * 100).toFixed(2))
    setYear1ROI(((yearlyNOI / totalDownPayment) * 100).toFixed(2))
  }, [yearlyNOI])

  useEffect(() => {
    setMonthlyCashFlow(parseInt(monthlyNOI) - parseInt(mortgatePandI))
  }, [mortgatePandI])

  useEffect(() => {
    setYearlyCashFlow(monthlyCashFlow * 12)
  }, [monthlyCashFlow])

  useEffect(() => {
    setCashOnCashReturn(((yearlyCashFlow / totalDownPayment) * 100).toFixed(2))
  }, [yearlyCashFlow])

  useEffect(() => {
    setCashOnCashReturn(((yearlyCashFlow / totalDownPayment) * 100).toFixed(2))
    setYear1ROI(((yearlyNOI / totalDownPayment) * 100).toFixed(2))
  }, [totalDownPayment])

  useEffect(() => {
    checkInvestmentStatus()
  }, [monthlyCashFlow, capRate, cashOnCashReturn, year1ROI])

  useEffect(() => {
    setIsLoading(true)
    axios.request(singlePropertyOptions)
      .then((response) => {
        setCurrentHome(response.data)
        createHomeAddress(response.data.address)
        setSelectedImage(response.data.imgSrc)
        if(Object.keys(response.data.priceHistory).length > 0){
          setSaleHistory(response.data.priceHistory.splice(0, 10))
        } else {
          setSaleHistory([])
        }
        if(Object.keys(response.data.taxHistory).length > 0){
          setTaxHistory(response.data.taxHistory.splice(0, 10))
        } else {
          setTaxHistory([])
        }
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

  const checkInvestmentStatus = () => {
    monthlyCashFlow > 0 ? yearlyCashFlow > 0 ? capRate > 0 ? cashOnCashReturn > 0 ? year1ROI > 0 ? storeInvestment()
                                                                                                 : null 
                                                                                  : null
                                                           : null
                                             : null
                        : null
  }

  const storeInvestment = () => {
    const collectionRef = collection(db, 'InvestmentProperties')
    const q = query(collectionRef, where('zpid', '==', currentHome.zpid))
    onSnapshot(q, (snapshot) => {
      let investments = []
      snapshot.docs.forEach((doc) => {
        investments.push({ ...doc.data(), id: doc.id })
      })
      investments.length > 0 ? null : addPropertyToList()
    })
  }

  const addPropertyToList = () => {
    const collectionRef = collection(db, 'InvestmentProperties')
    addDoc(collectionRef, {
      "property": currentHome,
      "createdAt": serverTimestamp(),
      "expenses": monthlyExpenses,
      "revenue": monthlyRevenue,
      "cashflow": monthlyCashFlow,
      "capRate": capRate,
      "cashOnCashReturn": cashOnCashReturn,
      "returnOnInvestment": year1ROI,
      "zpid": currentHome.zpid
    }).then((response) => {
    }).catch((error) => {
      console.error(error)
    })
  }
  

  const loadingData = () => {
    return(
      <View style={[styles.screen, {height: loadingDeviceHeight, width: loadingDeviceWidth}]}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.tagline}>Loading Details...</Text>
          </View>
        </View>
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
          <ExpensesComponents 
            currentHome={currentHome}
            monthlyExpenses={monthlyExpenses}
            setMonthlyExpenses={setMonthlyExpenses}
            setTotalExpWithoutMortgage={setTotalExpWithoutMortgage}
            setMortgagePandI={setMortgagePandI}
            setTotalDownPayment={setTotalDownPayment}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <RevenueComponent 
            currentHome={currentHome}
            monthlyRevenue={monthlyRevenue}
            setMonthlyRevenue={setMonthlyRevenue}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <PreapprovedComponent />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <InvestmentMetricsComponent 
            currentHome={currentHome}
            monthlyRevenue={monthlyRevenue}
            yearlyRevenue={yearlyRevenue}
            monthlyExpenses={monthlyExpenses}
            yearlyExpenses={yearlyExpenses}
            monthlyNOI={monthlyNOI}
            yearlyNOI={yearlyNOI}
            capRate={capRate}
            monthlyCashFlow={monthlyCashFlow}
            yearlyCashFlow={yearlyCashFlow}
            cashOnCashReturn={cashOnCashReturn}
            year1ROI={year1ROI}
          />
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <TaxAndPriceComponent saleHistory={saleHistory} taxHistory={taxHistory}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <MapComponent long={long} lat={lat} currentHomeAddress={currentHomeAddress} currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <StartOfferComponent currentHome={currentHome}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <SchoolsComponent schools={schools}/>
          <View style={styles.separaterContainer}><View style={styles.separater}></View></View>
          <ContactAgentComponent  currentHome={currentHome}/>
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
    marginTop: 54
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
  },
  content: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 225,
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  tagline: {
    fontSize: 22,
    fontWeight: '800'
  },
})

export default PropertyScreen