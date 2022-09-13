import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LogBox } from 'react-native';

import { Feather } from 'react-native-vector-icons'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import ContactAgentScreen from './src/screens/ContactAgentScreen';
import DetailScreen from './src/screens/DetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import FeedScreen from './src/screens/FeedScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import PreApprovalScreen from './src/screens/PreApprovalScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PropertyScreen from './src/screens/PropertyScreen';
import RegisterProfileScreen from './src/screens/RegisterProfileScreen';
import SellHomeScreen from './src/screens/SellHomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import StartOfferScreen from './src/screens/StartOfferScreen';
import FilterScreen from './src/screens/FilterScreen'
import RecentViewScreen from './src/screens/RecentViewScreen'
import OfferInformationScreen from './src/screens/OfferInformationScreen'

// console.disableYellowBox = true;
LogBox.ignoreAllLogs(true)

const TabNav = createBottomTabNavigator();
const StackNav = createStackNavigator();

const HomeStack = () => {
  return (
    <StackNav.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="HomeScreen" component={MainScreen}/>
      <StackNav.Screen name="PropertyScreen" component={PropertyScreen} />
      <StackNav.Screen name="ContactAgentStack" component={ContactAgentScreen} />
      <StackNav.Screen name="GallerStack" component={GalleryScreen} />
      <StackNav.Screen name="StartOfferStack" component={StartOfferScreen} />
      <StackNav.Screen name="PreApprovedStack" component={PreApprovalScreen} />
      <StackNav.Screen name="FilterStack" component={FilterScreen} />
      <StackNav.Screen name="OfferInformationScreen" component={OfferInformationScreen} />
     </StackNav.Navigator>
  )
}

const FeedStack = () => {
  return (
    <StackNav.Navigator initialRouteName='Feed' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FeedScreen" component={FeedScreen}/>
      <StackNav.Screen name="DetailScreen" component={DetailScreen} />
     </StackNav.Navigator>
  )
}

const FavoriteStack = () => {
  return (
    //headerShown: false
    <StackNav.Navigator initialRouteName='Favorite' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="FavoriteScreen" component={FavoritesScreen}/>
      <StackNav.Screen name="PropertyFavoriteScreen" component={PropertyScreen} />
     </StackNav.Navigator>
  )
}

const ProfStackile = () => {
  return (
    <StackNav.Navigator initialRouteName='Profile' screenOptions={{headerShown: false}}>
      <StackNav.Screen name="ProfileScreen" component={ProfileScreen}/>
      <StackNav.Screen name="RecentViewScreen" component={RecentViewScreen}/>
      <StackNav.Screen name="ContactAgentScreen" component={ContactAgentScreen}/>
      <StackNav.Screen name="LoginScreen" component={LoginScreen} />
      <StackNav.Screen name="RegisterProfileScreen" component={RegisterProfileScreen} />
      <StackNav.Screen name="SellHomeScreen" component={SellHomeScreen} />
      <StackNav.Screen name="SignupScreen" component={SignupScreen} />
     </StackNav.Navigator>
  )
}

const MainTabkNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={{color: 'black'}}/>
      <TabNav.Navigator screenOptions={{headerShown: false}}>
        <TabNav.Screen 
          key='Home' 
          name="Home" 
          component={HomeStack} 
          options={{
            tabBarIcon: ({size, color}) => (<Feather name={"home"} color={color} size={size} />)
          }}/> 
        {/* <TabNav.Screen key='Recommended' name="Recommended" component={RecommendedStack} /> */}
        <TabNav.Screen 
          key='Favorites' 
          name="Favorites" 
          component={FavoriteStack} 
          options={{
            tabBarIcon: ({size, color}) => (<Feather name={"heart"} color={color} size={size} />)
          }}/>
        <TabNav.Screen 
          key='Feed' 
          name="Feed" 
          component={FeedStack} 
          options={{
            tabBarIcon: ({size, color}) => (<Feather name={"menu"} color={color} size={size} />)
          }}/>
        {/* <TabNav.Screen key='Messages' name="Messages" component={MessagesStack} />  */}
        <TabNav.Screen 
          key='Profile' 
          name="Profile" 
          component={ProfStackile} 
          options={{
            tabBarIcon: ({size, color}) => (<Feather name={"user"} color={color} size={size} />)
          }}/>
      </TabNav.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default MainTabkNavigation;
