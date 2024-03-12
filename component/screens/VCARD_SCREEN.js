import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/feature/ThemeSlice';

import Loader from '../Loader';

import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {
  Download_VCard,
  Vcard_delete,
  dashboard,
} from '../redux/feature/featuresSlice';
import RNFetchBlob from 'rn-fetch-blob';
import { request, PERMISSIONS } from 'react-native-permissions';
export default function VCARD_SCREEN() {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
  const VcardList = useSelector(state => state.feature.VcardList);
  const DownloadCardData = useSelector(state => state.feature.DownloadCardData);
  const [visible, setVisible] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const showMenu = index => {
    setVisible(true);
    setVisibleMenuIndex(index);
  };

  const hideMenu = () => {
    setVisible(false);
    setVisibleMenuIndex(null);
  };

  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };
  const VcardDelete = id => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
      id: id,
    };
    dispatch(Vcard_delete(params));

    hideMenu();
  };

  const handleDownload = async (vCardObject) => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        .then((result) => {
          if (result === 'granted') {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
    const fileName = `contact_${timestamp}.vcf`;
    const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/' + fileName;

    RNFetchBlob.fs.createFile(filePath, vCardObject, 'utf8')
      .then(() => {
        Alert.alert('Success', 'File saved successfully at: ' + filePath);
      })
      .catch((error) => {
        console.error('Error saving file:', error);
      })
      .finally(() => {
      // Set loading to false when the operation is complete
      });
          } else {
            // Handle permission denial
            console.warn('Write permission denied');
          }
        })
        .catch((error) => {
          console.error('Error requesting permissions:', error);
        });
    }
    
   
  };

  const downloadAndSaveFile = async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };

    try {
      const actionResult = await dispatch(Download_VCard(params));

      if (Download_VCard.fulfilled.match(actionResult)) {
       
 const vCardData = actionResult.payload.vcarddata
      
       await handleDownload(vCardData);


      } else if (Download_VCard.rejected.match(actionResult)) {
        console.error('Download failed:', actionResult.error);
      }
    } catch (error) {
      console.error('Error during download:', error.message);
    } finally {
    }
  };


  const openWebBrowser = (link) => {
    const url = `https://cards.forebearpro.co.in/cards/${link}`; // Replace this with your desired URL
    console.log(url);
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
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

  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      {isLoading ? <Loader /> : null}
   
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
              Vcards
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
        <ScrollView  showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: bgColor,
            height: 45,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              marginHorizontal: 20,
              color: textColor,
            }}>
            Vcards
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

      
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 10,
            height:hp(7),
            paddingHorizontal: 10,
            paddingVertical: 5,
           
          }}>
          <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNameEnum.CREATE_VCARD);
        }}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
            height:40, 
            width:'42%',
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
              Create Vcards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => {
            downloadAndSaveFile();
          }}
            style={{
              height: 40,
              width: 40,
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: textColor,
            }}>
            <Foundation name="download" size={30} color={textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height:40,
              width:40,
              borderColor: textColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <FontAwesome name="filter" size={30} color={textColor} />
          </TouchableOpacity>
        </View>
        {VcardList === null && (
          <View
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
              alignItems: 'center',
              marginVertical: 20,
              backgroundColor: bgColor,
            }}>
            <View
              style={{
                height: hp(40),
                backgroundColor: bgColor,
                width: '100%',
                marginVertical: 20,
              }}>
              <Image
                source={require('../image/empty.png')}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
              />
            </View>
            <Text style={{fontSize: 22, fontWeight: '600', color: textColor}}>
              There are no Vcards for now
            </Text>
            <Text style={{fontSize: 16, color: textColor, marginVertical: 10}}>
              Start by creating your first Vcards.
            </Text>
          </View>
        )}

        {VcardList !== null && (
          <>
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
            <View>
              {VcardList && (
                <FlatList
                  data={VcardList}
                  renderItem={({item, index}) => (
                    <View style={{flex: 1}}>
                      <View
                        onPress={() => {}}
                        style={{
                          height: hp(10),
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
                            width: '18%',
                          }}>
                          <Image
                            source={{uri: item?.logo?.url}}
                            style={{height: 60, width: 60, borderRadius: 30}}
                          />
                        </View>
                        <View
                          style={{
                            width: '42%',
                          }}>
                          <Text
                            style={{
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
                              }}>
                              <Text style={{color: textColor}}>
                                {item.project_data?.name.substring(0, 8)}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <View
                          style={{
                            width: '35%',
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
                              width: '50%',
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
                              showMenu(index);
                            }}
                            style={{
                              flexDirection: 'row',
                              width: '50%',
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
                            <AntDesign
                              name="caretdown"
                              size={15}
                              color={'#333'}
                            />
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
                              marginTop: hp(12),
                            }}>
                            <MenuItem
                              onPress={()=>{
                                openWebBrowser(item.url_alias)
                                hideMenu()
                              }}
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
                              <Ionicons
                                name="copy"
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
                          </Menu>
                        </View>
                      )}
                    </View>
                  )}
                />
              )}
            </View>
          </>
        )}
        <View style={{height: hp(20), marginTop: 20, marginHorizontal: 10}}>
          <View style={{height: hp(10), width: '40%'}}>
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
