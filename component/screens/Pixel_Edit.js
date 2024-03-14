import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/feature/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreatePixel, Pixel_Edit} from '../redux/feature/featuresSlice';
import Loader from '../Loader';

export default function Edit_Pixel({route}) {
  const {item} = route.params;
  console.log('screens' ,item);
  useEffect(() => {
    setValue(item.type);
    setType(item.type);
    setName(item.name);
    setPixelId(item.pixelid);
  }, [item]);

  const [value, setValue] = useState(null);
  const [Type, setType] = useState('');
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const isLoading = useSelector(state => state.feature.isLoading);

  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);

  const [Name, setName] = useState('');
  const [PixcelId, setPixelId] = useState('');

  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  const EditPixel = () => {
    console.log('editPiel ',Name, Type, PixcelId);
    const params = {
      data: {
        user_id: user?.data.id,
        name: Name,
        type: Type,
        pixelid: PixcelId,
        id:item.id,
      },
      authToken: user?.data.token,
      navigation: navigation,
    };

    dispatch(Pixel_Edit(params));
  };

  const setDropDowndata = item => {
    setType(item.label);
    setValue(item.value);
  };

  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      {isLoading ? <Loader /> : null}

    
       
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
              Edit Pixel
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
              color={theme == 'light' ? 'orange' : '#000'}
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
      
        <ScrollView
        style={{paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            height: hp(8),
            backgroundColor: bgColor,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              marginHorizontal: 20,
              color: textColor,
            }}>
            Edit pixel
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
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
            backgroundColor: bgColor,
            elevation: 5,
            marginTop: 15,
            height: hp(80),
            borderRadius: 5,
          }}>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <FontAwesome5 name="signature" size={19} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  marginHorizontal: 10,
                  color: textColor,
                  fontWeight: '600',
                }}>
                Name
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
                backgroundColor: theme == 'light' ? '#fff' : '#333',
                marginTop: 15,

                borderRadius: 10,
                height: hp(8),
              }}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <TextInput
                  placeholder="name"
                  value={Name}
                  onChangeText={txt => setName(txt)}
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <Ionicons name="invert-mode" size={25} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  marginHorizontal: 10,
                  color: textColor,
                  fontWeight: '600',
                }}>
                Type
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
                backgroundColor: theme == 'light' ? '#fff' : '#333',
                marginTop: 15,

                borderRadius: 10,
                height: hp(8),
              }}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    {backgroundColor: theme == 'light' ? '#fff' : '#333'},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={[styles.selectedTextStyle]}
                  showsVerticalScrollIndicator={false}
                  itemContainerStyle={{
                    backgroundColor: bgColor,
                  }}
                  activeColor={theme == 'light' ? '#fff' : '#333'}
                  itemTextStyle={{
                    color: textColor,
                  }}
                  placeholderTextColor={textColor}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder={Type}
                  value={value}
                  onChange={item => {
                    setDropDowndata(item);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <Entypo name="code" size={25} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  marginHorizontal: 10,
                  fontWeight: '600',
                }}>
                Pixel ID
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
                backgroundColor: theme == 'light' ? '#fff' : '#333',
                marginTop: 15,

                borderRadius: 10,
                height: hp(8),
              }}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <TextInput
                  value={PixcelId}
                  onChangeText={txt => setPixelId(txt)}
                  placeholder="Pixel"
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    paddingHorizontal: 10,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 25}}>
            <Text style={{color: textColor}}>
              Enter the pixel id from this specific pixel type you chose.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              EditPixel();
            }}
            style={{
              marginHorizontal: 20,
              height: hp(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme == 'light' ? '#4b5563' : '#333',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Text style={{fontWeight: '400', fontSize: 20, color: '#fff'}}>
              Update
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(20), marginTop: 20, marginHorizontal: 10}}>
         <View style={{height: hp(10), width: '40%',backgroundColor:'#fff'}}>
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
            <Text style={{color: 'blue'}}>blog</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: hp(10)}} />
      </ScrollView>
    </View>
  );
}

const data = [
  {label: 'Facebook', value: '1'},
  {label: 'Google Analytics', value: '2'},
  {label: 'Google Tag Manager', value: '3'},
  {label: 'Linkedln', value: '4'},
  {label: 'Pinterest', value: '5'},
  {label: 'Twitter', value: '6'},
  {label: 'Quora', value: '7'},
  {label: 'TikTok', value: '8'},
  {label: 'Snapchat', value: '8'},
];
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
