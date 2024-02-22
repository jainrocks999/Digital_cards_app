import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {ProjectList} from '../redux/feature/featuresSlice';
import Loader from '../Loader';

export default function Account_Screen() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const theme = useSelector(state => state.theme.data);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const ProjectData = useSelector(state => state.feature.ProjectList);
  const [visible, setVisible] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const isFocused = useIsFocused();

  console.log('ProjectList', ProjectData);
  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  return (
    <View style={{flex: 1}}>
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
            Account
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
    </View>
  );
}
