import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
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
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import { Create_Card} from '../redux/feature/featuresSlice';

import Loader from '../Loader';
export default function CREATE_VCARD() {
  const navigation = useNavigation();
  const isLoading= useSelector (state=> state.feature.isLoading); 
  const theme = useSelector(state => state.theme.data);
  const [urlAlias, setUrlAlias] = useState('');
  const [Name, setName] = useState();
  const [description, setDescription] = useState('');
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  const createVCard = () => {
    const params = {
      data: {
        user_id: user?.data.id,
        url_alias:urlAlias,
        name: Name,
        description:description,
      },
      authToken: user?.data.token,
      navigation: navigation,
      user_id: user?.data.id,
    };

    

    dispatch(Create_Card(params));
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
              Create Vcard{' '}
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
            backgroundColor: bgColor,
            height: hp(8),
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
            Create a new vcard
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

        <View
          style={{
            marginHorizontal: 5,
            shadowcolor: textColor,
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
              <FontAwesome name="bolt" size={20} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  marginHorizontal: 10,
                  fontWeight: '600',
                }}>
                URL Alias
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                shadowcolor: textColor,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: bgColor,
                marginTop: 15,

                borderRadius: 5,
                height: hp(8),
              }}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#f0f0f0' : '#757575',
                  height: '100%',
                  width: '45%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{fontSize: 14, color: textColor}}>
                  cards.forebearpro.co.in/
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#474747',
                  height: '100%',
                  width: '55%',

                  justifyContent: 'center',
                }}>
                <TextInput
                  value={urlAlias}
                  onChangeText={txt => setUrlAlias(txt)}
                  placeholder="my-page-url "
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    color: textColor,
                  }}
                />
              </View>
            </View>
            <View style={{marginHorizontal: 10, marginVertical: 5}}>
              <Text style={{color: textColor}}>
                The main URL that your vcard is going to be able accessed from.
              </Text>
            </View>
          </View>
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
                shadowcolor: textColor,

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
                  value={Name}
                  onChangeText={txt => setName(txt)}
                  placeholderTextColor={textColor}
                  placeholder="name"
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
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <Entypo name="pencil" size={19} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  marginHorizontal: 10,
                  fontWeight: '600',
                }}>
                Description
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                shadowcolor: textColor,

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
                  value={description}
                  onChangeText={txt => setDescription(txt)}
                  placeholder="description"
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
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text style={{color: textColor}}>
              Short description of your vcard.
            </Text>
          </View>

          <View
            style={{
              marginVertical: 5,
              alignItems: 'center',
              marginHorizontal: 10,
              flexDirection: 'row',
            }}>
            <AntDesign name="infocirlce" size={18} color={textColor} />
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{color: textColor}}>
                You can set up more details about the vcard after the creation.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              createVCard();
            }}
            style={{
              marginHorizontal: 20,
              height: hp(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme == 'light' ? '#1034a6' : '#363636',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Text style={{fontWeight: '400', fontSize: 20, color: '#fff'}}>
              Create
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: hp(20), marginTop: 20, marginHorizontal: 10}}>
          <View style={{height: hp(10), width: '40%'}}>
            <Image
              source={require('../image/logo.png')}
              style={{height: '100%', width: '100%', backgroundColor: '#fff'}}
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
