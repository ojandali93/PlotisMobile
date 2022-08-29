import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Dimensions, Linking } from 'react-native';

const MapComponent = (props) => {
  const {

  } = props

  const [longitude, setLongitude] = useState(37.78825)
  const [latitude, setLatitude] = useState(-122.4324)

  const redirectToApp = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
    const latLng = `${latitude},${longitude}`
    const label = '1125 Soller Mission Viejo, CA 92692'
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
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            pinColor='blue'
            coordinate={{latitude: 37.78825,
                        longitude: -122.4324,}}/>
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