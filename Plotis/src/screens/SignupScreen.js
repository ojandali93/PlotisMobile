import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from 'react-native-vector-icons'
import {Picker} from '@react-native-picker/picker';

import { db } from '../../firebase'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

const SignupScreen = () => {
  const navigation = useNavigation()
  const auth = getAuth()

  const deviceHeight = Dimensions.get('window').height-44
  const deviceWidth = Dimensions.get('window').width

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [investingExperience, setInvestingExperience] = useState('')
  const [numberOfProperties, setNumberOfProperties] = useState('')
  const [validForm, setValidForm] = useState(true)

  const [openInvestExp, setOpenInvestExp] = useState(false)
  const [openNumberProps, setOpenNumberProps] = useState(false)

  const goToLogin = () => {
    navigation.navigate('LoginScreen')
  }

  const updateLevelOfExperience = () => {
    if(openInvestExp == false){
      setOpenInvestExp(true)
    } else {
      setOpenInvestExp(false)
    }
  }

  const updateNumberOfProperties = () => {
    if(openNumberProps == false){
      setOpenNumberProps(true)
    } else {
      setOpenNumberProps(false)
    }
  }

  const createProfile = (user) => {
    const collectionRef = collection(db, 'Profiles')
    addDoc(collectionRef, {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "phone": phone,
      "location": location,
      "invExp": investingExperience,
      "numOfProp": numberOfProperties,
      "createdAt": serverTimestamp(),
      "userId": user.uid
    }).then((response) => {
      navigation.navigate('ProfileScreen')
    }).catch((error) => {
      console.error(error)
    })
  }

  const createAccount = () => {
    if(password == verify){
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
          const user = userCredentials.user 
          createProfile(user)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setValidForm(false)
    }
  }

  return (
    <View style={[styles.screen, {height: deviceHeight, width: deviceWidth}]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.image} source={require('../../src/assets/icon-full-white.png')}/>
          <View style={styles.nameAndTagContainer}>
            <View style={styles.nameAndTag}>
              <Text style={styles.name}>PLOTIS</Text>
            </View>
            <View style={styles.nameAndTag}>
              <Text style={styles.tag}>Find Your Next</Text>
              <Text style={styles.tag}>Investment Property</Text>
            </View>
          </View>
        </View>
        {
          validForm == true ? null :  <View style={styles.disclaimer}>
                                        <Text style={styles.disclaimerText}>Fill out the required fields below*</Text>
                                      </View>
        }
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>Fill out the required fields below*</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email: *</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={'Email'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password: *</Text>
            <TextInput 
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder={'Password'}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Verify Password: *</Text>
            <TextInput 
              value={verify}
              onChangeText={setVerify}
              style={styles.input}
              placeholder={'Verify Password'}
              secureTextEntry
            />
          </View>
          <View></View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name: *</Text>
            <TextInput 
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholder={'First name'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name: *</Text>
            <TextInput 
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholder={'Last Name'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone: </Text>
            <TextInput 
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              placeholder={'(111) 111-1111'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location: (City, State)</Text>
            <TextInput 
              value={location}
              onChangeText={setLocation}
              style={styles.input}
              placeholder={'Location'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => {updateLevelOfExperience()}}>
              <View style={styles.dropDownContainer}>
                <Text style={styles.label}>Level of experience: </Text>
                <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
              </View>
            </TouchableOpacity>
            {
              openInvestExp == false ? null : <Picker
                                              itemStyle={styles.pickerValues}
                                              selectedValue={investingExperience}
                                              onValueChange={(itemValue) =>
                                                setInvestingExperience(itemValue)
                                              }>
                                              <Picker.Item label="Just looking" value={'Just looking'} />
                                              <Picker.Item label="Getting started" value={"Getting started"} />
                                              <Picker.Item label="Signle properties" value={"Signle properties"}/>
                                              <Picker.Item label="Several properties" value={"Several properties"}/>
                                              <Picker.Item label="My main career" value={"My main career"}/>
                                            </Picker>
            }
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => {updateNumberOfProperties()}}>
              <View style={styles.dropDownContainer}>
                <Text style={styles.label}># of properties: </Text>
                <Feather style={styles.chevronDown} size={20} name='chevrons-down'/>
              </View>
            </TouchableOpacity>
            {
              openNumberProps == false ? null : <Picker
                                              itemStyle={styles.pickerValues}
                                              selectedValue={numberOfProperties}
                                              onValueChange={(itemValue, itemIndex) =>
                                                setNumberOfProperties(itemValue)
                                              }>
                                              <Picker.Item label="0" value={'0'} />
                                              <Picker.Item label="1-5" value={"1-5"} />
                                              <Picker.Item label="6-15" value={"6-15"}/>
                                              <Picker.Item label="16-30" value={"16-30"}/>
                                              <Picker.Item label="31+" value={"31+"}/>
                                            </Picker>
            }
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => {createAccount()}}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signinTag}>
          <Text style={styles.textDisclaim}>Already have an account?</Text>
          <TouchableOpacity onPress={() => {goToLogin()}}>
            <Text style={styles.redirect}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1c39bb'
  },
  container: {
    marginTop: 90,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    height: 75,
    width: 75,
    marginBottom: 16,
    marginRight: 16
  },
  name: {
    fontSize: 27,
    fontWeight: '800',
    color: 'white'
  },
  tag: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white'
  },
  disclaimer: {
    marginBottom: 16
  },  
  disclaimerText: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500'
  },
  form: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 4
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    marginBottom: 4
  },
  input: {
    widht: '100%',
    backgroundColor: 'white',
    fontSize: 17,
    padding: 4
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16
  },
  button: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 4
  },
  signinTag: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 6,
  },
  textDisclaim: {
    color: 'white'
  },
  redirect: {
    color: 'lightblue',
    paddingLeft: 4
  },
  dropDownContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6
  },
  chevronDown: {
    color: 'white'
  },
  pickerValues: {
    color: 'white'
  }
})

export default SignupScreen