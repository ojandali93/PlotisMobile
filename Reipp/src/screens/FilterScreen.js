import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Switch } from 'react-native'

import MultiSlider from '@ptomasroos/react-native-multi-slider'

import BedBathCounterComponent from '../components/HomeComponents/BedBathCounterComponent'

import { sliderOptions, bedBathAmount, sqftSliderOptions } from '../../required'
import { convertPriceOptions, convertSqftOptions } from '../../utilities'
import { ScrollView } from 'react-native-gesture-handler'

import { Dimensions } from 'react-native'
const loadingDeviceHeight = Dimensions.get('window').height - 200
const loadingDeviceWidth = Dimensions.get('window').width

const FilterScreen = ({navigation, route}) => {
  const [selectedHomeTypes, setSelectedHomeTypes] = useState([])

  const [houseFilter, setHouseFilter] = useState(false)
  const [condosFilter, setCondosFilter] = useState(false)
  const [landLotFilter, setlandLotFilter] = useState(false)
  const [multifamilyFilter, setMultifamilyFilter] = useState(false)
  const [manufacturedFilter, setManufacturedFilter] = useState(false)
  const [townhouseFilter, setTownhouseFilter] = useState(false)
  const [apartmentFilter, setApartmentFilter] = useState(false)

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(11000000)
  const [sliderValues, setSliderValues] = useState([min, max])

  const [sqftMin, setSqfttMin] = useState(0)
  const [sqftMax, setSqftMax] = useState(7000)
  const [sqftSliderValues, setSqftSliderValues] = useState([min, max])

  const [bedCount, setBedCount] = useState(0)
  const [bathCount, setBathCount] = useState(0)

  const [currentFilters, setCurrentFilters] = useState({})

  useEffect(() => {
    if (route.params?.appliedFilters) {
      let filter = route.params.appliedFilters
      setBedCount(filter.bedsMin)
      setBathCount(filter.bathsMin)
      setMin(filter.minPrice)
      setMax(filter.maxPrice)
      setSliderValues([filter.min, filter.max])
      setSqfttMin(filter.sqftMin)
      setSqftMax(filter.sqftMax)
      setSqftSliderValues([filter.sqftMin, filter.sqftMax])
      setSelectedHomeTypes(filter.home_type)
      updateSelectedHomeTypes()
    }
  }, [route.params])

  useEffect(() => {
    addHomeType('Houses')
    setHouseFilter(true)
  }, [])

  const updateSliderValues = (value) => {
    setMin(value[0])
    setMax(value[1])
    setSliderValues([min, max])
  }

  const updateSqftSliderValues = (value) => {
    setSqfttMin(value[0])
    setSqftMax(value[1])
    setSqftSliderValues([sqftMin, sqftMax])
  }

  const updateBedCount = (value) => {
    setBedCount(value)
  }

  const updateBathCount = (value) => {
    setBathCount(value)
  }

  const resetFilter = () => {
    setBedCount(0)
    setBathCount(0)
    setMin(0)
    setMax(11000000)
    setSliderValues([min, max])
    setSqfttMin(0)
    setSqftMax(7000)
    setSqftSliderValues([sqftMin,sqftMax])
    setSelectedHomeTypes(['Houses'])
    setHouseFilter(true)
    setCondosFilter(false)
    setlandLotFilter(false)
    setMultifamilyFilter(false)
    setManufacturedFilter(false)
    setTownhouseFilter(false)
    setApartmentFilter(false)
  }

  const applyFilters = () => {
    const newFilter = {
      home_type: selectedHomeTypes,
      minPrice: min,
      maxPrice: max,
      bathsMin: bathCount,
      bedsMin: bedCount,
      sqftMin: sqftMin,
      sqftMax: sqftMax,
    }
    setCurrentFilters(newFilter)
  }
  
  useEffect(() => {
    if(Object.keys(currentFilters).length === 0){

    } else {
      console.log('passed parameters', currentFilters)
      navigation.navigate('HomeScreen', {appliedFilters: currentFilters})
    }
  }, [currentFilters])

  const addHomeType = (selected) => {
    let selectedHome = selectedHomeTypes
    setSelectedHomeTypes([...selectedHome, selected])
  }

  const removeHomeType = (selected) => {
    let selectedHome = selectedHomeTypes
    let target = selectedHome.indexOf(selected)
    selectedHome.splice(target, 1)
    setSelectedHomeTypes([...selectedHome])
  }

  const updateHouseFilter = () => {
    if(houseFilter == true){
      removeHomeType()
      setHouseFilter(false)
    } else {
      addHomeType('Houses')
      setHouseFilter(true)
    }
  }

  const updateCondosFilter = () => {
    if(condosFilter == true){
      removeHomeType('Condos')
      setCondosFilter(false)
    } else {
      addHomeType('Condos')
      setCondosFilter(true)
    }
  }

  const updateLandLotFilter = () => {
    if(landLotFilter == true){
      removeHomeType('LotsLand')
      setlandLotFilter(false)
    } else {
      addHomeType('LotsLand')
      setlandLotFilter(true)
    }
  }

  const updateMultifamilyFilter = () => {
    if(multifamilyFilter == true){
      removeHomeType('Multi-family')
      setMultifamilyFilter(false)
    } else {
      addHomeType('Multi-family')
      setMultifamilyFilter(true)
    }
  }

  const updateManufacturedFilter = () => {
    if(manufacturedFilter == true){3
      removeHomeType('Manufactured')
      setManufacturedFilter(false)
    } else {
      addHomeType('Manufactured')
      setManufacturedFilter(true)
    }
  }

  const updateTownhouseFilter = () => {
    if(townhouseFilter == true){
      removeHomeType('Townhomes')
      setTownhouseFilter(false)
    } else {
      addHomeType('Townhomes')
      setTownhouseFilter(true)
    }
  }

  const updateApartmentFilter = () => {
    if(apartmentFilter == true){
      removeHomeType('Apartments')
      setApartmentFilter(false)
    } else {
      addHomeType('Apartments')
      setApartmentFilter(true)
    }
  }

  return (
    <View style={styles.filterContainer}>
      <ScrollView style={[styles.scrollContainer, {height: loadingDeviceHeight}]}>
        <View style={styles.header}>
          <Text style={styles.label}>
            Filter
          </Text>
          <TouchableOpacity onPress={() => {resetFilter()}}>
            <Text style={[styles.label, styles.blueText]}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>
              Property Types
            </Text>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>House</Text>
            <Switch value={houseFilter}  onChange={() => {updateHouseFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Condos</Text>
            <Switch value={condosFilter}  onChange={() => {updateCondosFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Land / Lot</Text>
            <Switch value={landLotFilter}  onChange={() => {updateLandLotFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Multi-family</Text>
            <Switch value={multifamilyFilter}  onChange={() => {updateMultifamilyFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Manufactured</Text>
            <Switch value={manufacturedFilter}  onChange={() => {updateManufacturedFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Townhomes</Text>
            <Switch value={townhouseFilter}  onChange={() => {updateTownhouseFilter()}}/>
          </View>
          <View style={styles.rowSelecter}>
            <Text style={styles.text}>Apartments</Text>
            <Switch value={apartmentFilter}  onChange={() => {updateApartmentFilter()}}/>
          </View>
        </View>
        <View style={styles.separater}></View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>
              Price
            </Text>
          </View>
          <View style={styles.slider}>
            <MultiSlider 
              values={sliderValues}
              optionsArray={sliderOptions}
              min={min}
              max={max}
              step={10}
              enabledTwo={true}
              enabledOne={true}
              sliderLength={350}
              onValuesChange={(value) => {updateSliderValues(value)}}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.priceDetails}>
              <Text style={styles.text}>Price: {convertPriceOptions(min)} - {convertPriceOptions(max)}</Text>
            </View>    
          </View>
        </View>
        <View style={styles.separaterBlank}></View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>
              Beds
            </Text>
          </View>
          <View style={styles.bedContainer}>
            <FlatList 
              horizontal
              data={bedBathAmount}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => {
                return(
                  <BedBathCounterComponent item={item} count={bedCount} updateBedCount={updateBedCount}/>
                )
              }}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>
              Baths
            </Text>
          </View>
          <View style={styles.bedContainer}>
            <FlatList 
              horizontal
              data={bedBathAmount}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => {
                return(
                  <BedBathCounterComponent item={item} count={bathCount} updateBedCount={updateBathCount}/>
                )
              }}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>
              Square Foot
            </Text>
          </View>
          <View style={styles.slider}>
            <MultiSlider 
              values={sqftSliderValues}
              optionsArray={sqftSliderOptions}
              min={sqftMin}
              max={sqftMax}
              step={10}
              enabledTwo={true}
              enabledOne={true}
              sliderLength={350}
              onValuesChange={(value) => {updateSqftSliderValues(value)}}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.priceDetails}>
              <Text style={styles.text}>Sqft: {convertSqftOptions(sqftMin)} - {convertSqftOptions(sqftMax)}</Text>
            </View>    
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => {applyFilters()}}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    marginTop: 54,
  },
  scrollContainer: {
    overflow: 'hidden',
    paddingBottom: 8,
  },
  header: {
    width: '100%',
    paddingBottom: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8
  },
  separater: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginTop: 8
  },
  separaterBlank: {
    width: '100%',
    height:16
  },
  sectionHeader: {
    width: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  label: { 
    fontSize: 17,
    fontWeight: '500'
  },
  slider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8
  },
  priceDetails: {
    backgroundColor: 'lightgrey',
    width: 190,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
    paddingVertical: 12
  },
  text: {
    fontSize: 17
  },
  bedContainer: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 5,
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center'
  },
  itemContainer: {
    padding: 16,
    backgroundColor: 'lightgrey',
    borderRadius:1,
    borderColor:'grey',
    borderWidth:1
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#273be2',
    marginBottom: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500'
  },
  blueText: {
    color: '#273be2'
  },
  rowSelecter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  }
})

export default FilterScreen