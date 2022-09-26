import React from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, Image, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MapViewComponent = (props) => {
  const {
    results
  } = props

  const initialRegionLat = results[0]['latitude']
  const initialRegionLong = results[0]['longitude']

  const navigation = useNavigation();

  const updatedSelectedProperty = (item) => {
    navigation.navigate('PropertyScreen', {zpid: item})
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
          {
            results.map((marker, index) => {
              let splitAddress = marker.address.split(', ')
              let markerAddress1 = splitAddress[0]
              let markerAddress2 = splitAddress[1] + ' ' + splitAddress[2]
              let markerDescription = marker.bedrooms.toString() + ' Beds | ' + marker.bathrooms.toString() + ' Baths | ' + marker.livingArea.toString() + ' Sqft.'
              let deviceWidth = 200
              let aspectHeight = (deviceWidth / 1.78) + 1
              return(
                <Marker
                  pinColor='blue'
                  key={index}
                  // title={marker.address}
                  // description={markerDescription}
                  coordinate={{
                    longitude: marker.longitude,
                    latitude: marker.latitude
                  }}
                >
                  <Callout
                    onPress={() => {updatedSelectedProperty(marker.zpid)}}
                  >
                    <View style={styles.container}>
                      <Image style={{height: aspectHeight, width: deviceWidth}} source={{uri: marker.imgSrc}}/>
                      <Text style={styles.price}>
                        ${marker.price}
                      </Text>
                      <Text>
                        {markerDescription}
                      </Text>
                      <Text>
                        {markerAddress1}
                      </Text>
                      <Text>
                        {markerAddress2}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              )
            })
          }
          {/* <Marker
            pinColor='blue'
            coordinate={{latitude: lat,
                        longitude: long,}}/> */}
        </MapView>
      </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  },
  price: {
    fontSize: 17,
    fontWeight: '600'
  }
})

export default MapViewComponent