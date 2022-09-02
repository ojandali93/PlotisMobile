import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { Dimensions } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const deviceHeight = Dimensions.get('window').height-44
  const deviceWidth = Dimensions.get('window').width

  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')

  const submitLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user 
        console.log(user.email)
        navigation.navigate('ProfileScreen')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const goToSignup = () => {
    navigation.navigate('SignupScreen')
  }

  return (
    <View style={[styles.screen, {height: deviceHeight, width: deviceWidth}]}>
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Image style={styles.image} source={require('../../src/assets/icon-full-white.png')}/>
          <Text style={styles.tagline}>Find Your Next</Text>
          <Text style={styles.tagline}>Investment Property</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={'Email'}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              value={password}
              onChangeText={setpassword}
              style={styles.input}
              placeholder={'Password'}
              secureTextEntry
            />
          </View>
          <Text style={styles.forgotpassword}>Forgot Password</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={() => {submitLogin()}}>
              <View>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {goToSignup()}}>
              <View>
                <Text style={styles.buttonText}>Signup</Text>
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
  image: {
    height: 80,
    width: 80,
    marginBottom: 16
  },
  content: {
    height: Dimensions.get('window').height,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 225,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
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

export default LoginScreen