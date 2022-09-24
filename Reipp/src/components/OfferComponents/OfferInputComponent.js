import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const OfferInputComponent = (props) => {
  const {
    contactNumber,
    offerAmount,
    typeOfOffer,
    preApproved,
    bestTime,
    viewedProperty,
    setContactNumber,
    setOfferAmount,
    setTypeOfOffer,
    setPreApproved,
    setBestTime,
    setViewedProperty,
    submitOffer
  } = props

  return (
    <View style={styles.container}>
      <View style={styles.groupV}>
        <Text style={styles.label}>Contact Number</Text>
        <TextInput 
          value={contactNumber}
          onChangeText={(value) => {setContactNumber(value)}}
          style={styles.fullInput}
          placeholder='(123)456-7890'
          keyboardType='numeric'
        />
      </View>
      <View style={styles.groupV}>
        <Text style={styles.label}>Offer Amount ($)</Text>
        <TextInput 
          value={offerAmount}
          onChangeText={(value) => {setOfferAmount(value)}}
          style={styles.fullInput}
          placeholder='500,000'
          keyboardType='numeric'
        />
      </View>
      <View style={styles.groupV}>
        <Text style={styles.label}>Type Of Offer</Text>
          {
            typeOfOffer == 'Cash' ? <View style={styles.options}>
                                      <TouchableOpacity onPress={() => {setTypeOfOffer('Cash')}} style={[styles.optionContainer50, styles.blue]}>
                                        <Text style={[styles.label, styles.white]}>Cash</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setTypeOfOffer('Loan')}} style={styles.optionContainer50}>
                                        <Text style={styles.label}>Loan</Text>
                                      </TouchableOpacity>
                                    </View>
                                  : <View style={styles.options}>
                                      <TouchableOpacity onPress={() => {setTypeOfOffer('Cash')}} style={styles.optionContainer50}>
                                        <Text style={styles.label}>Cash</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setTypeOfOffer('Loan')}} style={[styles.optionContainer50, styles.blue]}>
                                        <Text style={[styles.label, styles.white]}>Loan</Text>
                                      </TouchableOpacity>
                                    </View>
          }
      </View>
      <View style={styles.groupV}>
        <Text style={styles.label}>Are You Preapproved</Text>
        {
          preApproved == 'Yes' ? <View style={styles.options}>
                                  <TouchableOpacity onPress={() => {setPreApproved('Yes')}} style={[styles.optionContainer50, styles.blue]}>
                                    <Text style={[styles.label, styles.white]}>Yes</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {setPreApproved('No')}} style={styles.optionContainer50}>
                                    <Text style={styles.label}>No</Text>
                                  </TouchableOpacity>
                                </View>
                              : <View style={styles.options}>
                                  <TouchableOpacity onPress={() => {setPreApproved('Yes')}} style={styles.optionContainer50}>
                                    <Text style={styles.label}>Yes</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={() => {setPreApproved('No')}} style={[styles.optionContainer50, styles.blue]}>
                                    <Text style={[styles.label, styles.white]}>No</Text>
                                  </TouchableOpacity>
                                </View>
            }
      </View>
      <View style={styles.groupV}>
        <Text style={styles.label}>Best Time To Contact You</Text>
        {
          bestTime == 'Mornings' ?  <View style={styles.options}>
                                      <TouchableOpacity onPress={() => {setBestTime('Mornings')}} style={[styles.optionContainer33, styles.blue]}>
                                        <Text style={[styles.label, styles.white]}>Mornings</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setBestTime('Afternoons')}} style={styles.optionContainer33}>
                                        <Text style={styles.label}>Afternoons</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setBestTime('Evenings')}} style={styles.optionContainer33}>
                                        <Text style={styles.label}>Evenings</Text>
                                      </TouchableOpacity>
                                    </View>
                                  : bestTime == 'Afternoons' ?  <View style={styles.options}>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Mornings')}} style={styles.optionContainer33}>
                                                                    <Text style={styles.label}>Mornings</Text>
                                                                  </TouchableOpacity>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Afternoons')}} style={[styles.optionContainer33, styles.blue]}>
                                                                    <Text style={[styles.label, styles.white]}>Afternoons</Text>
                                                                  </TouchableOpacity>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Evenings')}} style={styles.optionContainer33}>
                                                                    <Text style={styles.label}>Evenings</Text>
                                                                  </TouchableOpacity>
                                                                </View>
                                                              : <View style={styles.options}>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Mornings')}} style={styles.optionContainer33}>
                                                                    <Text style={styles.label}>Mornings</Text>
                                                                  </TouchableOpacity>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Afternoons')}} style={styles.optionContainer33}>
                                                                    <Text style={styles.label}>Afternoons</Text>
                                                                  </TouchableOpacity>
                                                                  <TouchableOpacity onPress={() => {setBestTime('Evenings')}} style={[styles.optionContainer33, styles.blue]}>
                                                                    <Text style={[styles.label, styles.white]}>Evenings</Text>
                                                                  </TouchableOpacity>
                                                                </View>
        }
      </View>
      <View style={styles.groupV}>
        <Text style={styles.label}>Have You Viewed The Property</Text>
        {
          viewedProperty == 'Yes' ? <View style={styles.options}>
                                      <TouchableOpacity onPress={() => {setViewedProperty('Yes')}} style={[styles.optionContainer50, styles.blue]}>
                                        <Text style={[styles.label, styles.white]}>Yes</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setViewedProperty('No')}} style={styles.optionContainer50}>
                                        <Text style={styles.label}>No</Text>
                                      </TouchableOpacity>
                                    </View>
                                  : <View style={styles.options}>
                                      <TouchableOpacity onPress={() => {setViewedProperty('Yes')}} style={styles.optionContainer50}>
                                        <Text style={styles.label}>Yes</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setViewedProperty('No')}} style={[styles.optionContainer50, styles.blue]}>
                                        <Text style={[styles.label, styles.white]}>No</Text>
                                      </TouchableOpacity>
                                    </View>
        }
      </View>
      <TouchableOpacity onPress={() => {submitOffer()}} style={styles.submitContainer}>
        <Text style={styles.labelWhite}>Submit Offer</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 8
  },
  groupV: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 8
  },
  groupH: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  fullInput: {
    fontSize: 17,
    paddingVertical: 2,
    paddingLeft: 2,
    backgroundColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginTop: 6
  },
  options: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    marginTop: 8
  },
  optionContainer50: {
    width: '50%',
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  optionContainer33: {
    width: '33.33%',
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  submitContainer: {
    width: '100%',
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8
  },
  labelWhite: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white'
  },
  blue: {
    backgroundColor: 'blue'
  },
  white: {
    color: 'white'
  }
})

export default OfferInputComponent