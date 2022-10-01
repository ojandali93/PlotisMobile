import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { Feather } from 'react-native-vector-icons'
import { Dimensions } from 'react-native'

import { getAuth } from "firebase/auth"
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { db } from '../../../firebase'

import { convertToDollars } from '../../../utilities'

let deviceWidth = Dimensions.get('window').width - 16
var aspectHeight = (deviceWidth / 1.78) + 1

const loadingDeviceWidth = Dimensions.get('window').width

const InvestmentPropertyTileComponent = (props) => {
  const {
    item
  } = props

  const address = item.property.address.streetAddress + ' ' +
                  item.property.address.city + ', ' + 
                  item.property.address.state + ' ' +
                  item.property.address.zipcode  


  const auth = getAuth()
  const navigation = useNavigation();


  const goToDetailsPage =(zpid) => {
    const collectionRef = collection(db, 'RecentViews')
    if(auth.currentUser){
      addDoc(collectionRef, {
        "item": item.property,
        "userId": auth.currentUser.uid,
        "createdAt": serverTimestamp()
      }).then((response) => {
      }).catch((error) => {
        console.error(error)
      })
    }
    navigation.navigate('PropertyInvestmentScreen', {zpid: zpid})
  }

  return (
    <>
      <TouchableOpacity onPress={() => {goToDetailsPage(item.property.zpid)}}>
        <View style={styles.tileContainer}>
          <View>
            <Image style={{height: aspectHeight, width: deviceWidth}} source={{uri: item.property.imgSrc}}/>
          </View>
          <View style={styles.hiBar}>
            <View style={styles.quickIcons}>
            </View>
          </View>
          {
            loadingDeviceWidth == 390 ? <View style={styles.lowBar65}>
                                          <View style={styles.transparentContainer}>
                                            <Text style={styles.transparentLabel}>{item.property.homeType}</Text>
                                          </View>
                                        </View>
                                      : loadingDeviceWidth == 414 ? <View style={styles.lowBar414}>
                                                                      <View style={styles.transparentContainer}>
                                                                        <Text style={styles.transparentLabel}>{item.property.homeType}</Text>
                                                                      </View>
                                                                    </View>
                                                                  : loadingDeviceWidth == 1024 ? <View style={styles.lowBar1024}>
                                                                                                  <View style={styles.transparentContainer}>
                                                                                                    <Text style={styles.transparentLabel}>{item.property.homeType}</Text>
                                                                                                  </View>
                                                                                                </View>
                                                                                              : <View style={styles.lowBar}>
                                                                                                  <View style={styles.transparentContainer}>
                                                                                                    <Text style={styles.transparentLabel}>{item.property.homeType}</Text>
                                                                                                  </View>
                                                                                                </View>
          }
          <View style={styles.contentContainer}>
            <View style={styles.contentRow}>
              <Text style={styles.price}>${convertToDollars(item.property.price)}</Text>
            </View>
            <View style={styles.contentRow}>
              <View>
                <Text style={styles.label}>{item.property.bedrooms} Beds | {item.property.bathrooms} Baths | {convertToDollars(item.property.livingArea)} Sqft.</Text>
              </View>
              <View>
                <Text style={styles.label}>{item.property.listingStatus}</Text>
              </View>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.label}>{address}</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.invRow}>
            <Text style={styles.text}>Monthly Revenue (Est.):</Text>
            <Text style={styles.text}>${convertToDollars(item.revenue)}</Text>
          </View>
          <View style={styles.invRow}>
            <Text style={styles.text}>Monthly Expenses (Est.):</Text>
            <Text style={styles.text}>${convertToDollars(item.expenses)}</Text>
          </View>
          <View style={styles.invRow}>
            <Text style={styles.text}>Cash On Cash Return:</Text>
            <Text style={styles.text}>${item.cashOnCashReturn}</Text>
          </View>
          <View style={styles.invRow}>
            <Text style={styles.text}>Return On Investment (1 Year):</Text>
            <Text style={styles.text}>{item.returnOnInvestment}%</Text>
          </View>
          <View style={styles.bottomBar}></View>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  tileContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 16,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  hiBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 8
  },
  lowBar: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 195
  },
  lowBar65: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 170
  },
  lowBar414: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 185
  },
  lowBar1024: {
    paddingHorizontal: 8,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'absolute',
    marginTop: 525
  },
  transparentContainer: {
    padding: 4,
    backgroundColor: 'black',
    opacity: .75,
    borderRadius: 3
  },
  transparentLabel: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    opacity: 1
  },
  quickIcons: {
    display: 'flex',
    flexDirection: 'row',
    padding: 4
  },
  iconContainer: {
    marginLeft: 8,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 50
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  price: {
    fontSize: 27,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  bottomBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#1c39bb'
  },
  separator: {
    width: '100%',
    height: 2,
    backgroundColor: 'black',
    marginBottom: 16
  },
  invRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 8,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1

  },
  text: {
    fontSize: 17,
    fontWeight: '500'
  },
})

export default InvestmentPropertyTileComponent