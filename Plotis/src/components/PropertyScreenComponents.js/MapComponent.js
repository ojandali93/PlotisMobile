import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableOpacity, View, Dimensions, Linking, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'react-native-vector-icons'

import FullMapComponent from './FullMapComponent';

const MapComponent = (props) => {
  const {
    long,
    lat,
    currentHomeAddress,
    currentHome
  } = props

  const navigation = useNavigation()

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

  const openMap = () => {
    navigation.navigate('FullMapScreen', {lat: lat, long: long})
  }

  return (
    <>
      <View style={styles.container}>
        <MapView 
          scrollEnabled={false}
          zoomEnabled={false}
          zoomTapEnabled={false}
          rotateEnabled={false}
          zoomControlEnabled={false}
          onPress={() => {openMap()}}
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
    </>
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
  expandContainer: {
    position: 'absolute',
    top: 28,
    left: 28,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    opacity: .7
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 8
  }
});

export default MapComponent