import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/feature/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../Loader';

export default function Home_Screen() {

  const dispatch = useDispatch();
  const isFoucs = useIsFocused();
  const theme = useSelector(state =>  state.theme.data);

  const navigation = useNavigation();
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';


  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
   
   
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  return (
    <View style={{flex: 1, backgroundColor:theme=='light'?'#fff':'#333'}}>
    
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={{fontSize: 22, fontWeight: '600', color: textColor}}>
              Dashboard
            </Text>
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

        <View style={{marginTop: 20}}>
          <FlatList
            data={data}
            numColumns={2}
            renderItem={({item}) => (
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(item.navigate);
                  }}
                  style={{
                    height: hp(30),
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,

                    elevation: 6,
                    borderRadius: 10,
                    backgroundColor: bgColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: hp(1),
                  }}>
                  <View style={{alignItems: 'center'}}>
                    {item.name == 'vcards' && (
                      <FontAwesome name="vcard" size={30} color={'#ed2f95'} />
                    )}

                    {item.name == 'projects' && (
                      <FontAwesome5
                        name="project-diagram"
                        size={30}
                        color={'#ed2f95'}
                      />
                    )}
                    {item.name == 'pixels' && (
                      <MaterialIcons name="pix" size={30} color={'#ed2f95'} />
                    )}
                    {item.name == 'domains' && (
                      <Feather name="globe" size={30} color={'#ed2f95'} />
                    )}

                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '500',
                        color: textColor,
                        marginTop: 8,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 22,
                      color: textColor,
                      fontWeight: '500',
                      marginTop: 1,
                    }}>
                    {item.count}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: bgColor,
              height: '10%',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="vcard" size={25} color={textColor} />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: '600',
                  fontSize: 20,
                  color: textColor,
                }}>
                LETEST VCARDS
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreatVCard');
              }}
              style={{
                flexDirection: 'row',
                borderWidth: 1,

                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ed2f95',
                paddingHorizontal: 10,
              }}>
              <AntDesign name="pluscircle" size={25} color={'#ed2f95'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: '600',
                  fontSize: 16,
                  color: '#ed2f95',
                }}>
                Create Vcard
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: bgColor,
            marginTop: 10,
            height: 45,
            marginHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Vcard</Text>
          </View>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Status</Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            marginHorizontal: 10,
            backgroundColor: bgColor,
          }}>
          <View
            style={{
              height: hp(10),
              width: '40%',

              backgroundColor: '#fff',
            }}>
            <Image
              source={require('../image/logo.png')}
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: textColor}}>
              Copyright © 2024 Bluestone Smart Card.
            </Text>
          </View>
          <TouchableOpacity style={{marginTop: 5}}>
            <Text style={{color: '#038dff'}}>blog</Text>
          </TouchableOpacity>

          <View style={{height: hp(10)}} />
        </View>
      </ScrollView>
    </View>
  );
}

const data = [
  {
    name: 'vcards',
    count: 0,
    navigate: 'Vcard',
  },
  {
    name: 'projects',
    count: 0,
    navigate: 'Project',
  },
  {
    name: 'pixels',
    count: 0,
    navigate: 'Pixel',
  },
  {
    name: 'domains',
    count: 0,
    navigate: 'CustomDomains',
  },
];
