import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Appearance,
  StyleSheet,
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
import Slider from '@react-native-community/slider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/feature/ThemeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {dashboard} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import {Dropdown} from 'react-native-element-dropdown';
import ColorPicker, {
  Preview,
  OpacitySlider,
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker';
export default function Vcard_QR() {
  const isLoading = useSelector(state => state.feature.isLoading);
  const theme = useSelector(state => state.theme.data);
  const navigation = useNavigation();
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'));
  };
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [choiceColor, setchoiceColor] = useState(true);
  const [selectedColor, setSelectedColor] = useState('red'); // Initial color
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleColorChange = color => {
    setSelectedColor(color.hex);
  };
  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#f0f0f0' : '#333'}}>
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
              Vcard QR
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
            backgroundColor: '#fff',
            alignItems: 'center',
            height: hp(12),

            paddingHorizontal: 15,
            marginTop: 20,
          }}>
          <View style={{width: '80%'}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: textColor}}>
              DemoTest vcard QR code
            </Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Entypo name="share-alternative" size={20} />
              <Text style={{fontSize: 14, marginLeft: 5, width: '80%'}}>
                {' '}
                https://cards.forebearpro.co.in/cards/DemoTest
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <FontAwesome5 name="copy" size={25} color={textColor} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                flexDirection: 'row',

                borderWidth: 1,
                alignItems: 'center',
                padding: 5,
                marginLeft: 10,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                height: hp(5),
              }}>
              <Entypo name="dots-three-vertical" size={20} color={'#333'} />
              <AntDesign name="caretdown" size={15} color={'#333'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.contentContainer,
            {height: hp(35), backgroundColor: bgColor},
          ]}>
          <Image
            source={require('../image/qr.png')}
            style={{height: '95%', width: '100%'}}
            resizeMode="contain"
          />
        </View>
        <View
          style={[
            styles.contentContainer,
            {
              height: hp(50),

              backgroundColor: bgColor,
            },
          ]}>
          <View style={{}}>
            <View
              style={{
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  marginHorizontal: 10,
                  fontWeight: '600',
                }}>
                Foreground color
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                width: '100%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: hp(choiceColor ? 25 : 8),
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    marginTop: 10,
                  }}>
                  <ColorPicker
                    style={{width: '100%', justifyContent: 'center'}}
                    sliderThickness={30}
                    thumbSize={40}
                    value={selectedColor}
                    onChange={handleColorChange}
                    thumbShape="pill">
                    <TouchableOpacity
                      onPress={() => {
                        setchoiceColor(true);
                      }}>
                      <Preview
                        style={[styles.previewStyle, styles.shadow]}
                        hideText={true}
                        hideInitialColor
                      />
                    </TouchableOpacity>

                    {choiceColor && (
                      <>
                        <HueSlider
                          style={[
                            {
                              borderRadius: 5,
                              marginBottom: 25,
                              marginHorizontal: 20,
                            },
                            styles.shadow,
                          ]}
                          thumbShape="line"
                          thumbInnerStyle={{
                            width: 15,
                            borderRadius: 0,
                            backgroundColor: '#f0f0f0',
                          }}
                          thumbColor="#f0f0f0"
                        />

                        <TouchableOpacity
                          onPress={() => {
                            setchoiceColor(false);
                          }}
                          style={{
                            height: '30%',
                            backgroundColor:
                              theme == 'light' ? '#1034a6' : '#333',
                            borderRadius: 5,
                            width: '40%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 18, color: textColor}}>
                            Save
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </ColorPicker>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 5}}>
            <View
              style={{
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: textColor,
                  marginHorizontal: 10,
                  fontWeight: '600',
                }}>
                Background color
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: 10,
                width: '100%',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: hp(choiceColor ? 25 : 8),
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    marginTop: 10,
                  }}>
                  <ColorPicker
                    style={{width: '100%', justifyContent: 'center'}}
                    sliderThickness={30}
                    thumbSize={40}
                    value={selectedColor}
                    onChange={handleColorChange}
                    thumbShape="pill">
                    <TouchableOpacity
                      onPress={() => {
                        setchoiceColor(true);
                      }}>
                      <Preview
                        style={[styles.previewStyle, styles.shadow]}
                        hideText={true}
                        hideInitialColor
                      />
                    </TouchableOpacity>

                    {choiceColor && (
                      <>
                        <HueSlider
                          style={[
                            {
                              borderRadius: 5,
                              marginBottom: 25,
                              marginHorizontal: 20,
                            },
                            styles.shadow,
                          ]}
                          thumbShape="line"
                          thumbInnerStyle={{
                            width: 15,
                            borderRadius: 0,
                            backgroundColor: '#f0f0f0',
                          }}
                          thumbColor="#f0f0f0"
                        />

                        <TouchableOpacity
                          onPress={() => {
                            setchoiceColor(false);
                          }}
                          style={{
                            height: '30%',
                            backgroundColor:
                              theme == 'light' ? '#1034a6' : '#333',
                            borderRadius: 5,
                            width: '40%',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 18, color: textColor}}>
                            Save
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </ColorPicker>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <Text style={[styles.txtName, {color: textColor}]}>
                Corner radius
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
                  {backgroundColor: theme == 'light' ? '#fff' : '#474747',marginTop:10},
                ]}>
                <Slider
                  style={{width:'100%',height:45,}}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 25, paddingHorizontal: 10}}>
            <View
              style={{
                marginHorizontal: 10,
              }}>
              <Text style={[styles.txtName, {color: textColor}]}>QR Type</Text>
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
                  placeholder={!isFocus ? 'Select' : '...'}
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
        </View>
        <View style={{height: hp(20)}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  txtName: {
    fontSize: 18,
    fontWeight: '600',
  },
  inputBox: {
    borderWidth: 1,
    height: hp(7),
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  contentContainer: {
    marginTop: 10,
    paddingTop: 20,

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
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    paddingBottom: 0,
    width: '100%',
    maxWidth: 500,
    margin: 'auto',
  },
  sliderLabel: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  previewStyle: {
    height: 55,
    borderRadius: 5,
    marginBottom: 30,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
const data = [
  {label: 'Noramal', value: '1'},
  {label: 'Insert Custom text', value: '2'},
  {label: 'Insert Custom logo', value: '3'},
];
