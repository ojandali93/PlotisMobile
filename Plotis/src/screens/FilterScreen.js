import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

import MultiSlider from '@ptomasroos/react-native-multi-slider'

import GridItemComponent from '../components/HomeComponents/GridItemComponent'
import BedBathCounterComponent from '../components/HomeComponents/BedBathCounterComponent'

import { sliderOptions, bedBathAmount, sqftSliderOptions } from '../../required'
import { homeTypeOptions1, numberOfColumns } from '../../required'
import { covertToDollarByGrand, covertToDollarByHundered } from '../../utilities'
import { ScrollView } from 'react-native-gesture-handler'

const FilterScreen = ({navigation, route}) => {
  const [selectedHomeTypes, setSelectedHomeTypes] = useState([])

  const [min, setMin] = useState(0)
  const [max, setMax] = useState(11000000)
  const [sliderValues, setSliderValues] = useState([min, max])

  const [sqftMin, setSqfttMin] = useState(0)
  const [sqftMax, setSqftMax] = useState(7000)
  const [sqftSliderValues, setSqftSliderValues] = useState([min, max])

  const [bedCount, setBedCount] = useState(0)
  const [bathCount, setBathCount] = useState(0)

  useEffect(() => {
    if (route.params?.appliedFilters) {
      console.log('found')
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
    }
  }, [route.params])

  const updateSelectedHomeTypes = (selected) => {
    let selectedHome = [...selectedHomeTypes]
    if(selectedHome.includes(selected)){
      let targetIndex = selectedHome.indexOf(selected)
      selectedHome.splice(targetIndex, 1)
      setSelectedHomeTypes(selectedHome)
    } else {
      setSelectedHomeTypes([...selectedHomeTypes, selected])
    }
  }

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
    setBathCount(filter.bathsMin)
    setMin(0)
    setMax(11000000)
    setSliderValues([min, max])
    setSqfttMin(0)
    setSqftMax(7000)
    setSqftSliderValues([sqftMin,sqftMax])
    setSelectedHomeTypes([])
  }

  const applyFilters = () => {
    const newFilter = {
      home_type:selectedHomeTypes,
      minPrice: min,
      maxPrice: max,
      bathsMin: bathCount,
      bedsMin: bedCount,
      sqftMin: sqftMin,
      sqftMax: sqftMax,
    }
    navigation.navigate('HomeScreen', {newFilter: newFilter})
  }

  return (
    <View style={styles.filterContainer}>
      <ScrollView style={styles.scrollContainer}>
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
          <FlatList 
            style={styles.homeTypeContainer}
            data={homeTypeOptions1}
            keyExtractor={(item) => item.key}
            numColumns={numberOfColumns}
            renderItem={(item) => {
              return(               
                <GridItemComponent 
                  item={item} 
                  updateSelectedHomeTypes={updateSelectedHomeTypes}
                  selectedHomeTypes={selectedHomeTypes}
                />
              )}}
          />
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
              <Text style={styles.text}>Price: {covertToDollarByGrand(min)} - {covertToDollarByGrand(max)}</Text>
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
              <Text style={styles.text}>Sqft: {covertToDollarByHundered(sqftMin)} - {covertToDollarByHundered(sqftMax)}</Text>
            </View>    
          </View>
        </View>
        <View style={styles.separater}></View>
        <TouchableOpacity onPress={() => {applyFilters()}}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 8
  },
  scrollContainer: {
    overflow: 'hidden',
    height: 748
  },
  header: {
    width: '100%',
    paddingBottom: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    justifyContent: 'center'
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
  }
})

export default FilterScreen