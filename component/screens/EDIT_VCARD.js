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
  Easing,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import React, {useState, useEffect, useCallback} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
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
  heightPercentageToDP,
  widthPercentageToDP,
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
import {
  Block_Edit,
  Block_List,
  Blockdelete,
  CreateBlock,
  PixlsList,
  ProjectList,
  Vcard_Edit,
} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import {heightPercent, widthPrecent} from '../config/responsiveScreen';
export default function EDIT_VCARD({route}) {
  const {edit, E_Id, item} = route.params;

  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.data);
  const [selectedColor, setSelectedColor] = useState('red');
  const [GPreset, setGPreset] = useState({
    color: ['#53bcc9', '#9198cc', '#b881cf', '#d787af', '#f4a373'],
  });
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
  const [PrValue, setPrValue] = useState('select project');
  const [showCustom, setShowCustom] = useState(false);
  const [showPixel, setShowPixel] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [value, setValue] = useState(null);
  const [GradientPreset, setGradientPreset] = useState(false);
  const [Color, setColor] = useState(false);
  const [Gradient, setGradient] = useState(false);
  const [CustomeImage, setCustomeImage] = useState(false);
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
  const [name, setName] = useState('');
  const [BlockValue, setBlockValue] = useState('');
  const [BlockName, setBlockName] = useState('');
  const [blockValueupdated, setblockValueupdated] = useState('');

  // edit card state
  const [UrlAlias, setUrlAlias] = useState('');
  const [EditName, setEditName] = useState('');
  const [EditDescription, setEditDescription] = useState('');
  const [DSButton, setDSButton] = useState(false);
  const [DVDButton, setDVDButton] = useState(false);
  const [VAButton, setVAButton] = useState(false);
  //vcard details
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Company, setCompany] = useState('');
  const [JobTitle, setJobTitle] = useState('');
  const [Birthday, setBirthday] = useState(new Date());

  // customizations
  const [CustomTheme, setCustomTheme] = useState('');
  const [Logo, setLogo] = useState('');
  const [Favicon, setFavicon] = useState('');
  const [Background, setBackground] = useState('');
  const [FontFamily, setFontFamily] = useState('');
  const [FontFamilyValue, setFontFamilyValue] = useState('');
  const [FontSize, setFontSize] = useState('');
  const [CustomIndex, setCustomIndex] = useState(0);

  const [firstColor, setFirstColor] = useState('red');
  const [firstChoiceColor, setfirstChoiceColor] = useState(true);
  const [SecondColor, setSecondColor] = useState('red');
  const [SecondChoiceColor, setSecondChoiceColor] = useState(true);
  const [CustImage, setcustImage] = useState('');
  //pixels
  const [selectedItems, setSelectedItems] = useState([]);
  // seo
  const [SEVisiable, setSEVisiable] = useState(false);
  const [PTitle, setPTitle] = useState('');
  const [MDescription, setMDescription] = useState('');
  const [MKeyword, setMKeyword] = useState('');
  const [OpenGImage, setOpenGImage] = useState(null);

  //advance
  const [RBranding, setRBranding] = useState(false);
  const [Project, setProject] = useState('');
  const [LeapLink, setLeapLink] = useState('');
  const [ProPassword, setProPassword] = useState('');
  const [customCSS, setcustomCSS] = useState('');
  const [customJS, setcustomJS] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const changeTheame = async () => {
    await AsyncStorage.setItem('theme', theme == 'light' ? 'dark' : 'light');
    dispatch(changeTheme(theme == 'light' ? 'dark' : 'light'));
  };
  useEffect(() => {
    setSetting(edit);
    setEditName(item.name);
    setEditDescription(item.description);
    setUrlAlias(item.url_alias.substring(item.url_alias.lastIndexOf('/') + 1));
    setDSButton(item.display_share_button == 1 ? true : false);
    setDVDButton(item.display_vcard_download_button == 1 ? true : false);
    setVAButton(item.vcard_is_active == 1 ? true : false);
    setFirstName(item.first_name == null ? '' : item.first_name);
    setLastName(item.last_name == null ? '' : item.last_name);
    setCompany(item.company == null ? '' : item.company);
    setJobTitle(item.job_title == null ? '' : item.job_title);
    setBirthday(
      item.birthday == null
        ? new Date().toISOString().split('T')[0]
        : item.birthday,
    );
    setCustomIndex(
      Number(item.theme) == 0 ? Number(item.theme) : Number(item.theme) - 1,
    );
    setBackground(item.background);
    check_Dropdown(item.background, null);
    setFavicon(item.favicon == null ? '' : item.favicon?.url);
    setLogo(item.logo == null ? '' : item.logo?.url);
    setcustImage(item.custom_image == null ? null : item.custom_image);
    setSelectedColor(item.color == null ? 'skyblue' : item.color);
    setFirstColor(item.first_color == null ? item.first_color : 'blue');
    setSecondColor(item.second_color == null ? item.second_color : 'red');
    setFontFamily(item.font_family);
    setFontSize('' + item.font_size);
    setSEVisiable(item.search_engine_visibility == 1 ? true : false);
    setPTitle(item.page_title);
    setMKeyword(item.meta_keywords);
    setMDescription(item.meta_description);
    setOpenGImage(
      item.opengraph_image == null ? '' : item.opengraph_image?.url,
    );
    setLeapLink(item.leap_link_url);
    setProject(item.project);
    setRBranding(item.remove_branding == 1 ? true : false);
    setcustomCSS(item.custom_css);
    setcustomJS(item.custom_js);
    setProject(item.project);
    checkProject();
  }, [edit, item]);

  const isFocused = useIsFocused();

  const showDetails = index => {
    const stateVariables = [
      [SetshowVcard, 'showVcard'],
      [setShowAdvanced, 'showAdvanced'],
      [setShowCustom, 'showCustom'],
      [setShowPixel, 'showPixel'],
      [setShowSeo, 'showSeo'],
    ];

    stateVariables.forEach(([stateVar, stateName], i) => {
      if (i === index) {
        stateVar(prevState => !prevState);
      } else {
        // Assuming other state variables are boolean
        stateVar(false);
      }
    });

    setShowIndex(index);
  };

  const handleSelection = index => {
    const selectedItem = PixelList[index];

    // Check if the item is already selected
    const isSelected = selectedItems.some(
      item => item.name === selectedItem.name,
    );

    if (isSelected) {
      // If selected, remove it from the list
      const updatedItems = selectedItems.filter(
        item => item.name !== selectedItem.name,
      );
      setSelectedItems(updatedItems);
    } else {
      // If not selected, add it to the list
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleColorChange = color => {
    setSelectedColor(color.hex);
    setBackground(color.hex);
  };
  const handlefirstColor = color => {
    setFirstColor(color.hex);
    setBackground(color.hex);
  };
  const secondHandlecolor = color => {
    setSecondChoiceColor(color.hex);
  };
  const check_Dropdown = (label, value) => {
    setValue(value);
    setBackground(label);

    const dropdownStates = {
      'Gradient Preset': {
        GradientPreset: true,
        Color: false,
        Gradient: false,
        CustomeImage: false,
      },
      Color: {
        GradientPreset: false,
        Color: true,
        Gradient: false,
        CustomeImage: false,
      },
      Gradient: {
        GradientPreset: false,
        Color: false,
        Gradient: true,
        CustomeImage: false,
      },
      'Custome image': {
        GradientPreset: false,
        Color: false,
        Gradient: false,
        CustomeImage: true,
      },
    };

    const dropdownUpdates = dropdownStates[label] || {};

    // Update the dropdown states
    setGradientPreset(dropdownUpdates.GradientPreset || false);
    setColor(dropdownUpdates.Color || false);
    setGradient(dropdownUpdates.Gradient || false);
    setCustomeImage(dropdownUpdates.CustomeImage || false);
  };

  const openCustomImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
        setcustImage(response.assets[0].uri);
      }
    });
  };

  const checkProject = () => {
    ProjectData?.map(item => {
      if (item.id == Project) {
        setPrValue(item.name);
      }
    });
  };
  function arraysMatch(arr1, arr2) {
    return (
      arr1.length === arr2.length &&
      arr1.every((value, index) => value === arr2[index])
    );
  }
  const openLogoImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
        setLogo(response.assets[0].uri);
      }
    });
  };
  const openFaviconImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && !response.error) {
        setFavicon(response.assets[0].uri);
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
    const modalStates = {
      Email: {
        Email: true,
        Facebook: false,
        Insta: false,
        Twitter: false,
        Youtube: false,
      },
      YouTube: {
        Email: false,
        Facebook: false,
        Insta: false,
        Twitter: false,
        Youtube: true,
      },
      Instagram: {
        Email: false,
        Facebook: false,
        Insta: true,
        Twitter: false,
        Youtube: false,
      },
      FaceBook: {
        Email: false,
        Facebook: true,
        Insta: false,
        Twitter: false,
        Youtube: false,
      },
      Twitter: {
        Email: false,
        Facebook: false,
        Insta: false,
        Twitter: true,
        Youtube: false,
      },
    };

    const modalUpdates = modalStates[type] || {};

    setModalEmail(modalUpdates.Email || false);
    setModalFacebook(modalUpdates.Facebook || false);
    setModalInsta(modalUpdates.Insta || false);
    setModalTwitter(modalUpdates.Twitter || false);
    setModalYoutube(modalUpdates.Youtube || false);
  };

  const getDataApi = useCallback(async () => {
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
    };
    dispatch(Block_List(params));
  }, [dispatch, user?.data.id, user?.data.token]);
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
  }, [dispatch, user?.data.id, user?.data.token]);

  useEffect(() => {
    getDataApi();
    getDataApiPixel();
    getDataApiProject();
  }, [isFocused, getDataApi]);

  const Create_Block = () => {
    if (name !== '' && BlockValue !== '' && btnData !== '') {
      const params = {
        data: {
          user_id: user?.data.id,
          key: name,
          value: BlockValue,
          type: btnData,
          created_by: user?.data.id,
        },
        authToken: user?.data.token,
        user_id: user?.data.id,
      };

      dispatch(CreateBlock(params));
      setModalVisible(false);
      getDataApi();
      check_Modal_click('none');
    } else {
      alert('Please fill all field');
    }
  };
  const Delete_Block = id => {
    const params = {
      authToken: user?.data.token,
      user_id: user?.data.id,
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
            dispatch(Blockdelete(params));
          },
        },
      ],
      {cancelable: false},
    );
    setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
  };

  const openBlockDetails = (item, index) => {
    setBlockName(item.key);
    setblockValueupdated(item.value);
    setBtnData(item.type);
    setBlockListIndex(index);
    setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
  };

  const Block_edit = item => {
    const params = {
      data: {
        id: item.id,
        user_id: user?.data.id,
        key: BlockName,
        value: blockValueupdated,
        type: item.type,
        created_by: user?.data.id,
      },
      authToken: user?.data.token,
      navigation: navigation,
    };
    dispatch(Block_Edit(params));

    getDataApi();
    setShowBlockListDetails(showBlockListDetails => !showBlockListDetails);
  };
  const EditVcards = () => {
    const params = {
      data: {
        url_alias: UrlAlias,
        name: EditName,
        description: EditDescription,
        display_share_button: DSButton ? 1 : 0,
        display_vcard_download_button: DVDButton ? 1 : 0,
        vcard_is_active: VAButton ? 1 : 0,
        first_name: FirstName,
        last_name: LastName,
        company: Company,
        job_title: JobTitle,
        birthday: Birthday,
        theme: CustomTheme,
        background: Background,
        background_preset: GPreset,
        color: selectedColor,
        first_color: firstColor,
        second_color: SecondColor,
        font_family: FontFamily,
        font_size: FontSize,
        pixels: selectedItems,
        search_engine_visibility: SEVisiable ? 1 : 0,
        page_title: PTitle,
        meta_description: MDescription,
        meta_keywords: MKeyword,
        project: Project,
        leap_link_url: LeapLink,
        password: ProPassword,
        remove_branding: RBranding ? 1 : 0,
        custom_css: customCSS,
        custom_js: customJS,
        logo: Logo,
        favicon: Favicon,
        opengraph_image: OpenGImage,
        id: E_Id,
        user_id: user?.data.id,
      },
      authToken: user?.data.token,
      navigation: navigation,
    };

    dispatch(Vcard_Edit(params));
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
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          height: 50,
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

      <ScrollView
        style={{paddingHorizontal: 5}}
        showsVerticalScrollIndicator={false}>
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
                      onChangeText={txt => setEditName(txt)}
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
                      onChangeText={txt => setEditDescription(txt)}
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
                      onValueChange={() => setDSButton(DSButton => !DSButton)}
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
                      onValueChange={() =>
                        setDVDButton(DVDButton => !DVDButton)
                      }
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
                      onValueChange={() => setVAButton(VAButton => !VAButton)}
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
              <View style={{height: heightPercent(5)}} />
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
                        <View style={{paddingHorizontal: 10}}>
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
                                onChangeText={txt => setFirstName(txt)}
                                placeholder="name"
                                placeholderTextColor={textColor}
                                style={{color: textColor}}
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
                                style={{color: textColor}}
                                value={LastName}
                                onChangeText={txt => setLastName(txt)}
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
                                style={{color: textColor}}
                                value={Company}
                                onChangeText={txt => setCompany(txt)}
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
                                style={{color: textColor}}
                                value={JobTitle}
                                onChangeText={txt => setJobTitle(txt)}
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
                                  height: 45,
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
                                {Birthday}
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
                              format="YYYY-MM-DD"
                              open={open}
                              date={new Date()}
                              onConfirm={date => {
                                setOpen(false);
                                setBirthday(date.toISOString().split('T')[0]);
                              }}
                              onCancel={() => {
                                setOpen(false);
                              }}
                            />
                          </View>
                          <View style={{height: heightPercent(5)}} />
                        </View>
                      )}
                      {showIndex == index && showSeo && (
                        <View
                          style={{
                            paddingHorizontal: 10,
                            marginTop: 10,
                          }}>
                          <View>
                            <View style={{flexDirection: 'row'}}>
                              <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={SEVisiable ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() =>
                                  setSEVisiable(SEVisiable => !SEVisiable)
                                }
                                value={SEVisiable}
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: textColor,
                                }}>
                                Search Engine Visibility
                              </Text>
                            </View>

                            <View style={{marginTop: 5, marginHorizontal: 5}}>
                              <Text style={{color: textColor}}>
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
                                onChangeText={txt => setPTitle(txt)}
                                placeholder={PTitle}
                                placeholderTextColor={textColor}
                                style={{color: textColor}}
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
                                style={{color: textColor}}
                                value={MDescription}
                                onChangeText={txt => setMDescription(txt)}
                                placeholder={MDescription}
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
                                style={{color: textColor}}
                                value={MKeyword}
                                onChangeText={txt => setMKeyword(txt)}
                                placeholder={MKeyword}
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
                              onPress={() => {
                                opengraphImage();
                              }}
                              style={{
                                borderWidth: 1,
                                marginTop: 5,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: hp(10),
                                borderColor: 'grey',
                              }}>
                              {OpenGImage === null && (
                                <Text style={{fontSize: 16, color: textColor}}>
                                  Drop files here to upload
                                </Text>
                              )}
                              {OpenGImage !== null && (
                                <Image
                                  source={{uri: OpenGImage}}
                                  style={{
                                    height: '90%',
                                    width: '95%',
                                    borderRadius: 10,
                                  }}
                                  resizeMode="contain"
                                />
                              )}
                            </TouchableOpacity>
                          </View>
                          <View style={{height: heightPercent(5)}} />
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
                                backgroundColor:
                                  theme === 'light' ? '#f0f0f0' : '#333',
                                paddingHorizontal: 10,
                                height: 40,

                                borderRadius: 5,
                              }}>
                              <AntDesign
                                name="plus"
                                size={15}
                                color={textColor}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
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
                              valueField="id"
                              placeholder={PrValue}
                              value={Project}
                              onChange={item => {
                                setProject(item.name);
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
                                style={{color: textColor}}
                                value={LeapLink}
                                onChangeText={txt => setLeapLink(txt)}
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
                                style={{color: textColor}}
                                value={ProPassword}
                                onChangeText={txt => setProPassword(txt)}
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
                                onValueChange={() =>
                                  setRBranding(RBranding => !RBranding)
                                }
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
                              <Text style={{color: textColor}}>
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
                                style={{color: textColor}}
                                value={customCSS}
                                onChangeText={txt => setcustomCSS(txt)}
                                placeholder={customCSS}
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
                                style={{color: textColor}}
                                value={customJS}
                                onChangeText={txt => setcustomJS(txt)}
                                placeholder={customJS}
                                placeholderTextColor={textColor}
                                multiline={true}
                                numberOfLines={5}
                              />
                            </View>
                          </View>
                          <View style={{height: heightPercent(5)}} />
                        </View>
                      )}
                      {showIndex == index && showCustom && (
                        <View style={{}}>
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

                          <View style={{height: hp(15), alignItems: 'center'}}>
                            <FlatList
                              numColumns={3}
                              data={CustomizationBtn}
                              keyExtractor={item => item.name.toString()}
                              renderItem={({item, index}) => (
                                <TouchableOpacity
                                  onPress={() => {
                                    setCustomTheme(item.name);
                                    setCustomIndex(index);
                                  }}
                                  style={{
                                    height: 43,
                                    marginVertical: 5,
                                    borderRadius: 5,
                                    borderWidth: CustomIndex == index ? 0 : 1,
                                    width: widthPrecent(25),
                                    marginRight: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    backgroundColor:
                                      theme === 'light'
                                        ? CustomIndex == index
                                          ? '#e5e7eb'
                                          : '#fff'
                                        : CustomIndex != index
                                        ? '#333'
                                        : '#e5e7eb',
                                  }}>
                                  <Text
                                    style={{
                                      color:
                                        CustomIndex == index && theme === 'dark'
                                          ? '#333'
                                          : textColor,
                                      fontSize: 14,
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
                          <TouchableOpacity
                            onPress={() => {
                              openLogoImage();
                            }}
                            style={{
                              borderWidth: 1,
                              marginTop: 5,
                              // alignItems: 'center',
                              justifyContent: 'center',
                              height: heightPercent(20),
                              borderColor: 'grey',
                              paddingLeft: 20,
                            }}>
                            {Logo === '' && (
                              <Text style={{fontSize: 16, color: textColor}}>
                                Drop files here to upload
                              </Text>
                            )}
                            {Logo !== '' && (
                              <Image
                                source={{uri: Logo}}
                                style={{
                                  height: '80%',
                                  width: '35%',
                                  borderRadius: 10,
                                }}
                              />
                            )}
                          </TouchableOpacity>
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
                          <TouchableOpacity
                            onPress={() => {
                              openFaviconImage();
                            }}
                            style={{
                              borderWidth: 1,
                              marginTop: 5,
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: hp(20),
                              borderColor: 'grey',
                            }}>
                            {Favicon === '' && (
                              <Text style={{fontSize: 16, color: textColor}}>
                                Drop files here to upload
                              </Text>
                            )}
                            {Favicon !== '' && (
                              <Image
                                source={{uri: Favicon}}
                                style={{
                                  height: '90%',
                                  width: '90%',
                                  borderRadius: 10,
                                }}
                                resizeMode="contain"
                              />
                            )}
                          </TouchableOpacity>
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
                                placeholder={Background}
                                value={value}
                                onChange={item => {
                                  check_Dropdown(item.label, item.value);
                                }}
                              />
                            </View>
                            {GradientPreset && (
                              <View styles={{}}>
                                <FlatList
                                  numColumns={3}
                                  data={GradientPresetData}
                                  renderItem={({item, index}) => (
                                    <TouchableOpacity
                                      onPress={() => {
                                        setselected(index);
                                        setGPreset(item);
                                      }}
                                      style={{
                                        borderWidth: 3,
                                        borderColor: arraysMatch(
                                          item.color,
                                          GPreset.color,
                                        )
                                          ? 'green'
                                          : '#fff',
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

                                <View style={{height: heightPercent(5)}} />
                              </View>
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
                                <View
                                  style={{
                                    marginTop: 10,
                                    height: heightPercent(30),
                                  }}>
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
                                                    color: '#fff',
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
                                <View
                                  style={{
                                    marginTop: 10,
                                    height: heightPercent(30),
                                  }}>
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
                                                    color: '#fff',
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

                                <View style={{height: heightPercent(5)}} />
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
                                <View style={{marginTop: 10, height: hp(30)}}>
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
                                                    color: '#fff',
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
                                <View style={{height: hp(10)}} />
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

                                    height: hp(18),
                                    marginHorizontal: 10,
                                    marginTop: 10,
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                  }}>
                                  {CustImage == null && (
                                    <Text
                                      style={{fontSize: 16, color: textColor}}>
                                      Drop files here to upload
                                    </Text>
                                  )}
                                  {CustImage != null && (
                                    <Image
                                      source={{uri: CustImage}}
                                      style={{
                                        height: '90%',
                                        width: '95%',
                                        padding: 5,
                                      }}
                                    />
                                  )}
                                </TouchableOpacity>

                                <View style={{height: heightPercent(5)}} />
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
                              placeholder={FontFamily}
                              value={FontFamilyValue}
                              onChange={item => {
                                setFontFamily(item.label);
                                setFontFamilyValue(item.value);
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
                              onChangeText={txt => setFontSize(txt)}
                              style={{color: textColor}}
                              placeholder={FontSize}
                              placeholderTextColor={textColor}
                            />
                          </View>
                          <View style={{height: heightPercent(5)}} />
                        </View>
                      )}

                      {showIndex == index && showPixel && (
                        <View style={{marginVertical: 10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: 50,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                width: '40%',

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
                            <View style={{width: '50%', paddingHorizontal: 15}}>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate(
                                    ScreenNameEnum.CREATE_PIXEL,
                                  );
                                }}
                                style={{
                                  height: 40,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  backgroundColor:
                                    theme === 'light' ? '#f0f0f0' : '#333',
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
                                    fontWeight: '500',
                                    color: textColor,
                                  }}>
                                  {' '}
                                  Create Pixel
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          <View
                            style={{
                              marginTop: 10,
                              borderWidth: 1,
                            }}>
                            <FlatList
                              data={PixelList}
                              renderItem={({item, index}) => (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                    width: '100%',
                                    backgroundColor: bgColor,
                                  }}>
                                  <CheckBox
                                    style={{color: textColor, marginLeft: 10}}
                                    tintColors={{
                                      true: '#5ea671',
                                      false: 'black',
                                    }}
                                    disabled={false}
                                    value={selectedItems.some(
                                      selectedItem =>
                                        selectedItem.name === item.name,
                                    )}
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
                            <View style={{height: heightPercent(5)}} />
                          </View>

                          <View style={{height: heightPercent(5)}} />
                        </View>
                      )}
                    </View>
                  )}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  EditVcards();
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
                backgroundColor: theme === 'light' ? '#4b5563' : '#575757',
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
                      onPress={() => {
                        openBlockDetails(item, index);
                      }}
                      style={[
                        styles.nameDiv,
                        {
                          margin: 5,
                          height: hp(8),
                          alignItems: 'center',
                          flexDirection: 'row',
                          backgroundColor: theme === 'light' ? '#fff' : '#333',
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
                      <View style={{marginVertical: 10}}>
                        <View style={{backgroundColor: bgColor}}>
                          <View
                            style={{
                              marginHorizontal: 5,
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
                                onChangeText={txt => setBlockName(txt)}
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
                              marginHorizontal: 5,
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
                                backgroundColor:
                                  theme === 'light' ? '#f0f0f0' : '#333',
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
                              onChangeText={txt => setblockValueupdated(txt)}
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

                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 20,
                            }}>
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
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 20,
                            }}>
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
                              Block_edit(item);
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 20,
                              marginHorizontal: 20,
                              borderRadius: 5,

                              backgroundColor:
                                theme === 'light' ? '#4b5563' : '#333',
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
                              Delete_Block(item.id);
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 20,
                              marginHorizontal: 20,
                              borderRadius: 5,

                              backgroundColor:
                                theme === 'light' ? '#4b5563' : '#333',
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
                <View
                  style={[
                    styles.modalContainer,
                    {marginTop: hp(2), height: hp(90)},
                  ]}>
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

                  <View style={{marginHorizontal: 10, height: hp(80)}}>
                    {!ModalEmail &&
                      !ModalFacebook &&
                      !ModalInsta &&
                      !ModalYoutube &&
                      !ModalTwitter && (
                        <>
                          <FlatList
                            data={ModalData}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                              <TouchableOpacity
                                onPress={() => {
                                  check_Modal_click(item.title, item.url);
                                }}
                                style={{
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 2,
                                  },
                                  shadowOpacity: 0.25,
                                  shadowRadius: 3.84,

                                  elevation: 5,
                                  paddingHorizontal: 15,
                                  marginHorizontal: 5,
                                  borderRadius: 5,
                                  marginVertical: 5,
                                  backgroundColor: bgColor,
                                  height: 50,
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}>
                                {item.title == 'Link' && (
                                  <Entypo name="link" size={25} />
                                )}
                                {item.title == 'Email' && (
                                  <MaterialCommunityIcons
                                    name="email"
                                    size={25}
                                  />
                                )}
                                {item.title == 'Twitter' && (
                                  <AntDesign name="twitter" size={20} />
                                )}
                                {item.title == 'Phone' && (
                                  <AntDesign name="phone" size={20} />
                                )}
                                {item.title == 'YouTube' && (
                                  <AntDesign name="youtube" size={20} />
                                )}
                                {item.title == 'Instagram' && (
                                  <AntDesign name="instagram" size={20} />
                                )}
                                {item.title == 'Github' && (
                                  <AntDesign name="github" size={25} />
                                )}
                                {item.title == 'Linkedin' && (
                                  <AntDesign name="linkedin-square" size={25} />
                                )}
                                {item.title == 'Facebook-messenger' && (
                                  <FontAwesome5
                                    name="facebook-messenger"
                                    size={20}
                                  />
                                )}
                                {item.title == 'Address' && (
                                  <Entypo name="location-pin" size={25} />
                                )}
                                {item.title == 'Spotify' && (
                                  <Entypo name="spotify" size={25} />
                                )}
                                {item.title == 'FaceBook' && (
                                  <Entypo name="facebook" size={25} />
                                )}
                                {item.title == 'Whatsapp' && (
                                  <FontAwesome name="whatsapp" size={25} />
                                )}
                                {item.title == 'reddit' && (
                                  <FontAwesome name="reddit" size={25} />
                                )}
                                {item.title == 'Twitch' && (
                                  <FontAwesome name="twitch" size={25} />
                                )}
                                {item.title == 'Snapchat' && (
                                  <FontAwesome name="snapchat" size={25} />
                                )}
                                {item.title == 'Telegram' && (
                                  <FontAwesome name="telegram" size={25} />
                                )}
                                {item.title == 'TikTok' && (
                                  <FontAwesome5 name="tiktok" size={20} />
                                )}
                                {item.title == 'Discord' && (
                                  <FontAwesome5 name="discord" size={25} />
                                )}
                                {item.title == 'Pinterest' && (
                                  <FontAwesome5 name="pinterest" size={25} />
                                )}

                                <Text
                                  style={{
                                    fontSize: 18,
                                    marginLeft: 10,
                                    color: textColor,
                                    fontWeight: '500',
                                  }}>
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
                                onChangeText={txt => setName(txt)}
                                placeholderTextColor={textColor}
                                placeholder=""
                                style={{
                                  width: '100%',
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
                                width: Btnurl === '@' ? '15%' : '51%',
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
                              onChangeText={txt => setBlockValue(txt)}
                              placeholderTextColor={textColor}
                              placeholder=""
                              style={{
                                fontSize: 14,
                                height: '100%',
                                width: '100%',
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
                                Create_Block();
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

const commonShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  previewStyle: {
    height: 55,
    borderRadius: 5,
    marginBottom: 30,
    ...commonShadow,
  },
  shadow: {
    ...commonShadow,
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
    ...commonShadow,
    marginTop: 15,
    borderRadius: 10,
  },
  div: {
    marginHorizontal: 5,
    ...commonShadow,
    marginTop: 15,
    borderRadius: 5,
  },
  nameDiv: {
    ...commonShadow,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalContainer: {
    ...commonShadow,
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
  {title: 'Link', color: '#4b5563', url: '@'},
  {title: 'Email', color: '#4b5563', url: '@'},
  {title: 'Phone', color: '#4b5563', url: '@'},
  {title: 'Address', color: '#4b5563', url: '@'},
  {title: 'YouTube', color: '#dc3545', url: 'https://youtube.com/'},
  {title: 'Instagram', color: '#ffc107', url: 'https://instagram.com/'},
  {title: 'FaceBook', color: '#4b5563', url: 'https://Facebook.com/'},
  {title: 'Twitter', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Whatsapp', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'TikTok', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Telegram', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Spotify', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Pinterest', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Linkedin', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Snapchat', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Twitch', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Discord', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Github', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'Facebook-messenger', color: '#4b5563', url: 'https://twitter.com/'},
  {title: 'reddit', color: '#4b5563', url: 'https://twitter.com/'},
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
    color: ['#4BC0C8', '#C779D0', '#FEAC5E'],
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
    label: 'Arial',
    value: '1',
  },
  {
    label: 'Verdana',
    value: '2',
  },
  {
    label: 'Helvetica',
    value: '3',
  },
  {
    label: 'Times New Roman',
    value: '4',
  },
  {
    label: 'Inter',
    value: '5',
  },
  {
    label: 'Lato',
    value: '6',
  },
  {
    label: 'Open Sans',
    value: '7',
  },
  {
    label: 'Montserrat',
    value: '8',
  },
  {
    label: 'Kerla',
    value: '9',
  },
  {
    label: 'Incosolata',
    value: '10',
  },
  {
    label: 'default',
    value: '11',
  },
];
