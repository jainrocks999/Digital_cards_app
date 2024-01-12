import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import DrawerNavigation from './drawerNavigation';
import CreateVcard from '../screens/createVcard';

export default function MainStack() {

    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}>

    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="home" component={DrawerNavigation} />

    
    

  </Stack.Navigator>
  )
}