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
  Modal,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import CheckBox from '@react-native-community/checkbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {Dropdown} from 'react-native-element-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';
import ColorPicker, {
  Preview,
  OpacitySlider,
  BrightnessSlider,
  HueSlider,
  SaturationSlider,
} from 'reanimated-color-picker';
import { Block_Edit, Block_List, Blockdelete, CreateBlock, PixlsList, ProjectList } from '../redux/feature/featuresSlice';
import Loader from '../Loader';
export default function EDIT_VCARD({route}) {
  const {edit} = route.params;

  useEffect(() => {
    setSetting(edit);

  }, [edit]);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const [selectedColor, setSelectedColor] = useState('red');
  const PixelList = useSelector(state => state.feature.PixelList);
  const [showIndex, setShowIndex] = useState('21-12-2023');
  const ProjectData = useSelector(state => state.feature.ProjectList);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const isLoading = useSelector(state => state.feature.isLoading);
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
  const [images, setImages] = useState('');
  const [imageName, setImageName] = useState('');
  const [choiceColor, setchoiceColor] = useState(true);
  const [selected, setselected] = useState('');

  const [showSetting, setSetting] = useState(false);
  const [ModalEmail, setModalEmail] = useState(false);
  const [ModalYoutube, setModalYoutube] = useState(false);
  const [ModalInsta, setModalInsta] = useState(false);
  const [ModalFacebook, setModalFacebook] = useState(false);
  const [ModalTwitter, setModalTwitter] = useState(false);
  const [btnData, setBtnData] = useState('none');
  const [Btnurl, setBtnurl] = useState('none');
  const [ModalVisible, setModalVisible] = useState(false);
  const [BlockListIndex, setBlockListIndex] = useState(null);
  const [showBlockListDetails, setShowBlockListDetails] = useState(false);
  const BlockList = useSelector(state => state.feature.BlockList);
  const [name,setName] =useState('')
  const [BlockValue,setBlockValue] =useState('')
  const [BlockName,setBlockName] =useState('')
  const [blockValueupdated,setblockValueupdated] =useState('')
// edit card state
const [UrlAlias,setUrlAlias] = useState('')
const [EditName,setEditName] = useState('')
const [EditDescription,setEditDescription] = useState('')
const [DSButton,setDSButton] =useState(false)
const [DVDButton,setDVDButton] =useState(false)
const [VAButton,setVAutton] =useState(false)
//vcard details 
const [FirstName,setFirstName] = useState('')
const [LastName,setLastName] = useState('')
const [Company,setCompany] = useState('')
const [JobTitle,setJobTitle] = useState('')
const [Birthday,setBirthday] = useState(new Date())

// customizations
const [CustomTheme,setCustomTheme] = useState('')
const [Logo,setLogo] = useState('')
const [Favicon,setFavicon] = useState('')
const [Background, setBackground] =useState('')
const [FontFamily, setFontFamily] =useState('')
const [FontFamilyValue, setFontFamilyValue] =useState('')
const [FontSize, setFontSize] =useState('')
const [CustomIndex,setCustomIndex] =useState(0)
const [firstColor,setFirstColor] = useState('red')
const [firstChoiceColor,setfirstChoiceColor] = useState(true)
const [SecondColor,setSecondColor] = useState('red')
const [SecondChoiceColor,setSecondChoiceColor] = useState(true)
const [CustomImage,setcustomImage] = useState('')
//pixels  
const [selectedItems, setSelectedItems] = useState([]);
// seo 
const [SEVisiable,setSEVisiable] = useState(false)
const [PTitle, setPTitle] = useState('')
const [MDescription, setMDescription] = useState('')
const [MKeyword, setMKeyword] = useState('')
const [OpenGImage,setOpenGImage] =useState('')

//advance 
const [RBranding,setRBranding] =useState(false)
const [Project,setProject] =useState('')
const [LeapLink,setLeapLink] =useState('')
const [ProPassword,setProPassword] =useState('')
const [customCSS,setcustomCSS] =useState('')
const [customJS,setcustomJS] =useState('')

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };

  const isFocused = useIsFocused();
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

  const handleSelection = (index) => {
    const selectedItem = PixelList[index];

    // Check if the item is already selected
    const isSelected = selectedItems.some(item => item.name === selectedItem.name);

    if (isSelected) {
      // If selected, remove it from the list
      const updatedItems = selectedItems.filter(item => item.name !== selectedItem.name);
      setSelectedItems(updatedItems);
    } else {
      // If not selected, add it to the list
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };
  console.log('isSelected=>>>>>>>>>',selectedItems);
  const handleColorChange = color => {
    console.log('color',color.hex);
    setSelectedColor(color.hex);
    setBackground(color.hex)
  };
  const handlefirstColor = color => {
    console.log('first colro',color.hex);
   
    setFirstColor(color.hex);
    setBackground(color.hex)
  };
  const secondHandlecolor = color => {  
    setSecondChoiceColor(color.hex);
   
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

  const openCustomImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
       
        setCustomeImage(response.assets[0].uri);
      }
    });
  };
  const opengraphImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
       
        setOpenGImage(response.assets[0].uri);
      }
    });
  };

  const check_Modal_click = (type, url) => {
    setBtnData(type);
    setBtnurl(url);

    if (type === 'Email') {
      setModalEmail(true);
      setModalFacebook(false);
      setModalInsta(false);
      setModalTwitter(false);
      setModalYoutube(false);
    } else if (type === 'YouTube') {
      setModalEmail(false);
      setModalFacebook(false);
      setModalInsta(false);
      setModalTwitter(false);
      setModalYoutube(true);
    } else if (type === 'Instagram') {
      setModalEmail(false);
      setModalFacebook(false);
      setModalInsta(true);
      setModalTwitter(false);
      setModalYoutube(false);
    } else if (type === 'FaceBook') {
      setModalEmail(false);
      setModalFacebook(true);
      setModalInsta(false);
      setModalTwitter(false);
      setModalYoutube(false);
    } else if (type === 'Twitter') {
      setModalEmail(false);
      setModalFacebook(false);
      setModalInsta(false);
      setModalTwitter(true);
      setModalYoutube(false);
    } else {
      setModalEmail(false);
      setModalFacebook(false);
      setModalInsta(false);
      setModalTwitter(false);
      setModalYoutube(false);
    }
  };

  const getDataApi = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(Block_List(params));
  }, [dispatch, user?.data.id, user?.data.token,]);
  const getDataApiPixel = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(PixlsList(params));
  }, [dispatch, user?.data.id, user?.data.token]);

  const getDataApiProject = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(ProjectList(params));
  }, [dispatch, user?.data.id, user?.data.token,]);



  useEffect(() => {
    getDataApi();
    getDataApiPixel()
    getDataApiProject()

  }, [isFocused, getDataApi,]);



  const Create_Block = () => {
    if(name !== '' && BlockValue !== ''&& btnData !== ''){

    const params = {
      data: {
        user_id: user?.data.id,
        key:name,
        value:BlockValue,
        type:btnData,
        created_by: user?.data.id,
      },
      authToken: user?.data.token,
      user_id: user?.data.id,
      
    };


   dispatch(CreateBlock(params));
setModalVisible(false)
getDataApi()
check_Modal_click('none');
}
else {
  alert('Please fill all field')
}
  };
  const Delete_Block = (id) => {
    

    const params = {
      authToken: user?.data.token,
      user_id: user?.data.id,
      id:id 
    }
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
            dispatch(Blockdelete(params));
          },
        },
      ],
      { cancelable: false }
    );
    setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
  };

  const openBlockDetails =(item,  index)=>{
setBlockName(item.key)
setblockValueupdated(item.value)
setBtnData(item.type)
    setBlockListIndex(index);
 setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
 
}

