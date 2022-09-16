import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import axios from 'axios'

import { extendedPropertOptions } from '../../../zillow'

import FeedTileComponent from './FeedTileComponent'

const FeedLabelComponents = (props) => {
  const {
    item
  } = props

  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    grabShownResutls(item.item.parameters)
  }, [])

  const grabShownResutls = (parameters) => {
    extendedPropertOptions.params = parameters
    axios.request(extendedPropertOptions)
      .then((response) => {
        setResults(response.data.props)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.head}>
              <Text style={styles.location}>{item.item.parameters.location}</Text>
              <Text style={styles.info}>({item.item.parameters.bedsMin} Beds | {item.item.parameters.bathsMin} Baths)</Text>
            </View>
            <View>
              <Text style={styles.remove}>Remove</Text>
            </View>
          </View>
          {
            loading == true ? <Text>Loading</Text> :  <View style={styles.content}>
                                                        <FlatList
                                                          horizontal
                                                          data={results}
                                                          keyExtractor={(item) => {item.zpid}}
                                                          style={styles.tileList}
                                                          renderItem={(item) => {
                                                            return(
                                                              <FeedTileComponent item={item.item}/>
                                                            )
                                                          }}
                                                        />
                                                      </View>
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  rowContainer: {
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-between'
  },
  head: {
    display: 'flex',
    flexDirection: 'row'
  },
  location: {
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8
  },
  info: {
    fontSize: 17,
    fontWeight: '400'
  },
  remove: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1c39bb'
  }
})

export default FeedLabelComponents