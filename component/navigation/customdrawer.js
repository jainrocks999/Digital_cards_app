// components/DrawerContent.js

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {clearLoginState, logout} from '../redux/feature/authSlice';
import Loader from '../Loader';

const DrawerContent = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const theme = useSelector(state => state.theme.data);
  const userData = useSelector(state => state.auth?.userData?.data);
  const isLoading = useSelector(state => state.auth.isLoading);
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';

  const dispatch = useDispatch();

  const UserLogOut = async () => {
    const params = {
      data: {
        email: userData.email,
      }, navigation: navigation,
    };


    dispatch(logout(params));
  };

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const navigati = useNavigation();
  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
     {isLoading ? <Loader /> : null}
    
      <View style={[styles.head, {backgroundColor: bgColor}]}>
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
        style={[styles.screen1, {marginTop: 25, backgroundColor: bgColor}]}>
        <View style={styles.logo}>
          <MaterialIcons name="dashboard" size={25} color={textColor} />
        </View>
        <Text style={[styles.hometxt, {color: textColor}]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Vcard');
        }}
        style={[styles.screen1, {marginTop: 25, backgroundColor: bgColor}]}>
        <View style={styles.logo}>
          <FontAwesome name="vcard" size={17} color={textColor} />
        </View>
        <Text style={[styles.hometxt, {color: textColor}]}>Vcards</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Project');
        }}
        style={[styles.screen1, {marginTop: 25, backgroundColor: bgColor}]}>
        <View style={styles.logo}>
          <FontAwesome5 name="project-diagram" size={17} color={textColor} />
        </View>
        <Text style={[styles.hometxt, {color: textColor}]}>Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('Pixel');
        }}
        style={[styles.screen1, {marginTop: 25, backgroundColor: bgColor}]}>
        <View style={styles.logo}>
          <MaterialIcons name="pix" size={25} color={textColor} />
        </View>
        <Text style={[styles.hometxt, {color: textColor}]}>Pixels</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigati.navigate('CustomDomains');
        }}
        style={[styles.screen1, {marginTop: 25, backgroundColor: bgColor}]}>
        <View style={{width: '20%', alignItems: 'center'}}>
          <Feather name="globe" size={22} color={textColor} />
        </View>
        <Text style={[styles.hometxt, {color: textColor}]}>Custom domains</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={showMenu}
        style={{
          bottom: 0,
          paddingHorizontal: 10,
          position: 'absolute',
          width: '100%',
          flexDirection: 'row',
          backgroundColor: bgColor,

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
          <Text style={{fontWeight: '600', color: textColor, fontSize: 16}}>
            {userData.name}
          </Text>
          <Text style={{color: textColor}}>{userData.email}</Text>
        </View>
      </TouchableOpacity>
      <View style={{height: '30%'}}>
        <Menu
          visible={visible}
          onRequestClose={hideMenu}
          style={{
            marginLeft: '22%',
            width: '17%',
            justifyContent: 'center',
            backgroundColor: bgColor,
          }}>
          <MenuItem onPress={hideMenu} style={{}}>
            <Feather name="tool" size={20} color={textColor} />
            <Text style={{fontSize: 16, fontWeight: '400', color: textColor}}>
              {' '}
              Account
            </Text>
          </MenuItem>
          <MenuItem onPress={hideMenu} style={{}}>
            <FontAwesome6 name="box-open" size={20} color={textColor} />
            <Text style={{fontSize: 16, fontWeight: '400', color: textColor}}>
              {' '}
              Plan
            </Text>
          </MenuItem>
          <MenuItem onPress={hideMenu} style={{}}>
            <Entypo name="code" size={20} color={textColor} />
            <Text style={{fontSize: 16, fontWeight: '400', color: textColor}}>
              {' '}
              Api
            </Text>
          </MenuItem>
          <MenuItem
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to log out?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Logout',
                    onPress: () => {
                      UserLogOut();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            style={{}}>
            {/* <TouchableOpacity onPress={()=>console.log('fsfssafs')
            }> */}
            <MaterialCommunityIcons name="logout" size={20} color={textColor} />
            <Text style={{fontSize: 16, fontWeight: '400', color: textColor}}>
              {' '}
              Logout
            </Text>
            {/* </TouchableOpacity> */}
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

  logo: {width: '20%', alignItems: 'center'},
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
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: 45,
  },
  screen2: {
    flexDirection: 'row',
    marginHorizontal: 10,
    height: 45,
    marginTop: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
