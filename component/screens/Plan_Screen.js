import {View, Text, TouchableOpacity, StyleSheet, FlatList,ScrollView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';

import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {heightPercent} from '../config/responsiveScreen';

export default function Plan_Screen() {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const dispatch = useDispatch();

  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const isFocused = useIsFocused();

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: bgColor,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          
          elevation: 5,
          height:50
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
            Plans
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
<ScrollView>
    <View style={{height:45,justifyContent:'center',paddingHorizontal:20}}>
        <Text style={{fontWeight:'600',color:'grey',fontSize:20}}>Free</Text>
    </View>
      <View
        style={{
          borderRadius: 5,
          paddingVertical: 10,
          backgroundColor:bgColor,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          marginHorizontal: 10,
          marginTop:heightPercent(1),
        }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <View
                style={{
                  marginVertical: 5,
                  height: 25,
                  marginHorizontal: 10,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 30,
                }}>
                {item.tick ? (
                  <Entypo name="check" size={25} color={'green'} />
                ) : (
                  <Entypo name="cross" size={25} color={'grey'} />
                )}

                <Text style={{marginLeft: 10, fontWeight: '600', fontSize: 18,color:item.tick?textColor:'grey'}}>
                  {item.name}
                </Text>
              </View>
            </View>
          )}
        />

      </View>
        <View style={{height:heightPercent(10)}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

const data = [
  {name: 'Unlimited Vcards', tick: true},
  {name: 'Unlimited Vcard blocks', tick: true},
  {name: 'Unlimited projects', tick: true},
  {name: 'Unlimited pixels', tick: true},
  {name: 'Unlimited custom domains', tick: true},
  {name: '0 Additional domains?', tick: false},
  {name: 'Unlimited days vcards statistics retention', tick: true},
  {name: 'Included analytics?', tick: true},
  {name: 'QR code builder?', tick: true},
  {name: 'Password protection?', tick: true},
  {name: 'Removable branding?', tick: true},
  {name: 'Custom back-half URL?', tick: true},
  {name: 'Leap link?', tick: true},
  {name: 'Block search engine indexing?', tick: true},
  {name: 'Custom CSS styling?', tick: true},
  {name: 'Custom JS?', tick: true},
  {name: 'API access?', tick: true},
  {name: 'No Ads?', tick: true},
];
