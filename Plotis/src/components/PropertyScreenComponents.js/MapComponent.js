import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Dimensions, Linking } from 'react-native';

const MapComponent = (props) => {
  const {
    long,
    lat,
    currentHomeAddress
  } = props
3
  const [longitude, setLongitude] = useState(long)
  const [latitude, setLatitude] = useState(lat)

  const redirectToApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${latitude},${longitude}`
    const label = currentHomeAddress
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    })
    Linking.openURL(url)
  }

  return (
    <TouchableOpacity style={styles.mapContainer} onPress={() => {redirectToApp()}}>
      <View style={styles.container}>
        <MapView 
          scrollEnabled={false}
          zoomEnabled={false}
          zoomTapEnabled={false}
          style={styles.map} 
          initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            pinColor='blue'
            coordinate={{latitude: lat,
                        longitude: long,}}/>
        </MapView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    margin: 16,
    width: Dimensions.get('window').width - 32,
    height: Dimensions.get('window').width,
  },
});

export default MapComponent