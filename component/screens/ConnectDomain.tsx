import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,
  } from 'react-native';
  import React from 'react';
  import {useNavigation} from '@react-navigation/native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import Entypo from 'react-native-vector-icons/Entypo';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
  import Foundation from 'react-native-vector-icons/Foundation';
  import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
  import Feather from 'react-native-vector-icons/Feather';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import EvilIcons from 'react-native-vector-icons/EvilIcons';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeTheme } from '../redux/feature/ThemeSlice';
  export default function ConnectDomain() {
    const navigation = useNavigation();
    const theme = useSelector(state =>  state.theme.data);
    const dispatch = useDispatch();
  
    let textColor = theme == 'light' ? '#000' : '#fff';
    let bgColor = theme == 'light' ? '#fff' : '#575757';
  
    const changeTheame = async () => {
      await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
      dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
    };
    return (
      <View style={{flex: 1, backgroundColor:theme=='light'?'#fff':'#333'}}>
        <ScrollView
          style={{paddingHorizontal: 5}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: bgColor,
            }}>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{width: '20%'}}>
              <Entypo size={40} name="menu" color={textColor} />
            </TouchableOpacity>
            <View
              style={{
                width: '60%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 22, fontWeight: '600',color:textColor}}>Custom Domain </Text>
            </View>
            <TouchableOpacity
            onPress={() => {
              changeTheame();
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather
              name="sun"
              size={25}
              color={theme == 'light' ? 'orange' : 'black'}
            />
            <Text
              style={{
                marginLeft: 5,
                color: theme == 'light' ? 'orange' : '#fff',
              }}>
              Light
            </Text>
          </TouchableOpacity>
          </View>
          <View
            style={{ justifyContent: 'center', marginTop: 20}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                marginHorizontal: 20,
                color:textColor
              }}>
            Connect custom domain
            </Text>
       
          </View>
          <View style={{marginHorizontal:20,marginTop:10}}>
            <Text 
            style={{color:textColor}}>Make sure that your domain or subdomain has an A record pointing to 162.254.39.14 or CNAME record pointing to bluestonecard.com.</Text>
          </View>
  
          <View
            style={{
              marginHorizontal: 5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              backgroundColor:bgColor,
              elevation: 5,
              marginTop: 15,
              height: hp(85),
              borderRadius: 5,
            }}>
            <View style={{marginTop: 25, paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <FontAwesome name="bolt" size={20} color={textColor} />
                <Text
                  style={{fontSize: 18, marginHorizontal: 10,color:textColor, fontWeight: '600'}}>
                  {' '}
                  Domain or subdomain
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
  
                  elevation: 5,
                  backgroundColor: '#fff',
                  marginTop: 15,
  
                  borderRadius: 5,
                  height: hp(8),
                }}>
           
                <View
                  style={{backgroundColor:theme=='light'?'#fff':'#333', height: '100%', width: '100%'}}>
                  <TextInput
                    placeholder="domain.com"
                    placeholderTextColor={textColor}
                    style={{fontSize: 14, paddingHorizontal: 10}}
                  />
                </View>
              </View>
             
            </View>
            <View style={{marginTop: 25, paddingHorizontal: 10}}>
              <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                <FontAwesome5 name="signature" size={19} color={textColor} />
                <Text
                  style={{fontSize: 18, marginHorizontal: 10,color:textColor, fontWeight: '600'}}>
                  Custom index URL
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
  
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
  
                  elevation: 8,
                  backgroundColor: bgColor,
                  marginTop: 15,
  
                  borderRadius: 10,
                  height: hp(8),
                }}>
                <View
                  style={{
                    backgroundColor: theme=='light'?'#fff':'#333',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TextInput
                    placeholder="https://domain.com"
                    placeholderTextColor={textColor}
                    style={{fontSize: 14, paddingHorizontal: 10,color:textColor}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 10, marginVertical: 5}}>
              <Text style={{marginHorizontal:10,color:textColor}}>Redirect to a specific URL when visitors land on the index of the domain, in case you don't want to use the custom domain for a single vcard.</Text>

            </View>
            <View style={{marginTop: 25, paddingHorizontal: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                  alignItems: 'center',
                }}>
                <Entypo name="pencil" size={19} color={textColor} />
                <Text
                  style={{fontSize: 18, marginHorizontal: 10,color:textColor, fontWeight: '600'}}>
                  Custom 404 not found URL
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
  
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
  
                  elevation: 8,
                  backgroundColor: '#fff',
                  marginTop: 15,
  
                  borderRadius: 10,
                  height: hp(8),
                }}>
                <View
                  style={{
                    backgroundColor: theme=='light'?'#fff':'#333',
                    height: '100%',
                    width: '100%',
                  }}>
                  <TextInput
                    placeholder="https://domain.com/404-page"
                    placeholderTextColor={textColor}
                    style={{fontSize: 14, paddingHorizontal: 10,color:textColor}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 10, marginVertical: 5}}>
              <Text style={{marginHorizontal:10,color:textColor}}>
              Redirect to a specific URL when visitors land on a not found page of the domain.</Text>
            </View>
  
  
            <TouchableOpacity
              style={{
                marginHorizontal: 20,
                height: hp(6),
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme=='light'?'#1034a6':'#333',
                borderRadius: 10,marginTop:50,
                marginVertical:10
              }}>
              <Text style={{fontWeight:'400',fontSize:20,color:'#fff'}}>Create</Text>
            </TouchableOpacity>
          </View>
  
          <View style={{height: hp(20), marginTop: 20, marginHorizontal: 10}}>
            <View style={{height: hp(10), width: '40%'}}>
              <Image
                source={require('../image/logo.png')}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
              />
            </View>
            <View style={{marginTop: 10}}>
              <Text style={{color:textColor}}>Copyright © 2024 Bluestone Smart Card.</Text>
            </View>
            <TouchableOpacity style={{marginTop: 5}}>
              <Text style={{color: 'blue'}}>blog</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: hp(10)}} />
        </ScrollView>
      </View>
    );
  }
  
  const data = [
    {
      name: 'vcards',
      count: 0,
    },
    {
      name: 'projects',
      count: 0,
    },
    {
      name: 'pixels',
      count: 0,
    },
    {
      name: 'domains',
      count: 0,
    },
  ];
  