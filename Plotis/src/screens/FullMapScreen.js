import React, { useEffect, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Image, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons'

const FullMapScreen = ({route}) => {
  console.log(route.params.lat)
  console.log(route.params.long)
  const navigation = useNavigation()
  const [selectedHome, setSelectedHome] = useState({})
  const [initialRegionLat, setInitialRegionLat] = useState(route.params.lat)
  const [initialRegionLong, setInitialRegionLong] = useState(route.params.long)

  const goBackToProperty = () => {
    navigation.goBack()
  }

  return (
    <>
      <View style={styles.container}>
        <MapView 
          scrollEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          style={styles.map} 
          initialRegion={{
            latitude: initialRegionLat,
            longitude: initialRegionLong,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          <Marker
            pinColor='blue'
            key={selectedHome.zpid}
            coordinate={{
              longitude: initialRegionLong,
              latitude: initialRegionLat
            }}
          />
        </MapView>
        <TouchableOpacity style={styles.xContainer} onPress={() => {goBackToProperty()}}>
          <Feather style={styles.icon} size={28} name='x'/>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  },
  xContainer: {
    position: 'absolute',
    left: 16,
    top: 50,
    padding: 4,
    backgroundColor: 'white',
    opacity: .75,
    borderRadius: 100
  },
  ontent: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 225,
    // justifyContent: 'center',
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

export default FullMapScreen