const Block_edit = (item) => {

  const params = {
    data: {
       id:item.id,
       user_id: user?.data.id,
       key:BlockName,
       value:blockValueupdated,
       type:item.type,
      created_by: user?.data.id,
    },
    authToken: user?.data.token,
    navigation: navigation,
  };
   dispatch(Block_Edit(params))

   getDataApi()
   setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
 
};

  return (
    <View
      style={{flex: 1, backgroundColor: theme == 'light' ? '#fff' : '#333'}}>
        {isLoading ? <Loader /> : null}
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
            onPress={() => {
              setSetting(true);
            }}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showSetting ? '#4b5563' : '#fff',
              width: '50%',
              height: 40,
            }}>
            <Text
              style={{
                color: textColor,
                fontSize: 18,
                color: showSetting ? '#fff' : '#333',
              }}>
              Setting
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSetting(false);
            }}
            style={{
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: showSetting ? '#fff' : '#4b5563',
              width: '50%',
              height: 40,
            }}>
            <Text style={{color: showSetting ? '#333' : '#fff', fontSize: 18}}>
              Blocks
            </Text>
          </TouchableOpacity>
        </View>
        {showSetting && (
          <>
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
                      height: hp(6),
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

                    value={UrlAlias}

                    onChangeText={(txt)=>setUrlAlias(txt)}
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
                    The main URL that your vcard is going to be able accessed
                    from.
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
                      height: hp(7),
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
                      value={EditName}

                      onChangeText={(txt)=>setEditName(txt)}
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
                      height: hp(7),
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
                      value={EditDescription}

                      onChangeText={(txt)=>setEditDescription(txt)}
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
                      thumbColor={DSButton ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={()=>setDSButton(DSButton =>!DSButton)}
                      value={DSButton}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: textColor,
                      }}>
                      Display share button
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                  <View>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={DVDButton ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={()=>setDVDButton(DVDButton =>!DVDButton)}
                      value={DVDButton}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: textColor,
                      }}>
                      Display Vcard Download Button
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 10}}>
                  <View>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={VAButton ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={()=>setVAutton(VAButton=>!VAButton)}
                      value={VAButton}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: textColor,
                      }}>
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
                          backgroundColor:
                            theme === 'light' ? '#e5e7eb' : '#333',

                          marginVertical: 5,
                          borderRadius: 10,
                          height: 45,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}>
                        {item.name == 'Vcard details' && (
                          <AntDesign
                            name="idcard"
                            size={20}
                            color={textColor}
                          />
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
                          <FontAwesome
                            name="user"
                            size={20}
                            color={textColor}
                          />
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
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                              value={FirstName}
                              onChangeText={(txt)=>setFirstName(txt)}
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
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                                value={LastName}
                                onChangeText={(txt)=>setLastName(txt)}
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
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                                value={Company}
                                onChangeText={(txt)=>setCompany(txt)}
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
                              style={[
                                styles.nameDiv,
                                {backgroundColor: bgColor},
                              ]}>
                              <TextInput
                                value={JobTitle}
                                onChangeText={(txt)=>setJobTitle(txt)}
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
                                  height:45,
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
                                {Birthday.toLocaleDateString('en-GB')}
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
                              date={Birthday}
                              onConfirm={date => {
                                setOpen(false);
                                setBirthday(date);
                              }}
                              onCancel={() => {
                                setOpen(false);
                              }}
                            />
                          </View>
                        </View>
                      )}
                      {showIndex == index && showSeo && (
                        <View
                          style={{
                            height: hp(65),
                            paddingHorizontal: 10,
                            marginTop: 10,
                          }}>
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={SEVisiable ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setSEVisiable(SEVisiable=>!SEVisiable)}
                                value={SEVisiable}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color:textColor,
                                }}>
                                Search Engine Visibility
                              </Text>
                            </View>

                            <View style={{marginTop: 5,
                              marginHorizontal: 5}}>
                              <Text style={{color:textColor, }}>
                                If disabled, the vcard will not be indexed by
                                search engines, such as Google or Bing.
                              </Text>
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
                                name="header"
                                size={20}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Page Title
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.nameDiv,
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput

                              value={PTitle}
                              onChangeText={(txt)=>setPTitle(txt)}
                                placeholder="Page Title"
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
                              <MaterialCommunityIcons
                                name="format-pilcrow"
                                size={22}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Meta Description
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.nameDiv,
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                                     value={MDescription}
                                     onChangeText={(txt)=>setMDescription(txt)}
                                placeholder="Meta Description"
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
                              <AntDesign
                                name="wordfile1"
                                size={22}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Meta Keywords
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.nameDiv,
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                                     value={MKeyword}
                                     onChangeText={(txt)=>setMKeyword(txt)}
                                placeholder="Meta Keywords"
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
                                alignItems: 'center',
                              }}>
                              <Entypo
                                name="image"
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
                                Opengraph Image
                              </Text>
                            </View>
                            <TouchableOpacity
                            onPress={()=>{
                              opengraphImage()
                            }}
                              style={{
                                borderWidth: 1,
                                marginTop: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                              height:hp(10),
                                borderColor: 'grey',
                                 
                              }}>
                              <Text style={{fontSize: 16, color: textColor}}>
                                Drop files here to upload
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                      {showIndex == index && showAdvanced && (
                        <View
                          style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginTop: 10,
                                alignItems: 'center',
                              }}>
                              <FontAwesome
                                name="share-alt"
                                size={20}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  color: textColor,
                                  fontSize: 18,
                                  marginLeft: 5,
                                  fontWeight: '500',
                                }}>
                                Project
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginTop: 10,
                                backgroundColor:theme==='light'?'#f0f0f0':'#333',
                                width: '40%',
                                height: 40,
                                paddingHorizontal: 5,
                                borderRadius: 5,
                              }}>
                              <AntDesign
                                name="plus"
                                size={20}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '400',
                                  color: textColor,
                                  marginLeft: 5,
                                }}>
                                Create Project
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={{marginTop: 10}}>
                            <Dropdown
                              style={[
                                styles.nameDiv,
                                {
                                  height: 50,
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
                              data={ProjectData}
                              maxHeight={200}
                              labelField="name"
                              valueField="name"
                              placeholder={'Select item'}
                              value={Project}
                              onChange={item => {
                               setProject(item.name)
                              }}
                            />
                          </View>

                          <View style={{marginTop: 10}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginVertical: 10,
                              }}>
                              <AntDesign
                                name="forward"
                                size={20}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Leap Link Url
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.nameDiv,
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                              value={LeapLink}
                              onChangeText={(txt)=>setLeapLink(txt)}
                                placeholder="Page Title"
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
                              <Entypo name="lock" size={22} color={textColor} />
                       
                       
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Password
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.nameDiv,
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                },
                              ]}>
                              <TextInput
                                value={ProPassword}
                                onChangeText={(txt)=>setProPassword(txt)}
                                placeholder="Meta Description"
                                placeholderTextColor={textColor}
                              />
                            </View>
                          </View>

                          <View style={{marginTop: 10}}>
                            <View style={{flexDirection: 'row'}}>
                              <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={RBranding ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={()=>setRBranding(RBranding=>!RBranding)}
                                value={RBranding}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                                Remove Branding
                              </Text>
                            </View>

                            <View style={{marginTop: 5, marginHorizontal: 5}}>
                              <Text style={{color:textColor}}>
                                If enabled, the vcard won't show the branding of
                                our website.
                              </Text>
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
                                name="css3"
                                size={22}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  marginHorizontal: 10,
                                  color: textColor,
                                  fontWeight: '600',
                                }}>
                                Custom Css
                              </Text>
                            </View>
                            <View
                              style={[
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                  borderRadius: 5,
                                  paddingHorizontal: 5,
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                },
                              ]}>
                              <TextInput
                                value={customCSS}
                                onChangeText={(txt)=>setcustomCSS(txt)}
                                placeholder=""
                                placeholderTextColor={textColor}
                                multiline={true}
                                numberOfLines={5}
                              />
                            </View>
                          </View>

                          <View style={{marginTop: 10}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginVertical: 10,
                                alignItems: 'center',
                              }}>
                              <FontAwesome5Pro
                                name="js"
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
                                Custom Js
                              </Text>
                            </View>
                            <View
                              style={[
                                {
                                  backgroundColor:
                                    theme === 'light' ? '#fff' : '#333',
                                  borderRadius: 5,
                                  paddingHorizontal: 5,
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  marginBottom: 10,
                                },
                              ]}>
                              <TextInput
                                value={customJS}
                                onChangeText={(txt)=>setcustomJS(txt)}
                                placeholder=""
                                placeholderTextColor={textColor}
                                multiline={true}
                                numberOfLines={5}
                              />
                            </View>
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

                          <View
                            style={{height: hp(15), justifyContent: 'center'}}>
                            <FlatList
                              numColumns={3}
                              data={CustomizationBtn}
                              keyExtractor={item => item.name.toString()}
                              renderItem={({item,index}) => (
                                <TouchableOpacity 

                                onPress={()=>{
                                  setCustomTheme(item.name)
                                  setCustomIndex(index)
                                }}
                                  style={{
                                    height: 43,
                                    marginVertical: 10,
                                    borderRadius: 5,
                                    borderWidth:CustomIndex ===index?0:1,
                                    width: '32%',
                              marginHorizontal:2,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    backgroundColor:
                                      theme === 'light' ?  CustomIndex === index ?'#e5e7eb' :'#fff' :  CustomIndex !== index ?'#333':'#e5e7eb',
                                  }}>
                                  <Text
                                    style={{
                                      color: CustomIndex === index && theme === 'dark'?'#333':textColor,
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
                              Your vcard logo, recommended 1:1 ratio for the
                              logo. .jpg, .jpeg, .png, .svg, .gif, .webp
                              allowed. 2 MB maximum
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
                              logo. .jpg, .jpeg, .png, .svg, .gif, .webp
                              allowed. 2 MB maximum
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
                            {GradientPreset && (
                              <>
                                <FlatList
                                  numColumns={3}
                                  data={GradientPresetData}
                                  renderItem={({item, index}) => (
                                    <TouchableOpacity
                                      onPress={() => {
                                        setselected(index);
                                        setBackground(item.color)
                                      }}
                                      style={{
                                        borderWidth: 3,
                                        borderColor:
                                          selected === index ? 'green' : '#fff',
                                        height: hp(12),
                                        marginVertical: 10,

                                        width: '32%',
                                        marginHorizontal: 2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                      }}>
                                      <LinearGradient
                                        style={{height: '99%', width: '99%'}}
                                        colors={item.color}
                                        start={{x: 0, y: 0}}
                                        end={{x: 1, y: 0}}></LinearGradient>
                                    </TouchableOpacity>
                                  )}
                                />
                              </>
                            )}

                            {Gradient && (
                              <>
                                <View
                                  style={{
                                    marginTop: 25,
                                    paddingHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      marginHorizontal: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Ionicons
                                      name="color-palette-sharp"
                                      size={20}
                                      color={textColor}
                                    />
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
                                        height: hp(firstChoiceColor ? 25 : 8),
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
                                          value={firstColor}
                                          onChange={handlefirstColor}
                                          thumbShape="pill">
                                          <TouchableOpacity
                                            onPress={() => {
                                              setfirstChoiceColor(true);
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

                                          {firstChoiceColor && (
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
                                                  setfirstChoiceColor(false);
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
                                  style={{
                                    marginTop: 10,
                                    paddingHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      marginHorizontal: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Ionicons
                                      name="color-palette-sharp"
                                      size={20}
                                      color={textColor}
                                    />
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
                                        height: hp(SecondColor ? 25 : 8),
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
                                          value={SecondColor}
                                          onChange={secondHandlecolor}
                                          thumbShape="pill">
                                          <TouchableOpacity
                                            onPress={() => {
                                              setSecondChoiceColor(true);
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

                                          {SecondChoiceColor && (
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
                                                  setSecondChoiceColor(false);
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
                                  style={{
                                    marginTop: 25,
                                    paddingHorizontal: 10,
                                  }}>
                                  <View
                                    style={{
                                      marginHorizontal: 10,
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Ionicons
                                      name="color-palette-sharp"
                                      size={20}
                                      color={textColor}
                                    />
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
                                    openCustomImage();
                                  }}
                                  style={{
                                    backgroundColor:
                                      theme === 'light' ? '#f0f0f0' : '#333',

                                    height: hp(15),
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                  }}>
                                  <Text
                                    style={{color: textColor, fontSize: 18}}>
                                    Drop files here to upload
                                  </Text>
                                </TouchableOpacity>
                              </>
                            )}
                          </View>

                          <View style={{marginTop: 10}}>
                            <View
                              style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <FontAwesome5
                                name="pen-nib"
                                size={20}
                                color={textColor}
                              />
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
                              data={Font_Family}
                              maxHeight={200}
                              labelField="label"
                              valueField="value"
                              placeholder={'Select item'}
                              value={FontFamilyValue}
                              onChange={item => {
                               setFontFamily(item.label)
                               setFontFamilyValue(item.value)
                              }}
                            />
                          </View>
                          <View style={{marginTop: 10}}>
                            <View
                              style={{
                                marginHorizontal: 10,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <MaterialCommunityIcons
                                name="format-font-size-increase"
                                size={25}
                                color={textColor}
                              />
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
                          <View
                            style={[
                              styles.nameDiv,
                              {
                                marginTop: 10,
                                marginHorizontal: 10,
                                backgroundColor:
                                  theme === 'light' ? '#fff' : '#333',
                              },
                            ]}>
                            <TextInput
                            value={FontSize}
                            onChangeText={(txt)=>setFontSize(txt)}
                              placeholder="font-size"
                              placeholderTextColor={textColor}
                            />
                          </View>
                        </View>
                      )}

                      {showIndex == index && showPixel && (
                        <View style={{marginVertical: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginTop: 10,
                                alignItems: 'center',
                              }}>
                              <Ionicons
                                name="invert-mode"
                                size={20}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  color: textColor,
                                  fontSize: 18,
                                  marginLeft: 5,
                                  fontWeight: '500',
                                }}>
                                Pixels
                              </Text>
                            </View>
                            <TouchableOpacity

                            onPress={()=>{
                              navigation.navigate(ScreenNameEnum.CREATE_PIXEL)
                            }}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 10,
                                marginTop: 10,
                                backgroundColor:theme==='light'?'#f0f0f0':'#333',
                                width: '35%',
                                height: 40,
                                paddingHorizontal: 5,
                                borderRadius: 5,
                              }}>
                              <AntDesign
                                name="plus"
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
                                Create Pixel
                              </Text>
                            </TouchableOpacity>
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              marginTop: 10,
                            }}>
                            <FlatList
                            
                              data={PixelList}
                              renderItem={({item, index}) => (
                                <View
                                  style={{
                                    flexDirection: 'row',

                                    height: 45,
                                    
                                    backgroundColor: bgColor,
                                  }}>
                                     <CheckBox
                                      style={{color:textColor,marginLeft:10}}
            disabled={false}
            value={selectedItems.some(selectedItem => selectedItem.name === item.name)}
            onValueChange={() => handleSelection(index)}
          />
                               
                                  <Text
                                    style={{
                                      fontSize: 18,
                                      fontWeight: '500',
                                      color: textColor,
                                      marginLeft: 5,
                                    }}>
                                    {item.name}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontWeight: '600',
                                      color: textColor,
                                      
                                    }}>
                                    - {item.type}
                                  </Text>
                                </View>
                              )}
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
                  style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#fff',
                  }}
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
          </>
        )}

        {!showSetting && (
          <>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginHorizontal: 20,
                borderRadius: 5,
                flexDirection: 'row',
                backgroundColor:theme==='light'?'#4b5563':'#575757',
                height: hp(6),
              }}>
              <AntDesign name="pluscircle" size={25} color={'#fff'} />
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: '600',
                  marginLeft: 20,
                }}>
                Add Block
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                flex: 1,
                paddingVertical: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,

                elevation: 9,
                backgroundColor: bgColor,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}>
              <FlatList
                data={BlockList}
                renderItem={({item, index}) => (
                  <>
                    <TouchableOpacity
                      onPress={() => {openBlockDetails(item,index)}}
                      style={[
                        styles.nameDiv,
                        {
                          margin: 5,
                          height: hp(8),
                          alignItems: 'center',
                          flexDirection: 'row',
                          backgroundColor: theme==='light'?'#fff':'#333',
                        },
                      ]}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: 'blue',
                          marginLeft: 5,
                        }}>
                        {item.key}
                      </Text>
                      <Entypo name="plus" size={30} color={'blue'} />
                    </TouchableOpacity>
                    {BlockListIndex === index && showBlockListDetails && (
                      <View style={{marginVertical:10}}>
                        <View style={{backgroundColor: bgColor}}>
                          <View
                            style={{
                             
                              marginHorizontal:5,
                              marginTop: 10,
                            }}>
                           
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
                              {
                                height: hp(7),
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 5,
                                borderColor: '#f0f0f0',
                              },
                            ]}>
                            <View
                              style={{
                                backgroundColor:
                                  theme == 'light' ? '#fff' : '#333',
                                paddingHorizontal: 10,
                                width: '100%',
                              }}>
                              <TextInput
                                placeholderTextColor={textColor}
                                placeholder={item.key}
                                value={BlockName}
                                onChangeText={(txt)=>setBlockName(txt)}
                                style={{
                                  fontSize: 14,
                                  paddingHorizontal: 10,
                                  color: textColor,
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                            
                              marginHorizontal:5,
                              marginTop: 10,
                            }}>
                       
                            <Text
                              style={{
                                fontSize: 18,
                                marginHorizontal: 10,
                                color: textColor,
                                fontWeight: '600',
                              }}>
                              {'TikTok username'}
                            </Text>
                          </View>
                          <View
                            style={[
                              {
                                height: hp(7),
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 5,
                                borderColor: '#f0f0f0',
                                alignItems: 'center',
                                flexDirection: 'row',
                              },
                            ]}>
                            <View
                              style={{
                                justifyContent: 'center',
                                backgroundColor:theme==='light'?'#f0f0f0':'#333',
                                alignItems: 'center',
                                height: '100%',
                                width: Btnurl === '@' ? '15%' : '60%',
                              }}>
                              <Text
                                style={{
                                  fontSize: Btnurl === '@' ? 22 : 16,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                                {'https://www.forebearpro.in'}
                              </Text>
                            </View>
                            <TextInput

                            value={blockValueupdated}
                            onChangeText={(txt)=>setblockValueupdated(txt)}
                              placeholderTextColor={textColor}
                              placeholder={item.value}
                              style={{
                                fontSize: 14,
                                height: '100%',
                                width: Btnurl === '@' ? '85%' : '40%',
                                color: textColor,
                              }}
                            />
                          </View>


                          <View style={{flexDirection: 'row',
                          alignItems:'center',
                          marginTop:20}}>
                              <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                               Open link in new tab
                              </Text>
                            </View>
                          <View style={{flexDirection: 'row',
                          alignItems:'center',
                          marginTop:20}}>
                              <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                              Block is active
                              </Text>
                            </View>

                            <TouchableOpacity
              onPress={() => {
                Block_edit(item)
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20,
                marginHorizontal: 20,
                borderRadius: 5,
          
                backgroundColor:theme ==='light'?'#4b5563':'#333',
                height: hp(5),
              }}>
             
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: '600',
              
                }}>
                Update
              </Text>
            </TouchableOpacity>
                            <TouchableOpacity
              onPress={() => {
                Delete_Block(item.id)
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:20,
                marginHorizontal: 20,
                borderRadius: 5,
          
                backgroundColor:theme ==='light'?'#4b5563':'#333',
                height: hp(5),
              }}>
             
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontWeight: '600',
              
                }}>
                Delete
              </Text>
            </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </>
                )}
              />
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={ModalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View
                style={{
                  flex: 1,

                  backgroundColor: 'rgba(151, 153, 152, 0.8)',
                }}>
                <View style={[styles.modalContainer, {marginTop: hp(25)}]}>
                  <View
                    style={{
                      marginHorizontal: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{fontSize: 22, fontWeight: '500', color: '#333'}}>
                      Modal Heading
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                      }}>
                      <Entypo name="cross" size={30} color={'#333'} />
                    </TouchableOpacity>
                  </View>

                  <View style={{marginHorizontal: 10}}>
                    {!ModalEmail &&
                      !ModalFacebook &&
                      !ModalInsta &&
                      !ModalYoutube &&
                      !ModalTwitter && (
                        <>
                          <FlatList
                            data={ModalData}
                            keyExtractor={item => item.id}
                            numColumns={3}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                onPress={() => {
                                  check_Modal_click(item.title, item.url);
                                }}
                                style={{
                                  paddingHorizontal: 20,
                                  marginHorizontal: 5,
                                  borderRadius: 5,
                                  marginVertical: 5,
                                  backgroundColor: item.color,
                                  height: 45,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text style={{fontSize: 18, color: '#fff'}}>
                                  {item.title}
                                </Text>
                              </TouchableOpacity>
                            )}
                            ListHeaderComponent={() => (
                              <View
                                style={{
                                  height: hp(6),
                                  justifyContent: 'center',
                                  borderTopWidth: 1,
                                  marginHorizontal: 5,
                                  borderColor: '#f0f0f0',

                                  marginTop: 10,
                                }}>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    fontWeight: '500',
                                    color: '#333',
                                  }}>
                                  Choose an option:
                                </Text>
                              </View>
                            )}
                          />
                        </>
                      )}

                    {ModalEmail ||
                    ModalFacebook ||
                    ModalInsta ||
                    ModalYoutube ||
                    ModalTwitter ? (
                      <>
                        <View style={{backgroundColor: bgColor}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 10,
                              marginTop: 10,
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
                              Name
                            </Text>
                          </View>
                          <View
                            style={[
                              {
                                height: hp(7),
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 5,
                                borderColor: '#f0f0f0',
                              },
                            ]}>
                            <View
                              style={{
                                backgroundColor:
                                  theme == 'light' ? '#fff' : '#333',
                                paddingHorizontal: 10,
                                width: '100%',
                              }}>
                              <TextInput
                                   value={name}
                                   onChangeText={(txt)=>setName(txt)}
                                placeholderTextColor={textColor}
                                placeholder=""
                                style={{
                                  width:'100%',
                                  fontSize: 14,
                                  paddingHorizontal: 10,
                                  color: textColor,
                                }}
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 10,
                              marginTop: 10,
                            }}>
                            <FontAwesome5
                              name="link"
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
                              {btnData}
                            </Text>
                          </View>
                          <View
                            style={[
                              {
                                height: hp(7),
                                borderWidth: 2,
                                borderRadius: 5,
                                marginTop: 5,
                                borderColor: '#f0f0f0',
                                alignItems: 'center',
                                flexDirection: 'row',
                              },
                            ]}>
                            <View
                              style={{
                                justifyContent: 'center',
                                backgroundColor: '#f0f0f0',
                                alignItems: 'center',
                                height: '100%',
                                width: Btnurl === '@' ? '15%' : '50%',
                              }}>
                              <Text
                                style={{
                                  fontSize: Btnurl === '@' ? 22 : 16,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                                {Btnurl}
                              </Text>
                            </View>
                            <TextInput
                            value={BlockValue}
                            onChangeText={(txt)=>setBlockValue(txt)}
                              placeholderTextColor={textColor}
                              placeholder=""
                              style={{
                                fontSize: 14,
                                height: '100%',
                                width:'100%',
                                color: textColor,
                              }}
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              marginVertical: 10,
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                check_Modal_click('none');
                              }}
                              style={{
                                paddingHorizontal: 20,
                                marginHorizontal: 5,
                                borderRadius: 5,
                                marginVertical: 5,
                                backgroundColor: '#dc3545',
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 18, color: '#fff'}}>
                                Back
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                Create_Block()
                              }}
                              style={{
                                paddingHorizontal: 20,
                                marginHorizontal: 5,
                                borderRadius: 5,
                                marginVertical: 5,
                                backgroundColor: '#4b5563',
                                height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 18, color: '#fff'}}>
                                Submit
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </>
                    ) : null}

                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#f0f0f0',
                        marginTop: 20,
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
        <View style={{height: hp(10)}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginHorizontal: 20,
    marginTop: 30,

    backgroundColor: '#fff',
    borderRadius: 5,
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

const ModalData = [
  {title: 'Email', color: '#4b5563', url: '@'},
  {title: 'YouTube', color: '#dc3545', url: 'https://youtube.com/'},
  {title: 'Instagram', color: '#ffc107', url: 'https://instagram.com/'},
  {title: 'FaceBook', color: '#4b5563', url: 'https://instagram.com/'},
  {title: 'Twitter', color: '#4b5563', url: 'https://twitter.com/'},
];
const GradientPresetData = [
  {
    color: ['#53bcc9', '#9198cc', '#b881cf', '#d787af', '#f4a373'],
  },
  {
    color: ['#6b9ada', '#6b93be', '#6c8eaa'],
  },
  {
    color: ['#ffcd94', '#ffb093', '#ff9392'],
  },
  {
    color: ['#5bc6f4', '#9d94bf', '#cd6d96'],
  },
  {
    color: ['#f394b8', '#f3caba'],
  },
  {
    color: ['#6e6e6e', '#454545'],
  },

  {
    color: ['#8fc8f4', '#cae8bc'],
  },
];


const DropDown = [
  {label: 'Gradient Preset', value: '1'},
  {label: 'Color', value: '2'},
  {label: 'Gradient', value: '3'},
  {label: 'Custome image', value: '4'},
];

const Font_Family = [
{
  label:'Arial',
  value: '1'
},
{
  label:'Verdana',
  value: '2'
},
{
  label:'Helvetica',
  value: '3'
},
{
  label:'Times New Roman',
  value: '4'
},
{
  label:'Inter',
  value: '5'
},
{
  label:'Lato',
  value: '6'
},
{
  label:'Open Sans',
  value: '7'
},
{
  label:'Montserrat',
  value: '8'
},
{
  label:'Kerla',
  value: '9'
},
{
  label:'Incosolata',
  value: '10'
},
]
