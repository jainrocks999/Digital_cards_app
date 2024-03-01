import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {Pixel_delete, PixlsList} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {heightPercent} from '../config/responsiveScreen';
export default function PIXELS_SCREEN() {
  const isLoading = useSelector(state => state.feature.isLoading);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const PixelList = useSelector(state => state.feature.PixelList);
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const [visible, setVisible] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [viewPixelData, setViewPixelData] = useState([]);

  const [ModalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
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
    dispatch(PixlsList(params));
  }, [dispatch, user?.data.id, user?.data.token]);

  useEffect(() => {
    getDataApi();
  }, [isFocused, getDataApi]);

  const PixelDelete = id => {
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
            dispatch(Pixel_delete(params));
          },
        },
      ],
      {cancelable: false},
    );

    hideMenu();
  };
  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      {isLoading ? <Loader /> : null}
      <ScrollView>
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
              Pixels
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
            Pixels
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            marginHorizontal: 10,
            height: hp(8),
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: bgColor,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.CREATE_PIXEL);
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
              Create Pixel
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
              borderColor: textColor,
            }}>
            <Foundation name="download" size={30} color={textColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 45,
              width: 45,
              borderColor: textColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              borderWidth: 1,
            }}>
            <FontAwesome name="filter" size={30} color={textColor} />
          </TouchableOpacity>
        </View>

        {PixelList == null && (
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
              There are no Pixels for now
            </Text>
            <Text style={{fontSize: 16, color: textColor, marginVertical: 10}}>
              Start by creating your first Pixels.
            </Text>
          </View>
        )}
        {PixelList !== null && (
          <>
            <View style={{flex: 1, marginTop: 20}}>
              <FlatList
                data={PixelList}
                renderItem={({item, index}) => (
                  <>
                    <View
                      style={{
                        backgroundColor: bgColor,
                        height: heightPercent(28),
                        padding: 5,
                        margin: 10,

                        borderRadius: 5,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          alignItems: 'center',

                          height: 30,
                        }}>
                        <View style={{width: '30%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: textColor,
                            }}>
                            ID
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '800',
                            color: textColor,
                            fontSize: 16,
                          }}>
                          :
                        </Text>
                        <View
                          style={{
                            width: '30%',
                            marginLeft: 20,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: textColor,
                            }}>
                            {item.id}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          alignItems: 'center',

                          height: 30,
                        }}>
                        <View style={{width: '30%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: textColor,
                            }}>
                            Name
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '800',
                            color: textColor,
                            fontSize: 16,
                          }}>
                          :
                        </Text>
                        <View
                          style={{
                            width: '30%',
                            marginLeft: 20,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: textColor,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          alignItems: 'center',

                          height: 30,
                        }}>
                        <View style={{width: '30%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: textColor,
                            }}>
                            Type
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '800',
                            color: textColor,
                            fontSize: 16,
                          }}>
                          :
                        </Text>
                        <View
                          style={{
                            width: '45%',
                            marginLeft: 20,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: textColor,
                            }}>
                            {item.type}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginHorizontal: 10,
                          alignItems: 'center',

                          height: 30,
                        }}>
                        <View style={{width: '30%', justifyContent: 'center'}}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '700',
                              color: textColor,
                            }}>
                            Pixel ID
                          </Text>
                        </View>
                        <Text
                          style={{
                            marginHorizontal: 10,
                            fontWeight: '800',
                            color: textColor,
                            fontSize: 16,
                          }}>
                          :
                        </Text>
                        <View
                          style={{
                            width: '45%',
                            marginLeft: 20,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '500',
                              color: textColor,
                            }}>
                            {item.pixelid}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 15,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(true);
                            setViewPixelData(item);
                          }}
                          style={{
                            backgroundColor: '#4b5563',
                            height: 45,
                            width: 80,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: '600',
                            }}>
                            View
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate(ScreenNameEnum.Edit_Pixel, {
                              item: item,
                            });
                          }}
                          style={{
                            backgroundColor: '#17a2b8',
                            height: 45,
                            width: 80,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: '600',
                            }}>
                            Edit
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            PixelDelete(item.id);
                          }}
                          style={{
                            backgroundColor: '#dc3545',
                            height: 45,
                            width: 80,
                            borderRadius: 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#fff',
                              fontWeight: '600',
                            }}>
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}
              />
            </View>
          </>
        )}

        <Modal
          animationType="slide"
          transparent={false}
          visible={ModalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignItems: 'flex-start',
                marginVertical: 10,
                backgroundColor: '#f0f0f0',
                padding: 10,
                width: 120,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginHorizontal: 10,
                marginTop: 20,
              }}>
              <Text style={{fontSize: 16, color: textColor, fontWeight: '600'}}>
                Back to list
              </Text>
            </TouchableOpacity>

            <View
              style={{
                height: heightPercent(25),
                marginHorizontal: 10,

                borderRadius: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                    ID
                  </Text>
                </View>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                    {viewPixelData.id}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                    Name
                  </Text>
                </View>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                    {viewPixelData.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                    Type
                  </Text>
                </View>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                    {viewPixelData.type}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: 30,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                    Pixel ID
                  </Text>
                </View>
                <View style={{width: '50%', paddingHorizontal: 20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                    {viewPixelData.pixelid}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

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

const styles = StyleSheet.create({
  viewDiv: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  viewTxt: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: '600',

    width: '45%',
    borderRightWidth: 1,
    height: 45,
  },

  option: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderRadius: 10,

    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'grey',
  },
  tableText: {fontSize: 16, fontWeight: '600'},
});
