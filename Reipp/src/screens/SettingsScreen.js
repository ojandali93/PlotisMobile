import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch, Linking } from 'react-native'
import { Feather,AntDesign, Ionicons, SimpleLineIcons} from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native'

import { db } from '../../firebase'
import { getAuth, signOut, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth"
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'

let deviceWidth = Dimensions.get('window').height - 200

const SettingsScreen = () => {
  const auth = getAuth()
  const navigation = useNavigation()

  const collectionRefProfile = collection(db, 'Profiles')

  const [user, setUser] = useState()
  const [profile, setProfile] = useState()

  const [editProfile, setEditProfile] = useState(false)
  const [editPasssword, setEditPassword] = useState(false)

  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [enableSaveSearch, setEnableSaveSearch] = useState(true)
  const [enableFavoritedHomes, setEnableFavoritedHomes] = useState(true)
  const [enableRecommendedHomes, setEnableRecommendedHomes] = useState(true)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(auth.currentUser){
      setUser(auth.currentUser)
      grabUserProfile()
    } else {
      navigation.navigate('LoginScreen')
    }
  }, [])

  useEffect(() => {
    profile == null ? null : setNewFirstName(profile.firstName)
    profile == null ? null : setNewLastName(profile.lastName)
    profile == null ? null : setNewEmail(profile.email)
  }, [profile])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(auth.currentUser === null){
        navigation.navigate('LoginStack')
      } else {
        console.log('logged in')
      }
    })
    return unsubscribe
  }, [navigation])

  const grabUserProfile = () => {
    const q = query(collectionRefProfile, where('userId', '==', auth.currentUser.uid))
    getDocs(q)
      .then((snapshot) => {
        let profiles = []
        snapshot.docs.forEach((doc) => {
          profiles.push({ ...doc.data(), id: doc.id })
        })
        setProfile(profiles[0])
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const signoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out')
        navigation.navigate('LoginScreen')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateSavedSearch = () => {
    if(enableSaveSearch == true){
      setEnableSaveSearch(false)
    } else {
      setEnableSaveSearch(true)
    }
  }

  const updateFavoritedHomes = () => {
    if(enableFavoritedHomes == true){
      setEnableFavoritedHomes(false)
    } else {
      setEnableFavoritedHomes(true)
    }
  }

  const updateRecommendedHomes = () => {
    if(enableRecommendedHomes == true){
      setEnableRecommendedHomes(false)
    } else {
      setEnableRecommendedHomes(true)
    }
  }

  const openPrivacyPolicy = () => {
    Linking.canOpenURL('https://app.termly.io/document/privacy-policy/a1c97cb3-5786-4b59-a584-26108067d61a').then(() => {
      Linking.openURL('https://app.termly.io/document/privacy-policy/a1c97cb3-5786-4b59-a584-26108067d61a');
    });
  }

  const openTermsOfService = () => {
    Linking.canOpenURL('https://app.termly.io/document/terms-of-use-for-saas/f5d82a9e-c54f-4685-a405-9bddd23d5317').then(() => {
      Linking.openURL('https://app.termly.io/document/terms-of-use-for-saas/f5d82a9e-c54f-4685-a405-9bddd23d5317');
    });
  }

  const openFAQ = () => {
    Linking.canOpenURL('https://rippeapp.com/faqs').then(() => {
      Linking.openURL('https://rippeapp.com/faqs');
    });
  }

  const openContact = () => {
    Linking.canOpenURL('https://rippeapp.com/contact').then(() => {
      Linking.openURL('https://rippeapp.com/contact');
    });
  }

  const goToAboutUs = () => {
    navigation.navigate('AboutUsScreen')
  }

  const resetPasword = () => {
    if(newPassword == verifyPassword){
      updatePassword(auth.currentUser, newPassword)
        .then((response) => {
          setEditPassword(false)
          alert('passwords was reset')
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      alert('passwords do not match')
    }
  }

  const saveProfile = () => {
    let credential = EmailAuthProvider.credential(user.email, confirmPassword)
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        updateEmail(auth.currentUser, newEmail.toString())
          .then(() => {
            console.log('updated email')
            setUser(auth.currentUser)
            updateProfile()
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        alert('Incorrect password')
      })
  }

  const updateProfile = () => {
    const docRef = doc(db, 'Profiles', profile.id)
    updateDoc(docRef, {
      firstName: newFirstName,
      lastName: newLastName,
      email: user.email
    }).then(() => {
      console.log('updatedUser')
      grabUserProfile()
      setEditProfile(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <ScrollView style={{height: deviceWidth}}>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Profile</Text>
          {
            editProfile == false ?  <TouchableOpacity onPress={() => {setEditProfile(true)}}>
                                      <Feather style={styles.chevronDown} size={20} name='edit-3'/>
                                    </TouchableOpacity>
                                  : <TouchableOpacity onPress={() => {saveProfile()}}>
                                      <Text style={styles.label8}>Save</Text>
                                    </TouchableOpacity>
          }
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>First Name</Text>
          <View style={styles.editRow}>
            {
              editProfile == true ? <TextInput 
                                      value={newFirstName}
                                      onChangeText={(value) => setNewFirstName(value)}
                                      style={styles.input}
                                    /> 
                                  : profile == null ? null : <Text style={styles.text}>{profile.firstName}</Text>
            }
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Last Name</Text>
          <View style={styles.editRow}>
            {
              editProfile == true ? <TextInput 
                                      value={newLastName}
                                      onChangeText={(value) => setNewLastName(value)}
                                      style={styles.input}
                                    /> 
                                  : profile == null ? null : <Text style={styles.text}>{profile.lastName}</Text>
            }
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Email</Text>
          <View style={styles.editRow}>
            {
              editProfile == true ? <TextInput 
                                      value={newEmail}
                                      onChangeText={(value) => setNewEmail(value)}
                                      style={styles.input}
                                    /> 
                                  : user == null ? null : <Text style={styles.text}>{user.email}</Text>
            }
          </View>
        </View>
        {
          editProfile == true ? <View style={styles.row}>
                                    <Text style={styles.text}>Confirm Password</Text>
                                    <View style={styles.editRow}>
                                      <TextInput 
                                        value={confirmPassword}
                                        onChangeText={(value) => setConfirmPassword(value)}
                                        style={styles.input}
                                        secureTextEntry
                                      />
                                  </View>
                                </View>
                              : null
        }
        {
            editPasssword == true ? <View style={styles.row}>
                                      <TouchableOpacity onPress={() => {resetPasword()}}>
                                        <Text style={[styles.text, styles.blue]}>Save</Text>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => {setEditPassword(false)}}>
                                        <Text style={[styles.text, styles.blue]}>Cancel</Text>
                                      </TouchableOpacity>
                                    </View>
                                  : <TouchableOpacity style={styles.row} onPress={() => {setEditPassword(true)}}>
                                      <Text style={[styles.text, styles.blue]}>Reset Password</Text>
                                    </TouchableOpacity>
          }
        {
          editPasssword == false ? null : <><View style={styles.row}>
                                          <Text style={styles.text}>New Password</Text>
                                          <TextInput 
                                            value={newPassword}
                                            onChangeText={(value) => setNewPassword(value)}
                                            style={styles.input}
                                            secureTextEntry
                                          /> 
                                        </View>
                                        <View style={styles.row}>
                                          <Text style={styles.text}>Verify Password</Text>
                                          <TextInput 
                                            value={verifyPassword}
                                            onChangeText={(value) => setVerifyPassword(value)}
                                            style={styles.input}
                                            secureTextEntry
                                          /> 
                                        </View></>
        }
        <View style={styles.row}>
          <Text style={[styles.text, styles.red]}>Delete Account</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Notifications</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Saved Searches</Text>
          <Switch value={enableSaveSearch} onChange={() => {updateSavedSearch()}}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Favorited Homes</Text>
          <Switch value={enableFavoritedHomes} onChange={() => {updateFavoritedHomes()}}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Recommended Homes</Text>
          <Switch value={enableRecommendedHomes} onChange={() => {updateRecommendedHomes()}}/>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Help & Feedback</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => {openFAQ()}}>
          <Text style={styles.text}>FAQ's</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => {openContact()}}>
          <Text style={styles.text}>Cunstomer Support</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.text}>Rate This App</Text>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>About Rippe</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => {openPrivacyPolicy()}}>
          <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => {openTermsOfService()}}>
          <Text style={styles.text}>Terms Of Service</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.text}>Open Source Licenses</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => {goToAboutUs()}}>
          <Text style={styles.text}>About Us</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Text style={styles.text}>Version Number: 1.0.1</Text>
        </View>
        <TouchableOpacity style={styles.row} onPress={() => {signoutUser()}}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    paddingHorizontal: 8
  },
  rowNB: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8
  },
  editRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
  },
  chevronDown: {
    color: '#1c39bb',
    marginHorizontal: 8
  },
  logout: {
    fontSize: 17,
    color: '#1c39bb'
  },
  text: {
    fontSize: 17,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 16
  },
  sectionHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingVertical: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    backgroundColor: 'lightgrey'
  },
  label: {
    fontSize: 17,
    fontWeight: '500'
  },
  label8: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 8,
    color: 'blue'
  },
  rowsb: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowLabel: {
    display: 'flex',
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
  },
  cs: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginRight: 8,
    backgroundColor: 'green',
    borderRadius: 5,
    overflow: 'hidden',
    color: 'white'
  },
  red: {
    color: 'red'
  },
  input: {
    width: 200,
    paddingVertical: 4,
    paddingLeft: 4,
    backgroundColor: 'lightgrey',
  },
  submit: {
    marginRight: 8,
    fontSize: 17,
    color: 'blue'
  },
  blue: {
    color: 'blue'
  }
})

export default SettingsScreen