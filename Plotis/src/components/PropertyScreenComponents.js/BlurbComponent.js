import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'

const BlurbComponent = (props) => {
  const {
    blurb,
    updateDescriptionView
  } = props
  return (
    <>
      <Text style={styles.text}>
        {blurb} ...
      </Text>
      <TouchableOpacity onPress={() => {updateDescriptionView()}}>
        <Text style={styles.showMore}>Show More</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17
  },
  showMore: {
    fontSize: 17,
    color: '#1c39bb',
    paddingVertical: 8
  }
})

module.exports = BlurbComponent
