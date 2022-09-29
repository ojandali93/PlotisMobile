import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Dimensions } from 'react-native'
const loadingDeviceWidth = Dimensions.get('window').width

const PreapprovedComponent = (props) => {
  const {

  } = props
  
  return (
    <View style={[styles.preapprovedContainer, styles.shadowBox]}>
      <Text style={styles.label}>Get Pre-approved</Text>
      {
        loadingDeviceWidth == 390 ? <View style={styles.cscontainer65}>
                                      <Text style={styles.cs}>Coming Soon</Text>
                                    </View>
                                  : loadingDeviceWidth == 414 ? <View style={styles.cscontainer414}>
                                                                  <Text style={styles.cs}>Coming Soon</Text>
                                                                </View>
                                                              : loadingDeviceWidth == 1024 ?  <View style={styles.cscontainer1024}>
                                                                                                <Text style={styles.cs}>Coming Soon</Text>
                                                                                              </View>
                                                                                           :  loadingDeviceWidth == 428 ?  <View style={styles.cscontainer428}>
                                                                                                                              <Text style={styles.cs}>Coming Soon</Text>
                                                                                                                            </View>
                                                                                                                          :  <View style={styles.cscontainer}>
                                                                                                                              <Text style={styles.cs}>Coming Soon</Text>
                                                                                                                            </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  preapprovedContainer: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1560bd',
    paddingVertical: 16,
    borderRadius: 5
  },
  label: {
    fontSize: 17,
    fontWeight: '800',
    color: 'white'
  },
  shadowBox: {
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  cscontainer: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 260
  },
  cscontainer65: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 224
  },
  cscontainer414: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 244
  },
  cscontainer1024: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 810
  },
  cscontainer428: {
    position: 'absolute',
    padding: 4,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: -8,
    marginLeft: 50,
    top: 0,
    left: 270
  },
  cs: {
    color: 'white'
  }
})

export default PreapprovedComponent