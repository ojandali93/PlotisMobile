import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const SchoolsComponent = (props) => {
  const {
    schools
  } = props

  console.log(schools)

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Schools</Text>
      </View>

      <FlatList 
        data={schools}
        keyExtractor={item => item.name}
        style={styles.schoolContainer}
        renderItem={({item}) => {
          return(
            <View style={styles.contentRow}>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>{item.rating}/10</Text>
              </View>
              <View style={styles.schoolInformationContainer}>
                <View style={styles.rows}>
                  <View style={styles.row}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.distance}</Text>
                  </View>
                  <View style={styles.gradeRow}>
                    <View style={styles.row}>
                      <Text style={styles.textLevel}>{item.level} School</Text>
                      <Text style={styles.text}>{item.grades}</Text>
                    </View>
                    <Text style={styles.text}>{item.type}</Text>
                  </View>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingHorizontal: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  ratingContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#1560bd',
    marginRight: 8
  },
  rating: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white'
  },
  schoolInformationContainer: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradeRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8
  },
  text: {
    fontSize: 17,
    fontWeight: '500'
  },
  textLevel: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 8
  }
})

export default SchoolsComponent