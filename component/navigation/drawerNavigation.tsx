import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';


import Home from '../screens/Home';
import DrawerContent from './customdrawer';
import Vcard from '../screens/Vcard';
import Project from '../screens/project';
import Pixels from '../screens/pixel';
import CustomDomains from '../screens/Customdomains';



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  
  return (
    <Drawer.Navigator 
     drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen 
      options={{headerShown:false}}
      name="Dashboard" component={Home} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="Vcard" component={Vcard} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="Project" component={Project} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="Pixel" component={Pixels} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="CustomDomains" component={CustomDomains} />
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
