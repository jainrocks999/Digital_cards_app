// components/DrawerContent.js

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerContent = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const navigati = useNavigation();
  return (
    <View style={{flex: 1}}>
      <View style={styles.head}>
        <Image
          source={require('../image/logo.png')}
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Dashboard');
        }}
        style={[styles.screen1,{marginTop:25}]}>
        <View style={styles.logo}>
          <MaterialIcons name="dashboard" size={25} color={'#000'} />
        </View>
        <Text style={styles.hometxt}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Vcard');
        }}
        style={styles.screen1}>
        <View style={styles.logo}>
          <FontAwesome name="vcard" size={17} color={'#000'} />
        </View>
        <Text style={styles.hometxt}>Vcards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Project');
        }}
        style={styles.screen1}>
        <View style={styles.logo}>
          <FontAwesome5 name="project-diagram" size={17} color={'#000'} />
        </View>
        <Text style={styles.hometxt}>Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Pixel');
        }}
        style={styles.screen1}>
        <View style={styles.logo}>
          <MaterialIcons name="pix" size={25} color={'#000'} />
        </View>
        <Text style={styles.hometxt}>Pixels</Text>
      </TouchableOpacity>
      <TouchableOpacity 
       onPress={() => {
        navigati.navigate('CustomDomains');
      }}
      style={styles.screen2}>
        <View style={{width: '20%', alignItems: 'center'}}>
          <Feather name="globe" size={22} color={'#000'} />
        </View>
        <Text style={styles.hometxt}>Custom domains</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showMenu}
        style={{
          bottom: 0,
          paddingHorizontal: 10,
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#fff',

          height: '10%',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigat.navigate('LoginScreen');
          }}
          style={styles.logout}>
          <Image
            source={require('../image/dp.png')}
            style={{height: 45, width: 45, borderRadius: 22.5}}
          />
        </TouchableOpacity>

        <View style={styles.name}>
          <Text style={{fontWeight: '600', color: '#000', fontSize: 16}}>
            Rohan sahu
          </Text>
          <Text>rohansahusahi@gmail.com</Text>
        </View>
      </TouchableOpacity>
      <View style={{height: '30%',}}>
        <Menu
          visible={visible}
          onRequestClose={hideMenu}
          style={{marginLeft: '22%',width:'17%',justifyContent:'center'}}>
          <MenuItem onPress={hideMenu} 
          style={{}}
          >
            <Feather name="tool" size={20} color={'#000'} />
        <Text style={{fontSize:16,fontWeight:'400'}}>   Account</Text>  
          </MenuItem>
          <MenuItem onPress={hideMenu} 
          style={{}}
          >
            <FontAwesome6 name="box-open" size={20} color={'#000'} />
        <Text style={{fontSize:16,fontWeight:'400'}}>   Plan</Text>  
          </MenuItem>
          <MenuItem onPress={hideMenu} 
          style={{}}
          >
            <Entypo name="code" size={20} color={'#000'} />
        <Text style={{fontSize:16,fontWeight:'400'}}>   Api</Text>  
          </MenuItem>
          <MenuItem onPress={hideMenu} 
          style={{}}
          >
            <MaterialCommunityIcons name="logout" size={20} color={'#000'} />
        <Text style={{fontSize:16,fontWeight:'400'}}>   Logout</Text>  
          </MenuItem>
        
        </Menu>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  logout: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '25%',
    alignSelf: 'center',
  },

  logo: {width: '20%', alignItems: 'center',},
  name: {justifyContent: 'center', width: '75%'},
  hometxt: {
    fontSize: 16,
    width: '80%',
    paddingHorizontal: 5,
    fontWeight: '400',
    color: '#000',
  },

  head: {
    marginTop: 10,
    width: '100%',
    height: '10%',
    alignItems: 'center',
  },
  screen1: {

    backgroundColor:'#f0f0f0',
    flexDirection: 'row',
    marginTop:5,
    alignItems: 'center',
    justifyContent: 'space-between',
   marginHorizontal:10,
    height:45,
  },
  screen2: {
    flexDirection: 'row',
    marginHorizontal:10,
    height:45,
    marginTop: 5,
    backgroundColor:'#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
