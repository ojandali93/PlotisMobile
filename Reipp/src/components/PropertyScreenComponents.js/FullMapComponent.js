import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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
          coordinate={{
            longitude: marker.longitude,
            latitude: marker.latitude
          }}
        />
      </MapView>
      <TouchableOpacity style={styles.xContainer} onPress={() => {goBackToProperty()}}>
        <Feather style={styles.icon} size={28} name='x'/>
      </TouchableOpacity>
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