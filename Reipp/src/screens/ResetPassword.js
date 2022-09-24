import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { Dimensions } from 'react-native'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

const ResetPasword = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const deviceHeight = Dimensions.get('window').height-44
  const deviceWidth = Dimensions.get('window').width

  const [email, setEmail] = useState('')

  const submitPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.navigate('PasswordResetConfirmationScreen')
      })
      .catch((error) => {
        alert('Email not found!')
      })
  }


  return (
    <View style={[styles.screen, {height: deviceHeight, width: deviceWidth}]}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.tagline}>Reset Your Password</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Email</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={'Email'}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => {submitPasswordReset()}}>
              <View>
                <Text style={styles.buttonText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#1c39bb'
  },
  content: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8
  },
  tagline: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white'
  },
  directions: {
    fontSize: 17,
    color: 'white', 
    fontWeight: '500',
  },
  form: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  label: {
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    marginBottom: 4
  },
  inputContainer: {
    width: '100%',
    marginTop: 16
  },
  input: {
    widht: '100%',
    backgroundColor: 'white',
    fontSize: 17,
    padding: 4
  },
  forgotpassword: {
    fontSize: 14,
    color: 'white',
    marginTop: 6
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  button: {
    width: '45%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 17,
    paddingVertical: 4
  }
})

export default ResetPasword