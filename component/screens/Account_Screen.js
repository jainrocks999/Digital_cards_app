import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  Switch,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
import {Dropdown} from 'react-native-element-dropdown';

export default function Account_Screen() {
  console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
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

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
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
        <View
          style={[styles.heading, {backgroundColor: bgColor, height: hp(6)}]}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              marginHorizontal: 20,
              color: textColor,
            }}>
            Setting
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

        <View
          style={[
            styles.contentContainer,
            {shadowcolor: textColor, backgroundColor: bgColor, height: hp(85)},
          ]}>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <FontAwesome5 name="signature" size={19} color={textColor} />
              <Text style={[styles.txtHeading, {color: textColor}]}>Name</Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholderTextColor={textColor}
                  placeholder="name"
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
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
              <Text style={[styles.txtName, {color: textColor}]}>Email</Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
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
              <FontAwesome5 name="user-clock" size={19} color={textColor} />
              <Text style={[styles.txtName, {color: textColor}]}>Timezone</Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    {color: textColor},
                  ]}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  maxHeight={200}
                  itemContainerStyle={{backgroundColor: bgColor}}
                  itemTextStyle={{color: textColor}}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Timezone' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 10, marginVertical: 5}}>
            <Text style={{color: textColor}}>
              Your preferred way of displaying dates.
            </Text>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <FontAwesome name="user-secret" size={19} color={textColor} />
              <Text style={[styles.txtName, {color: textColor}]}>
                Anti phishing code
              </Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholder="Enter "
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginVertical: 5,
              marginTop: 10,
              marginHorizontal: 10,
            }}>
            <View style={{width: '80%', marginLeft: 10}}>
              <Text style={{color: textColor}}>
                You'll get this code on each email that we send you, so you'll
                know it's a valid email from us.
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              height: hp(8),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '15%'}}>
              <Switch
                trackColor={{false: '#f0f0f0', true: '#767577'}}
                thumbColor={isEnabled ? '#fff' : '#767577'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '83%',
              }}>
              <FontAwesome name="newspaper-o" size={20} color={textColor} />
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                Newsletter subscribed
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.heading, {backgroundColor: bgColor, height: hp(6)}]}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              marginHorizontal: 20,
              color: textColor,
            }}>
            Two-factor authentication
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>
        <View
          style={[
            styles.contentContainer,
            {shadowcolor: textColor, backgroundColor: bgColor, height: hp(85)},
          ]}>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                alignItems: 'center',
              }}>
              <FontAwesome6 name="book-atlas" size={19} color={textColor} />
              <Text style={[styles.txtName, {color: textColor}]}>
                Enable Two-factor authentication
              </Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={[
                    styles.placeholderStyle,
                    {color: textColor},
                  ]}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={TwoAuth}
                  maxHeight={150}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
            </View>
            <View style={{height: hp(15)}}>
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: textColor,
                    fontWeight: '600',
                    marginTop: 20,
                  }}>
                  1. Scan QR Code
                </Text>
              </View>
              <View style={{width: '90%', marginHorizontal: 10, marginTop: 10}}>
                <Text style={{fontSize: 16, color: textColor, flexWrap: '500'}}>
                  Open the authentication app (ex: Authy, Google Authenticator)
                  on your mobile device and scan the following QR Code with your
                  camera.
                </Text>
              </View>
            </View>
            <View
              style={{
                height: hp(25),
                alignItems: 'center',
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <View style={{width: '30%'}}>
                <Image
                  source={require('../image/qr.png')}
                  style={{height: 120, width: 120}}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginLeft: 10, width: '70%', marginHorizontal: 5}}>
                <Text
                  style={{fontSize: 18, color: textColor, fontWeight: '500'}}>
                  Can't scan the QR Code?
                </Text>
                <Text
                  style={{fontSize: 16, color: textColor, fontWeight: '400'}}>
                  Try inserting the following secret code into your app if you
                  can't scan the QR Code.
                </Text>
                <Text
                  style={{fontSize: 18, color: textColor, fontWeight: '500'}}>
                  GRXCWB7V5JIRIE5G
                </Text>
              </View>
            </View>
            <View style={{height: hp(15)}}>
              <View style={{marginHorizontal: 10}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: textColor,
                    fontWeight: '600',
                    marginTop: 20,
                  }}>
                  2. Enter freshly generated token
                </Text>
              </View>
              <View style={{width: '90%', marginHorizontal: 10, marginTop: 10}}>
                <Text style={{fontSize: 16, color: textColor, flexWrap: '500'}}>
                  To confirm that you setup your code properly, please enter the
                  6-digit token from your mobile app.
                </Text>
              </View>
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
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholder=""
                  placeholderTextColor={textColor}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={[styles.heading, {backgroundColor: bgColor, height: hp(6)}]}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              marginHorizontal: 20,
              color: textColor,
            }}>
            Change password
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

        <View
          style={[
            styles.contentContainer,
            {shadowcolor: textColor, backgroundColor: bgColor, height: hp(55)},
          ]}>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <FontAwesome name="unlock-alt" size={19} color={textColor} />
              <Text style={[styles.txtHeading, {color: textColor}]}>
                Current password
              </Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholderTextColor={textColor}
                  placeholder=""
                  secureTextEntry={true}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <FontAwesome name="lock" size={19} color={textColor} />
              <Text style={[styles.txtHeading, {color: textColor}]}>
                New password
              </Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholderTextColor={textColor}
                  placeholder=""
                  secureTextEntry={true}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <FontAwesome name="lock" size={19} color={textColor} />
              <Text style={[styles.txtHeading, {color: textColor}]}>
                Repeat new password
              </Text>
            </View>
            <View
              style={[
                styles.inputP,
                {
                  shadowcolor: textColor,
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                },
              ]}>
              <View
                style={[
                  styles.inputBox,
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747'},
                ]}>
                <TextInput
                  placeholderTextColor={textColor}
                  placeholder=""
                  secureTextEntry={true}
                  style={{
                    fontSize: 14,
                    paddingHorizontal: 20,
                    color: textColor,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
          //  navigation.navigate(ScreenNameEnum.EDIT_VCARD);
          }}
          style={[
            styles.btn,
            {
              backgroundColor: theme == 'light' ? '#4b5563' : '#fff',
              height: hp(6),
            },
          ]}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              color: theme == 'light' ? '#fff' : '#333',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txtName: {
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: '600',
  },
  txtHeading: {
    fontSize: 18,
    marginHorizontal: 10,

    fontWeight: '600',
  },
  btn: {
    marginHorizontal: 20,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    marginVertical: 10,
  },
  contentContainer: {
    marginHorizontal: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 15,

    borderRadius: 5,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',

    borderRadius: 8,
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
  inputP: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 1,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,

    marginTop: 15,

    height: hp(8),
  },
  heading: {
    flexDirection: 'row',

    alignItems: 'center',
    marginTop: 10,
  },
  inputBox: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 5,
  },
});
const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const TwoAuth = [
  {label: 'Yes', value: '1'},
  {label: 'No', value: '0'},
];
