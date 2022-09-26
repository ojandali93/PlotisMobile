import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import BlurbComponent from './BlurbComponent'
import FullDescription from './FullDescription'

const DescriptionComponent = (props) => {
  const {
    description
  } = props

  const fullDescription = description
  const blurb = fullDescription.substring(0, 250)

  const [loadFullString, setLoadFullString] = useState(false)

  const updateDescriptionView = () => {
    if(loadFullString == false){
      setLoadFullString(true)
    } else {
      setLoadFullString(false)
    }
  }
  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Description</Text>
      </View>
      <View>
        {
          loadFullString == false ? <BlurbComponent 
                                      blurb={blurb} 
                                      updateDescriptionView={updateDescriptionView}/> 
                                  : <FullDescription 
                                      description={fullDescription}
                                      updateDescriptionView={updateDescriptionView}
                                  />
                                                                                        
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  keyDetailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 24,
    paddingLeft: 8,
    justifyContent: 'space-between'
  },
  headerContainer: {
    width: '100%',
    marginBottom: 16
  },
  label: {
    fontSize: 22,
    fontWeight: '700'
  },
})

export default DescriptionComponent