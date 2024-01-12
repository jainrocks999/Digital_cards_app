import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';


import Home from '../screens/Home';
import DrawerContent from './customdrawer';
import Vcard from '../screens/Vcard';
import Project from '../screens/project';
import Pixels from '../screens/pixel';
import CustomDomains from '../screens/Customdomains';
import CreateVcard from '../screens/createVcard';
import CreateProject from '../screens/createProject';
import CreatePixel from '../screens/createPixels';
import ConnectDomain from '../screens/ConnectDomain';



const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  
  return (
    <Drawer.Navigator screenOptions={{
      headerShown:false
    }}
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
      <Drawer.Screen 
      options={{headerShown:false}}
      name="CreateProject" component={CreateProject} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="CreatePixel" component={CreatePixel} />
      <Drawer.Screen 
      options={{headerShown:false}}
      name="ConnectDomain" component={ConnectDomain} />
 <Drawer.Screen 
 
 options={{

 }}
 name="CreatVCard" component={CreateVcard} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
