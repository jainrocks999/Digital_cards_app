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
import {useNavigation, useIsFocused} from '@react-navigation/native';
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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {DomainList, Domain_delete} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {heightPercent, widthPrecent} from '../config/responsiveScreen';

export default function CUSTOMDOMAIN_SCREEN() {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const DomainData = useSelector(state => state.feature.Domainlists);
  const user = useSelector(state => state.auth.userData);
  const [viewDomainData, setViewDomainData] = useState([]);

  const [ModalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector(state => state.feature.isLoading);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const getDataApi = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(DomainList(params));
  }, [dispatch, user?.data.id, user?.data.token]);

  useEffect(() => {
    getDataApi();
  }, [isFocused, getDataApi]);

  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  const DomainDelete = id => {
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
            dispatch(Domain_delete(params));
          },
        },
      ],
      {cancelable: false},
    );
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
              Custom domains
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
            Custom domains
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
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.CONNECT_DOMAIN);
            }}
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: '#ed2f95',
              paddingHorizontal: 10,
              height: 45,
              width: wp(60),
            }}>
            <AntDesign name="pluscircle" size={25} color={'#ed2f95'} />
            <Text
              style={{
                marginLeft: 10,
                fontWeight: '600',
                fontSize: 16,
                color: '#ed2f95',
              }}>
              Connect Custom domains
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
        {DomainData === null && (
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
              There are no Custom domains for now
            </Text>
            <Text style={{fontSize: 16, color: textColor, marginVertical: 10}}>
              Start by creating your first Custom domains.
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: bgColor,
            flex: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            marginTop: 10,
            marginHorizontal: 10,
            borderRadius: 5,
          }}>
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              height: 45,
              justifyContent: 'center',
              paddingHorizontal: 10,
              backgroundColor: bgColor,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}>
            <Text style={{fontSize: 16, color: textColor, fontWeight: '700'}}>
              Connect Custom Domain List
            </Text>
          </View>

          {DomainData !== null && (
            <>
              <View style={{flex: 1, marginTop: 20}}>
                <FlatList
                  data={DomainData}
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
                          }}>
                          <View style={{width: '10%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: textColor,
                              }}>
                              ID :
                            </Text>
                          </View>
                          <View style={{width: '85%'}}>
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
                            marginTop: 5,
                            alignItems: 'center',
                          }}>
                          <View style={{width: '30%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: textColor,
                              }}>
                              Domain or subdomain :
                            </Text>
                          </View>
                          <View style={{width: '45%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: textColor,
                              }}>
                              {item.domain_or_subdomain}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <View style={{width: '45%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: textColor,
                              }}>
                              Custom Index Url :
                            </Text>
                          </View>
                          <View style={{width: '85%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: textColor,
                              }}>
                              {item.custom_index_url}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            height: 45,
                            alignItems: 'center',
                            marginTop: 5,
                          }}>
                          <View style={{width: '45%', marginTop: 5}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: textColor,
                              }}>
                              Custom 404 Not Found Url :
                            </Text>
                          </View>
                          <View style={{width: '50%'}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: textColor,
                              }}>
                              {item.custom_404_not_found_url}
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
                              setViewDomainData(item);
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
                              navigation.navigate(ScreenNameEnum.Edit_Domain, {
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
                              DomainDelete(item.id);
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
            <Text style={{color: textColor}}>
              Copyright © 2024 Bluestone Smart Card.
            </Text>
          </View>
          <TouchableOpacity style={{marginTop: 5}}>
            <Text style={{color: 'blue'}}>blog</Text>
          </TouchableOpacity>
        </View>

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
                width:120,
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
            <View style={{height: 45, marginHorizontal: 20}}>
              <Text style={{fontSize: 18, fontWeight: '500', color: textColor}}>
                Show Connect Custom Domain
              </Text>
            </View>

            <View
              style={{
               
                height: heightPercent(25),
                marginHorizontal: 10,

                borderRadius: 5,
              }}>
            <View  
                style={{flexDirection: 'row',
                height:45,alignItems:'center',backgroundColor:'#f0f0f0',
                justifyContent: 'space-between'}}>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                    ID
                  </Text>
                </View>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                    {viewDomainData.id}
                  </Text>
                </View>
              </View>
            <View  
                style={{flexDirection: 'row',
                height:45,alignItems:'center',backgroundColor:'#fff',
                justifyContent: 'space-between'}}>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                  Domain or subdomain
                  </Text>
                </View>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                   {viewDomainData.domain_or_subdomain}
                  </Text>
                </View>
              </View>
            <View  
                style={{flexDirection: 'row',
                height:45,alignItems:'center',backgroundColor:'#f0f0f0',
                justifyContent: 'space-between'}}>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                  Custom Index Url
                  </Text>
                </View>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                   {viewDomainData.custom_index_url}
                  </Text>
                </View>
              </View>
            <View  
                style={{flexDirection: 'row',
                height:45,alignItems:'center',backgroundColor:'#fff',
                justifyContent: 'space-between'}}>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text style={[{color: textColor, fontWeight: '500'}]}>
                  Custom 404 Not Found Url
                  </Text>
                </View>
                <View style={{width: '50%',paddingHorizontal:20}}>
                  <Text
                    style={{fontSize: 16, fontWeight: '400', color: textColor}}>
                  {viewDomainData.custom_404_not_found_url}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{height: hp(10)}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewDiv: {
    flexDirection: 'row',
  },
  viewTxt: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    width: '50%',
    borderRightWidth: 1,
    height: 55,
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
    justifyContent: 'center',
    borderRightWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'grey',
  },
  tableText: {fontSize: 16, fontWeight: '600'},
});
