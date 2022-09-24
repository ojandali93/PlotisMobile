import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'

const FullDescription = (props) => {
  const {
    description,
    updateDescriptionView
  } = props

  return (
    <>
      <Text style={styles.text}>
        {description}...
      </Text>
      <TouchableOpacity onPress={() => {updateDescriptionView()}}>
        <Text style={styles.showMore}>Show Less</Text>
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

export default FullDescription