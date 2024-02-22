import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Appearance,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/feature/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dashboard} from '../redux/feature/featuresSlice';
import Loader from '../Loader';

import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
export default function Home_Screen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const theme = useSelector(state => state.theme.data);
  const navigation = useNavigation();
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dashboardData = useSelector(state => state.feature.DashBoardData);
  const [updatedData, setUpdatedData] = useState(data);
  const [visible, setVisible] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const showMenu = index => {
    setVisible(true);
    setVisibleMenuIndex(index);
  };

  const hideMenu = () => {
    setVisible(false);
    setVisibleMenuIndex(null);
  };

  const getDataApi = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(dashboard(params));
  }, [dispatch, user?.data.id, user?.data.token]);

  useEffect(() => {
    getDataApi();
  }, [isFocused, getDataApi]);

  useEffect(() => {
    if (dashboardData) {
      const apiCounts = {
        vcards: dashboardData.vcardlists.length,
        projects: dashboardData.projects,
        pixels: dashboardData.pixels,
        domains: dashboardData.connectCustomDomains,
      };

      const updatedDataCopy = data.map(item =>
        apiCounts.hasOwnProperty(item.name)
          ? {...item, count: apiCounts[item.name]}
          : item,
      );
      
      setUpdatedData(updatedDataCopy);
    }
  }, [dashboardData]);


  const Qr_Show =()=>{

    navigation.navigate(ScreenNameEnum.VCARD_QR)
   hideMenu()
  }
  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      {isLoading ? <Loader /> : null}

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

        <View style={{marginTop: 20,height:hp(75)}}>
          <View style={{marginTop:10}}>
          <FlatList
            data={updatedData}
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
</View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
           
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
                navigation.navigate(ScreenNameEnum.CREATE_VCARD);
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
         
            height: 45,
            marginHorizontal: 10,
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderColor: '#f0f0f0',
          }}>
          <View
            style={{
              width: '70%',
              justifyContent: 'center',

              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Name</Text>
          </View>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Stats</Text>
          </View>
          <View
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Action</Text>
          </View>
        </View>
        <View >
          {dashboardData && (
            <FlatList
              data={dashboardData?.vcardlists}
              renderItem={({item, index}) => (
                <View style={{flex: 1}}>
                  <View
                    onPress={() => {
                      //navigation.navigate(item.navigate);
                    }}
                    style={{
                      height: hp(15),
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

                      margin: hp(1),
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                    }}>
                    <View
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 40,
                      }}>
                      <Image
                        source={{uri: item?.logo?.url}}
                        style={{height: 80, width: 80, borderRadius: 40}}
                      />
                    </View>
                    <View
                      style={{
                        width: '45%',
                        height: 80,
                        marginLeft: 15,
                      }}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '500',
                          color: textColor,
                        }}>
                        {item.name}
                      </Text>
                      {/*
                    <Text style={{}}>
                      https://cards.forebearpro.co.in/cards/{item.url_alias}
                    </Text> */}
                      {!item.project_data?.name == '' && (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            padding: 5,
                            borderColor:theme=='light'?'blue':'#fff',
                            borderRadius: 5,
                            marginTop: 10,
                          }}>
                          <Text style={{color: textColor}}>
                            {item.project_data?.name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View
                      style={{
                        width: '30%',
                        justifyContent: 'space-between',
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                          borderRadius: 5,
                        }}>
                        <FontAwesome5
                          name="chart-bar"
                          size={25}
                          color={theme=='light'?'#4582e6':'#fff'}
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            color:theme=='light'?'#4582e6':'#fff',
                            fontSize: 18,
                          }}>
                          7
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          showMenu(index);
                        }}
                        style={{
                          flexDirection: 'row',
                          width: '45%',
                          borderWidth: 1,
                          alignItems: 'center',
                          padding: 5,
                          marginLeft: 10,
                          borderRadius: 5,
                          backgroundColor: '#f0f0f0',
                        }}>
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color={'#333'}
                        />
                        <AntDesign name="caretdown" size={15} color={'#333'} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {visibleMenuIndex == index && (
                  
                    <View style={{height: '40%'}}>
                     
                      <Menu
                        visible={visible}
                        onRequestClose={() => hideMenu(index)}
                        style={{
                          marginLeft: '55%',
                          width: '17%',
                          justifyContent: 'center',
                          backgroundColor: bgColor,
                          marginTop:hp(12),
                        }}>
                        <MenuItem
                          onPress={hideMenu}
                          style={{
                            marginLeft: -5,
                            justifyContent: 'center',
                            height: 30,
                            marginTop:5
                          }}>
                          <Entypo
                            name="share-alternative"
                            size={25}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',

                              color: textColor,
                            }}>
                            {' '}
                            Views
                          </Text>
                        </MenuItem>
                        <MenuItem onPress={Qr_Show} style={{marginTop:5}}>
                          <FontAwesome6
                            name="qrcode"
                            size={20}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            QR Code
                          </Text>
                        </MenuItem>
                        <MenuItem onPress={hideMenu} style={{}}>
                          <FontAwesome5
                            name="chart-bar"
                            size={20}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            Statistics
                          </Text>
                        </MenuItem>
                        <MenuItem onPress={hideMenu} style={{}}>
                          <FontAwesome
                            name="bars"
                            size={20}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            VCard Blocks
                          </Text>
                        </MenuItem>
                        <MenuItem onPress={hideMenu} style={{}}>
                          <Ionicons name="copy" size={20} color={textColor} />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            Duplicate
                          </Text>
                        </MenuItem>
                        <MenuItem
                          onPress={hideMenu}
                          style={{justifyContent: 'center'}}>
                          <FontAwesome5
                            name="pencil-alt"
                            size={20}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            Edit
                          </Text>
                        </MenuItem>
                        <MenuItem style={{}}>
                          {/* <TouchableOpacity onPress={()=>console.log('fsfssafs')
            }> */}
                          <MaterialCommunityIcons
                            name="logout"
                            size={25}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '400',
                              color: textColor,
                            }}>
                            {' '}
                            Delete
                          </Text>
                          {/* </TouchableOpacity> */}
                        </MenuItem>
                      </Menu>
                      
                    </View>
                  )}
                </View>
              )}
            />
          )}
        </View>

        <View
          style={{
          
            paddingHorizontal: 10,
            marginHorizontal: 10,
            backgroundColor: bgColor,
            paddingVertical:10
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

          <View style={{height: hp(25)}} />
        </View>
      </ScrollView>
    </View>
  );
}

const data = [
  {
    name: 'vcards',
    count: 0,
    navigate: ScreenNameEnum.VCARD_SCREEN,
  },
  {
    name: 'projects',
    count: 0,
    navigate: ScreenNameEnum.PROJECT_SCREEN,
  },
  {
    name: 'pixels',
    count: 0,
    navigate: ScreenNameEnum.PIXELS_SCREEN,
  },
  {
    name: 'domains',
    count: 0,
    navigate: ScreenNameEnum.CUSTOMDOMAIN_SCREEN,
  },
];
