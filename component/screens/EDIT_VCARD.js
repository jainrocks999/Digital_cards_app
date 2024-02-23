import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {Dropdown} from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import ColorPicker, {
  Preview,
  OpacitySlider,
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker';
export default function EDIT_VCARD() {
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const [selectedColor, setSelectedColor] = useState('#333'); 
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [showIndex, setShowIndex] = useState('21-12-2023');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
  const [showVcard, SetshowVcard] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [showPixel, setShowPixel] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [value, setValue] = useState(null);
  const [GradientPreset, setGradientPreset] = useState(false);
  const [Color, setColor] = useState(false);
  const [Gradient, setGradient] = useState(false);
  const [CustomeImage, setCustomeImage] = useState(false);
  const[images,setImages] = useState('')
  const[imageName,setImageName] = useState('')
  const [choiceColor, setchoiceColor] = useState(true);
  const [selected, setselected] = useState('');
  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  const showDetails = index => {
    setShowIndex(index);

    if (index == 0) {
      SetshowVcard(SetshowVcard => !SetshowVcard);
      setShowAdvanced(false);
      setShowCustom(false);
      setShowPixel(false);
      setShowSeo(false);
    } else if (index == 1) {
      setShowCustom(showCustom => !showCustom);
      setShowAdvanced(false);
      SetshowVcard(false);
      setShowPixel(false);
      setShowSeo(false);
    } else if (index == 2) {
      setShowPixel(showPixel => !showPixel);
      setShowAdvanced(false);
      SetshowVcard(false);
      setShowCustom(false);
      setShowSeo(false);
    } else if (index == 3) {
      setShowSeo(showSeo => !showSeo);
      setShowAdvanced(false);
      SetshowVcard(false);
      setShowCustom(false);
      setShowPixel(false);
    } else if (index == 4) {
      setShowAdvanced(showAdvanced => !showAdvanced);
      setShowPixel(false);
      SetshowVcard(false);
      setShowCustom(false);
      setShowSeo(false);
    }
  };
  const handleColorChange = color => {
    setSelectedColor(color.hex);
  };
  const check_Dropdown = (label, value) => {
    setValue(value);
    if (label === 'Gradient Preset') {
      setGradientPreset(true);
      setColor(false);
      setGradient(false);
      setCustomeImage(false);
    } else if (label === 'Color') {
      setColor(true);
      setGradient(false);
      setGradientPreset(false);
      setCustomeImage(false);
    } else if (label === 'Gradient') {
      setGradient(true);
      setColor(false);

      setGradientPreset(false);
      setCustomeImage(false);
    } else if (label === 'Custome image') {
      setColor(false);
      setGradient(false);
      setGradientPreset(false);

      setCustomeImage(true);
    } else {
      setColor(false);
      setGradient(false);
      setGradientPreset(false);
      setCustomeImage(false);
    }
  };
  const openImageLibrary = () => {

    launchImageLibrary({mediaType: 'photo'}, async response => {

      if (!response.didCancel && !response.error) {

        setImageName(response.assets[0].fileName)
        setImages(response.assets[0].uri);

       
      }
    });
  };
  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
      <ScrollView
        style={{paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
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
              Edit Vcard{' '}
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
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: bgColor,
            height: hp(5),
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
            rohan Vcard
          </Text>
          <AntDesign name="infocirlce" size={20} color={textColor} />
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 5,
            flexDirection: 'row',
            alignItems: 'center',
            height: hp(5),
          }}>
          <EvilIcons name="share-apple" size={30} color={textColor} />
          <Text style={{marginLeft: 5, color: 'blue'}}>
            https://cards.forebearpro.co.in/cards/demo
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#4b5563',
              width: '50%',
              height: 40,
            }}>
            <Text style={{color: textColor, fontSize: 18, color: '#fff'}}>
              Setting
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',

              width: '50%',
              height: 40,
            }}>
            <Text style={{color: textColor, fontSize: 18}}>Blocks</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.div,
            {backgroundColor: bgColor, shadowcolor: textColor},
          ]}>
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
                {' '}
                URL Alias
              </Text>
            </View>
            <View
              style={[
                styles.input,
                {
                  height: hp(7),
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  shadowcolor: textColor,
                },
              ]}>
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
              style={[
                styles.input,
                {
                  height: hp(8),
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  shadowcolor: textColor,
                },
              ]}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <TextInput
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
              style={[
                styles.input,
                {
                  height: hp(8),
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  shadowcolor: textColor,
                },
              ]}>
              <View
                style={{
                  backgroundColor: theme == 'light' ? '#fff' : '#333',
                  paddingHorizontal: 10,
                  width: '100%',
                }}>
                <TextInput
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

          <View style={{height: hp(12), justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <View>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: textColor}}>
                  Display share button
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <View>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: textColor}}>
                  Display Vcard Download Button
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <View>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <View>
                <Text
                  style={{fontSize: 16, fontWeight: '600', color: textColor}}>
                  Vcard Is Active
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginHorizontal: 10}}>
            <FlatList
              data={data}
              renderItem={({item, index}) => (
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      showDetails(index);
                    }}
                    style={{
                      backgroundColor: theme === 'light' ? '#e5e7eb' : '#333',

                      marginVertical: 5,
                      borderRadius: 10,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    {item.name == 'Vcard details' && (
                      <AntDesign name="idcard" size={20} color={textColor} />
                    )}
                    {item.name == 'Customizations' && (
                      <FontAwesome
                        name="paint-brush"
                        size={20}
                        color={textColor}
                      />
                    )}
                    {item.name == 'Pixels' && (
                      <Ionicons
                        name="invert-mode"
                        size={20}
                        color={textColor}
                      />
                    )}
                    {item.name == 'Seo' && (
                      <FontAwesome6
                        name="magnifying-glass-plus"
                        size={20}
                        color={textColor}
                      />
                    )}
                    {item.name == 'Advanced' && (
                      <FontAwesome name="user" size={20} color={textColor} />
                    )}

                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: textColor,
                        marginLeft: 10,
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>

                  {showIndex == index && showVcard && (
                    <View style={{height: hp(65), paddingHorizontal: 10}}>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <FontAwesome5
                            name="signature"
                            size={19}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              marginHorizontal: 10,
                              color: textColor,
                              fontWeight: '600',
                            }}>
                            First Name
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.nameDiv,
                            {
                              backgroundColor:
                                theme === 'light' ? '#e5e7e' : '#333',
                            },
                          ]}>
                          <TextInput
                            placeholder="name"
                            placeholderTextColor={textColor}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <FontAwesome5
                            name="signature"
                            size={19}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              marginHorizontal: 10,
                              color: textColor,
                              fontWeight: '600',
                            }}>
                            Last Name
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.nameDiv,
                            {
                              backgroundColor:
                                theme === 'light' ? '#e5e7eb' : '#333',
                            },
                          ]}>
                          <TextInput
                            placeholder="last name"
                            placeholderTextColor={textColor}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <FontAwesome6
                            name="hotel"
                            size={19}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              marginHorizontal: 10,
                              color: textColor,
                              fontWeight: '600',
                            }}>
                            Company
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.nameDiv,
                            {
                              backgroundColor:
                                theme === 'light' ? '#e5e7eb' : '#333',
                            },
                          ]}>
                          <TextInput
                            placeholder="Company"
                            placeholderTextColor={textColor}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <FontAwesome
                            name="user"
                            size={19}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              marginHorizontal: 10,
                              color: textColor,
                              fontWeight: '600',
                            }}>
                            Job Title
                          </Text>
                        </View>
                        <View
                          style={[styles.nameDiv, {backgroundColor: bgColor}]}>
                          <TextInput
                            placeholder="job title"
                            placeholderTextColor={textColor}
                          />
                        </View>
                      </View>
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <FontAwesome5
                            name="birthday-cake"
                            size={19}
                            color={textColor}
                          />
                          <Text
                            style={{
                              fontSize: 18,
                              marginHorizontal: 10,
                              color: textColor,
                              fontWeight: '600',
                            }}>
                            Birthday
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.nameDiv,
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              backgroundColor: bgColor,
                            },
                          ]}>
                          <Text
                            style={{
                              fontSize: 16,
                              marginLeft: 5,
                              color: textColor,
                            }}>
                            {date.toLocaleDateString('en-GB')}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setOpen(true);
                            }}>
                            <MaterialCommunityIcons
                              name="calendar-blank"
                              size={30}
                              color={textColor}
                            />
                          </TouchableOpacity>
                        </View>

                        <DatePicker
                          mode="date"
                          modal
                          open={open}
                          date={date}
                          onConfirm={date => {
                            setOpen(false);
                            setDate(date);
                          }}
                          onCancel={() => {
                            setOpen(false);
                          }}
                        />
                      </View>
                    </View>
                  )}
                  {showIndex == index && showCustom && (
                    <View
                      style={{
                        paddingBottom: hp(5),
                      }}>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          height: 45,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <FontAwesome5
                          name="paint-roller"
                          size={20}
                          color={textColor}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: textColor,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Theme
                        </Text>
                      </View>

                      <View style={{height: hp(15), justifyContent: 'center'}}>
                        <FlatList
                          numColumns={3}
                          data={CustomizationBtn}
                          keyExtractor={item => item.name.toString()}
                          renderItem={({item}) => (
                            <TouchableOpacity
                              style={{
                                height: 43,
                                marginVertical: 10,
                                borderRadius: 5,
                                width: '32%',
                                marginHorizontal: 5,
                                alignItems: 'center',
                                justifyContent: 'center',

                                backgroundColor:
                                  theme === 'light' ? '#e5e7eb' : '#333',
                              }}>
                              <Text
                                style={{
                                  color: textColor,
                                  fontSize: 16,
                                  fontWeight: '600',
                                }}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          height: 45,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <FontAwesome5
                          name="image"
                          size={20}
                          color={textColor}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: textColor,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Logo
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: hp(20),
                          borderColor: 'grey',
                        }}>
                        <Text style={{fontSize: 16, color: textColor}}>
                          Drop files here to upload
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 10}}>
                        <Text style={{color: textColor}}>
                          Your vcard logo, recommended 1:1 ratio for the logo.
                          .jpg, .jpeg, .png, .svg, .gif, .webp allowed. 2 MB
                          maximum
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          height: 45,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <FontAwesome5
                          name="image"
                          size={20}
                          color={textColor}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: textColor,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Favicon
                        </Text>
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          marginTop: 5,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: hp(20),
                          borderColor: 'grey',
                        }}>
                        <Text style={{fontSize: 16, color: textColor}}>
                          Drop files here to upload
                        </Text>
                      </View>
                      <View style={{marginHorizontal: 10}}>
                        <Text style={{color: textColor}}>
                          Your vcard Favicon, recommended 1:1 ratio for the
                          logo. .jpg, .jpeg, .png, .svg, .gif, .webp allowed. 2
                          MB maximum
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          height: 45,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <FontAwesome5
                          name="image"
                          size={20}
                          color={textColor}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: textColor,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                          Background
                        </Text>
                      </View>
                      <View style={{}}>
                        <View style={{marginTop: 10, marginHorizontal: 10}}>
                          <Dropdown
                            style={[
                              styles.dropdown,
                              {
                                backgroundColor:
                                  theme == 'light' ? '#fff' : '#333',
                              },
                            ]}
                            placeholderStyle={[
                              styles.placeholderStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            selectedTextStyle={[
                              styles.selectedTextStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            showsVerticalScrollIndicator={false}
                            itemContainerStyle={{
                              backgroundColor:
                                theme == 'light' ? '#fff' : '#333',
                            }}
                            activeColor={theme == 'light' ? '#fff' : '#333'}
                            itemTextStyle={{
                              color: textColor,
                            }}
                            data={DropDown}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select item'}
                            value={value}
                            onChange={item => {
                              check_Dropdown(item.label, item.value);
                            }}
                          />
                        </View>
                        {GradientPreset &&(
                          <>
                          <FlatList
                          numColumns={3}
                          data={GradientPresetData}
                   
                          renderItem={({item,index}) => (
                            <TouchableOpacity 

                            onPress={()=>{
                              setselected(index)
                            }}
                            style={{
                              borderWidth:3,
                              borderColor:selected === index?'green':'#fff',
                              height:hp(12),
                              marginVertical: 10,
                          
                              width: '32%',
                              marginHorizontal:2,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            >
                            <LinearGradient 
                            
                            style={{height:'99%',width:'99%',}}
                            colors={item.color}
                            start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                             >
                              
                            </LinearGradient>
                            </TouchableOpacity>
                          )}
                        />
                          </>
                        )

                        }

                        {Gradient && (
                          <>
                            <View
                              style={{marginTop: 25, paddingHorizontal: 10}}>
                              <View style={{marginHorizontal: 10,flexDirection:'row',alignItems:'center'}}>
                                <Ionicons name='color-palette-sharp' size={20} color={textColor}  />
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: textColor,
                                    marginHorizontal: 10,
                                    fontWeight: '600',
                                  }}>
                                First Color
                                </Text>
                              </View>
                           
                            </View>
                            <View style={{marginTop: 10}}>
                           

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
                                      style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                      }}
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
                                          style={[
                                            styles.previewStyle,
                                            styles.shadow,
                                          ]}
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
                                                theme == 'light'
                                                  ? '#1034a6'
                                                  : '#333',
                                              borderRadius: 5,
                                              width: '40%',
                                              alignSelf: 'center',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 18,
                                                color: textColor,
                                              }}>
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
                            <View
                              style={{marginTop:10, paddingHorizontal: 10}}>
                              <View style={{marginHorizontal: 10,flexDirection:'row',alignItems:'center'}}>
                                <Ionicons name='color-palette-sharp' size={20} color={textColor}  />
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: textColor,
                                    marginHorizontal: 10,
                                    fontWeight: '600',
                                  }}>
                               Second Color
                                </Text>
                              </View>
                           
                            </View>
                            <View style={{marginTop: 10}}>
                           

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
                                      style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                      }}
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
                                          style={[
                                            styles.previewStyle,
                                            styles.shadow,
                                          ]}
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
                                                theme == 'light'
                                                  ? '#1034a6'
                                                  : '#333',
                                              borderRadius: 5,
                                              width: '40%',
                                              alignSelf: 'center',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 18,
                                                color: textColor,
                                              }}>
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
                         
                          </>
                        )}                   
                        {Color && (
                          <>
                            <View
                              style={{marginTop: 25, paddingHorizontal: 10}}>
                              <View style={{marginHorizontal: 10,flexDirection:'row',alignItems:'center'}}>
                                <Ionicons name='color-palette-sharp' size={20} color={textColor}  />
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: textColor,
                                    marginHorizontal: 10,
                                    fontWeight: '600',
                                  }}>
                                 Color
                                </Text>
                              </View>
                           
                            </View>
                            <View style={{marginTop: 10}}>
                           

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
                                      style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                      }}
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
                                          style={[
                                            styles.previewStyle,
                                            styles.shadow,
                                          ]}
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
                                                theme == 'light'
                                                  ? '#1034a6'
                                                  : '#333',
                                              borderRadius: 5,
                                              width: '40%',
                                              alignSelf: 'center',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: 18,
                                                color: textColor,
                                              }}>
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
                       
                 
                          </>
                        )}                   
                        
                             {CustomeImage && (
                          <>
                         <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          height: 45,
                          alignItems: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <FontAwesome5
                          name="image"
                          size={20}
                          color={textColor}
                        />
                        <Text
                          style={{
                            fontSize: 18,
                            color: textColor,
                            fontWeight: '600',
                            marginLeft: 10,
                          }}>
                        Custom Image
                        </Text>
                      </View>
                            <TouchableOpacity
                               onPress={() => {
                                openImageLibrary();
                              }}
                              style={{
                                backgroundColor: theme==='light'?'#f0f0f0':'#333',

                                height: hp(15),
                                marginHorizontal: 10,
                                marginTop: 10,
                                borderWidth:1,
                                borderColor:'grey',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent:'center'
                              }}>
                            
                               <Text style={{color:textColor,fontSize:18}}>Drop files here to upload</Text>
                           
                             
                            </TouchableOpacity>
                          </>
                        )}
                      </View>



                      <View
                              style={{marginTop:10, }}>
                              <View style={{marginHorizontal: 10,flexDirection:'row',alignItems:'center'}}>
                                <FontAwesome5 name='pen-nib' size={20} color={textColor}  />
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: textColor,
                                    marginHorizontal: 10,
                                    fontWeight: '600',
                                  }}>
                               Font Family
                                </Text>
                              </View>
                           
                            </View>
                            <View style={{marginTop:10, marginHorizontal: 10}}>
                          <Dropdown
                            style={[
                              styles.dropdown,
                              {
                                backgroundColor:
                                  theme == 'light' ? '#fff' : '#333',
                              },
                            ]}
                            placeholderStyle={[
                              styles.placeholderStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            selectedTextStyle={[
                              styles.selectedTextStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            showsVerticalScrollIndicator={false}
                            itemContainerStyle={{
                              backgroundColor:
                                theme == 'light' ? '#fff' : '#333',
                            }}
                            activeColor={theme == 'light' ? '#fff' : '#333'}
                            itemTextStyle={{
                              color: textColor,
                            }}
                            data={DropDown}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select item'}
                            value={value}
                            onChange={item => {
                              check_Dropdown(item.label, item.value);
                            }}
                          />
                        </View>
                        <View
                              style={{marginTop:10, }}>
                              <View style={{marginHorizontal: 10,flexDirection:'row',alignItems:'center'}}>
                                <MaterialCommunityIcons name='format-font-size-increase' size={25} color={textColor}  />
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: textColor,
                                    marginHorizontal: 10,
                                    fontWeight: '600',
                                  }}>
                             Font Size
                                </Text>
                              </View>
                           
                            </View>
                            <View style={{marginTop:10,
                        
                              
                              marginHorizontal: 10,}}>
                          <Dropdown
                            style={[
                              styles.dropdown,
                              {   
                                backgroundColor:
                                  theme == 'light' ? '#fff' : '#333',
                              },
                            ]}
                            placeholderStyle={[
                              styles.placeholderStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            selectedTextStyle={[
                              styles.selectedTextStyle,
                              {color: textColor, marginLeft: 10},
                            ]}
                            showsVerticalScrollIndicator={false}
                            itemContainerStyle={{
                              backgroundColor:
                                theme == 'light' ? '#fff' : '#333',
                            }}
                            activeColor={theme == 'light' ? '#fff' : '#333'}
                            itemTextStyle={{
                              color: textColor,
                            }}
                            data={DropDown}
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select item'}
                            value={value}
                            onChange={item => {
                              check_Dropdown(item.label, item.value);
                            }}
                          />
                          
                        </View>
                    </View>
                  )}
                </View>
              )}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.EDIT_VCARD);
            }}
            style={{
              marginHorizontal: 20,
              height: hp(6),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme == 'light' ? '#4b5563' : '#363636',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <Text style={{fontWeight: '400', fontSize: 20, color: '#fff'}}>
              Update
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

const styles = StyleSheet.create({  previewStyle: {
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
  input: {
    flexDirection: 'row',
    alignItems: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 8,

    marginTop: 15,

    borderRadius: 10,
  },
  div: {
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
  nameDiv: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const data = [
  {
    name: 'Vcard details',
  },
  {
    name: 'Customizations',
  },
  {
    name: 'Pixels',
  },
  {
    name: 'Seo',
  },
  {
    name: 'Advanced',
  },
];
const CustomizationBtn = [
  {
    name: 'New York',
  },
  {
    name: 'San Francisco',
  },
  {
    name: 'Los Angeles',
  },
  {
    name: 'Chicago',
  },
];
const GradientPresetData = [
  {
    color: ['#53bcc9', '#9198cc', '#b881cf','#d787af','#f4a373']
  },
  {
    color: [ '#6b9ada', '#6b93be','#6c8eaa',]
  },
  {
    color: ['#ffcd94', '#ffb093', '#ff9392',]
  },
  {
    color: ['#5bc6f4', '#9d94bf','#cd6d96']
  },
  {
    color: ['#f394b8', '#f3caba',]
  },
  {
    color: ['#6e6e6e', '#454545',]
  },
 
  {
    color: ['#8fc8f4', '#cae8bc',]
  },
 
];
const DropDown = [
  {label: 'Gradient Preset', value: '1'},
  {label: 'Color', value: '2'},
  {label: 'Gradient', value: '3'},
  {label: 'Custome image', value: '4'},
];
