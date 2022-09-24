import React, { useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons'

const FullMapComponent = (props) => {
  const {
    currentHome
  } = props

  const navigation = useNavigation()

  const initialRegionLat = currentHome.latitude
  const initialRegionLong = currentHome.longitude

  const goBackToProperty = () => {
    navigation.goBack()
  }

  return (
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
          key={index}
          // title={marker.address}
          // description={markerDescription}
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude
          }}
        />
      </MapView>
      <View style={styles.xContainer}>
        <Feather style={styles.icon} size={28} name='x'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})

export default FullMapComponent