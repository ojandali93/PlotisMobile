import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'

const TaxHistoryComponents = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={[styles.col, styles.extraPadding]}>
        <FlatList 
          renderItem={({item}) => {
            return(
              <View style={styles.row}>
                <Text style={styles.text}>Year Built: </Text>
                <Text style={styles.text}>{home.yearBuilt}</Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

export default TaxHistoryComponents