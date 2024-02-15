import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
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

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeTheme } from '../redux/feature/ThemeSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Project() {
  const navigation = useNavigation();
  const theme = useSelector(state =>  state.theme.data);
  const dispatch =useDispatch();
  
  
    let textColor = theme == 'light' ? '#000' : '#fff';
    let bgColor = theme == 'light' ? '#fff' : '#575757';
  
    const changeTheame = async () => {
      await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
      dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
    };

  return (
    <View style={{flex: 1,backgroundColor:theme=='light'?'#fff':'#333'}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor:bgColor,
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
            <Text style={{fontSize: 22, fontWeight: '600',color:textColor}}>Projects</Text>
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
          style={{flexDirection: 'row', 
          backgroundColor:bgColor,height:hp(8),
          alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              marginHorizontal: 20,
            }}>
            Projects
          </Text>
          <AntDesign name="infocirlce" size={20} color={'#000'} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 10,
            height: hp(8),
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <TouchableOpacity
     onPress={()=>{
      navigation.navigate('CreateProject')
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
              Create Project
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={{
                height: 45,
                width: 45,
                marginHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor:textColor
              }}>
              <Foundation name="download" size={30} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 45,
                width: 45,
                borderColor:textColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                borderWidth: 1,
              }}>
              <FontAwesome name="filter" size={30}  color={textColor}/>
            </TouchableOpacity>
        </View>

  

        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            marginVertical: 20,
            backgroundColor: bgColor,
          }}>
          <View style={{height: hp(40), width: '100%', marginVertical: 20}}>
            <Image
              source={require('../image/empty.png')}
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
            />
          </View>
          <Text style={{fontSize: 22, fontWeight: '600', color: textColor}}>
            There are no projects for now
          </Text>
          <Text style={{fontSize: 16, color: textColor, marginVertical: 10}}>
            Start by creating your first project.
          </Text>
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

