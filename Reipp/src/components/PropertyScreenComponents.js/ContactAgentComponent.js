import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { db } from '../../../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const ContactAgentComponent = (props) => {
  const {
    currentHome
  } = props

  console.log(currentHome.zpid)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [price, setPrice] = useState(Object.keys(currentHome).length > 0 ? currentHome.price : 0)
  const [mlsId, setMlsId] = useState(Object.keys(currentHome).length > 0 ? currentHome.price : 0)
  const [address, setAddress] = useState(Object.keys(currentHome).length > 0 ? currentHome.address.streetAddress 
                                                                                + ', ' + currentHome.address.city
                                                                                + ', ' + currentHome.address.state
                                                                                + ' ' + currentHome.address.zipcode
                                                                              : 0)
  

  const submitRequest = () => {
    const collectionRef = collection(db, 'ContactAgent')
    addDoc(collectionRef, {
      "firstName": firstName,
      "lastName": lastName,
      "email":email,
      "phone":phone,
      "message":message,
      "address":address,
      "price":price, 
      "mlsId":mlsId,
      "createdAd":serverTimestamp()
    }).then((response) => {
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setMessage('')
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <View style={styles.keyDetailsContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.label}>Connect</Text>
      </View>
      <View style={styles.agentContainer}>
        <Image style={styles.image} source={require('../../../src/assets/portrait.png')}/>
        <View style={styles.agentInfo}>
          <View style={styles.agentName}>
            <Text style={[styles.text, styles.mainText]}>Omar Jandali</Text>
            <Text style={styles.text}>|</Text>
            <Text style={styles.text}>DRE# 02151051</Text>
          </View>
          <View style={styles.brokerName}>
            <Text style={[styles.text, styles.mainText]}>Realty One Group</Text>
            <Text style={styles.text}>|</Text>
            <Text style={styles.text}>DRE# 0896421</Text>
          </View>
          <View style={styles.agentContact}>
            <Text style={styles.text}>(951) 534-3666</Text>
            <Text style={styles.text}>|</Text>
            <Text style={styles.text}>omarjandali@gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.disclaimer}>
        <Text style={styles.message}>Interested in this property or ask a question. Connect with an agent by filling out the form below.</Text>
      </View>
      <View style={styles.nameContainer}>
        <View style={styles.nameAndInputShort}>
          <Text>First Name</Text>
          <TextInput 
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.nameAndInputShort}>
          <Text>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <View style={styles.nameAndInput}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.nameAndInput}>
        <Text>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View style={styles.nameAndInput}>
        <Text>Message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          multiline={true}
        />
      </View>
      <TouchableOpacity style={styles.submitContainer} onPress={() => {submitRequest()}}>
        <View>
          <Text style={styles.submit}>Submit</Text>
        </View>
      </TouchableOpacity>
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
  agentContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 8,
    borderRadius: 5,
    overflow: 'hidden'
  },
  agentInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  agentName: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  brokerName: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  agentContact: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  text: {
    fontSize: 17,
    fontWeight: '400',
    marginRight: 4
  },
  mainText: {
    fontWeight: '600'
  },
  disclaimer: {
    width: '96%',
    marginLeft: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '400'
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginLeft: '2%',
    marginTop: 16
  },
  nameAndInputShort: {
    display: 'flex',
    width: '45%',
  },
  input: {
    width: '100%',
    backgroundColor: 'lightgrey',
    borderBottomColor: 'blac',
    borderBottomWidth: 1,
    marginTop: 8
  },
  nameAndInput: {
    width: '96%',
    marginLeft: '2%',
    marginTop: 8
  },
  submitContainer: {
    width: '96%',
    marginLeft: '2%',
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  submit: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 17,
    fontWeight: '600',
    backgroundColor: '#1560bd',
    color: 'white',
    borderRadius: 5,
    overflow: 'hidden'
  }
})

export default ContactAgentComponent