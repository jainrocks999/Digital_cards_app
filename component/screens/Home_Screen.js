import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Appearance,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {Vcard_delete, dashboard} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {heightPercent, widthPrecent} from '../config/responsiveScreen';
import {flingGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/FlingGestureHandler';
export default function Home_Screen() {
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const isFocused = useIsFocused();
  const theme = useSelector(state => state.theme.data);
  const navigation = useNavigation();
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dashboardData = useSelector(state => state.feature.DashBoardData);
  const VcardList = useSelector(state => state.feature.VcardList);
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

  
useEffect(()=>{
  getCrashlyticsDetail()
},[user])

    const getCrashlyticsDetail = async() => {
console.log('=>>>>>>>>>>>getCrashlyticsDetail  Called');
  
      try {
        crashlytics().setUserId(user?.data.id)
        crashlytics().setAttribute('username:'+user?.data.email)
      } catch (err) {
        crashlytics().recordError(err)
      }
    }





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
  }, [isFocused]);

  const VcardDelete = id => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
      id: id,
    };

    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(Vcard_delete(params));
          },
        },
      ],
      {cancelable: false},
    );

    hideMenu();
  };
  useEffect(() => {
    if (dashboardData) {
      const apiCounts = {
        vcards: VcardList.length,
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
  const scrollToCenter = (index) => {
    showMenu(index)

   
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
        <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false} ref={scrollViewRef}>
   
   
        <View style={{marginTop: 20}}>
          <View style={{marginTop: 10}}>
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
                      height: hp(25),
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
              alignItems: 'center',
              marginHorizontal: 10,
              backgroundColor: bgColor,
              height: heightPercent(8),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,

                paddingHorizontal: 5,
                width: '50%',
              }}>
              <FontAwesome name="vcard" size={20} color={textColor} />
              <Text
                style={{
                  marginLeft: 10,
                  fontWeight: '600',
                  fontSize: 18,
                  color: textColor,
                }}>
                LATEST VCARDS
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.CREATE_VCARD);
              }}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                height: 45,
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ed2f95',
              }}>
              <AntDesign name="pluscircle" size={20} color={'#ed2f95'} />
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
            paddingHorizontal: 20,
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderColor: '#f0f0f0',
            marginTop:10,
            marginHorizontal:10
          }}>
          <View
            style={{
              width: widthPrecent(50),
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: textColor}}>Name</Text>
          </View>
          <View
            style={{
              width: widthPrecent(15),
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: textColor}}>Stats</Text>
          </View>
          <View
            style={{
              width: widthPrecent(15),
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: textColor}}>Action</Text>
          </View>
        </View>
        <View style={{}}>
          {VcardList && (
            <FlatList
              data={VcardList}
              showsVerticalScrollIndicator={false}
             
              renderItem={({item, index}) => (
                <View style={{flex: 1}}>
                  <View
                    onPress={() => {}}
                    style={{
                      height: heightPercent(12),
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
                        width: widthPrecent(18),

                        alignItems: 'center',
                      }}>
                      <Image
                        source={{uri: item?.logo?.url}}
                        style={{height: 60, width: 60, borderRadius: 30}}
                      />
                    </View>
                    <View
                      style={{
                        width: widthPrecent(40),

                        height: heightPercent(8),
                      }}>
                      <Text
                        style={{
                          marginLeft: 5,
                          fontSize: 20,
                          fontWeight: '500',
                          color: textColor,
                        }}>
                        {item.name.substring(0, 10)}
                      </Text>

                      {!item.project_data?.name == '' && (
                        <TouchableOpacity
                          style={{
                            borderWidth: 1,
                            paddingHorizontal: 5,
                            justifyContent: 'center',
                            borderColor: theme == 'light' ? 'blue' : '#fff',
                            borderRadius: 5,
                            width: '50%',
                            marginLeft: 10,
                            marginTop: 5,
                          }}>
                          <Text style={{color: textColor}}>
                            {item.project_data?.name.substring(0, 8)}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View
                      style={{
                        width: widthPrecent(35),
                        justifyContent: 'space-between',
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                        height: heightPercent(8),
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                          borderRadius: 5,
                          width: 50,

                          height: 50,
                        }}>
                        <FontAwesome5
                          name="chart-bar"
                          size={25}
                          color={theme == 'light' ? '#4582e6' : '#fff'}
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            color: theme == 'light' ? '#4582e6' : '#fff',
                            fontSize: 18,
                          }}>
                          7
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          scrollToCenter(index)
                         
                        }}
                        style={{
                          flexDirection: 'row',
                          width: 50,
                          height: 50,
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
                    <View style={{}}>
                      <Menu
                        visible={visible}
                        onRequestClose={() => hideMenu(index)}
                        style={{
                          marginLeft: '55%',
                          width: '17%',
                          justifyContent: 'center',
                          backgroundColor: bgColor,
                          marginTop: hp(12),
                        }}>
                        <ScrollView canCancelContentTouches={{flex: 1}}>
                          <MenuItem
                            onPress={hideMenu}
                            style={{
                              marginLeft: -5,
                              justifyContent: 'center',
                              height: 30,
                              marginTop: 5,
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
                          <MenuItem
                            onPress={() => {
                              navigation.navigate(ScreenNameEnum.VCARD_QR);
                              hideMenu();
                            }}
                            style={{marginTop: 5}}>
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
                          <MenuItem
                            onPress={() => {
                              hideMenu();
                              navigation.navigate(ScreenNameEnum.EDIT_VCARD, {
                                edit: false,
                                E_Id: item.id,
                                item: item,
                              });
                            }}
                            style={{}}>
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
                          <MenuItem onPress={() => {}} style={{}}>
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
                            onPress={() => {
                              hideMenu();
                              navigation.navigate(ScreenNameEnum.EDIT_VCARD, {
                                edit: true,
                                E_Id: item.id,
                                item: item,
                              });
                            }}
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
                          <MenuItem
                            onPress={() => {
                              VcardDelete(item.id);
                            }}
                            style={{}}>
                            {/* <TouchableOpacity onPress={()=>console.log('fsfssafs')
            }> */}
                            <AntDesign
                              name="delete"
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
                        </ScrollView>
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
            paddingVertical: 10,
          }}>
          <View
            style={{
              height: hp(10),
              width: '45%',

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
    navigate: ScreenNameEnum.PROJECT_STACK,
  },
  {
    name: 'pixels',
    count: 0,
    navigate: ScreenNameEnum.PIXEL_STACK,
  },
  {
    name: 'domains',
    count: 0,
    navigate: ScreenNameEnum.DOMAIN_STACK,
  },
];
