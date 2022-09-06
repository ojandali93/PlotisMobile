import React from 'react'
import { View, Text } from 'react-native'

const FeedLabelComponents = (props) => {
  const {
    item
  } = props

  return (
    <View>
      <Text>{item.item.parameters.location}</Text>
      <Text>{item.item.parameters.bedsMin} | {item.item.parameters.bathsMin}</Text>
    </View>
  )
}

export default FeedLabelComponents