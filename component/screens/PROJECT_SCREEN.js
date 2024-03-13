import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
  Modal
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
import { Card } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeTheme} from '../redux/feature/ThemeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {ProjectList, Project_delete} from '../redux/feature/featuresSlice';
import Loader from '../Loader';
import ScreenNameEnum from '../navigation/routes/screenName.enum'
import { heightPercent } from '../config/responsiveScreen';
export default function PROJECT_SCREEN() {
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.feature.isLoading);
  const theme = useSelector(state => state.theme.data);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData);
  const ProjectData = useSelector(state => state.feature.ProjectList);
  const [visible, setVisible] = useState(false);
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [viewProjectData, setViewProjectData] = useState([]);
  const [ModalVisible,setModalVisible]=useState(false)
  let textColor = theme == 'light' ? '#000' : '#fff';
  let bgColor = theme == 'light' ? '#fff' : '#575757';
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
    dispatch(ProjectList(params));
  }, [dispatch, user?.data.id, user?.data.token,]);

  useEffect(() => {
    getDataApi();
  }, [isFocused, getDataApi]);

  const ProjectDelete =(id)=>{
    const params = {
      user_id: user?.data.id,
      authToken: user?.data.token,
      id:id
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
            dispatch(Project_delete(params));
          },
        },
      ],
      { cancelable: false }
    );

    hideMenu();
  }
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
              Projects
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
            height: hp(5),
            alignItems: 'center',
            marginTop: 20,
          
          }}>
          <Text
            style={{
              fontSize:20,
              fontWeight: '600',
              marginHorizontal: 20,
            }}>
            Projects
          </Text>
          <AntDesign name="infocirlce" size={20} color={'#000'} />
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
              navigation.navigate(ScreenNameEnum.CREATE_PROJECT);
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
              Create Project
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
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

        {ProjectData === null && (
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
              There are no projects for now
            </Text>
            <Text style={{fontSize: 16, color: textColor, marginVertical: 10}}>
              Start by creating your first project.
            </Text>
          </View>
        )}

        {ProjectData !== null && (
          <>
       
            <View style={{flex: 1,marginTop:hp(2)}}>
            <FlatList
        data={ProjectData}
        renderItem={({ item, index }) => (
          <Card style={{ margin: 10, marginTop: 5 }}>
            <Card.Content>
              <View style={{ flexDirection: 'row' }}>
                <View style={{width:'60%'}}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '40%' }}>
                  <Text style={{ color:textColor,fontWeight:'600' }}>Name :-</Text>
                </View>
                <View style={{ width: '40%' }}>
                  <Text style={{ color: textColor }}>{item.name}</Text>
                </View>
                </View>
              <View style={{ flexDirection: 'row',marginTop:5 }}>
                <View style={{ width: '40%' }}>
                <Text style={{ color:textColor,fontWeight:'600' }}>Color :-</Text>
                </View>
                <View style={{ width: '40%' }}>
                  <Text style={{ color:textColor }}>{item.color}</Text>
                </View>
                </View>
                </View>
<View style={{flexDirection:'row',width:'40%'}}>

                <TouchableOpacity
                 onPress={() => {
                  setModalVisible(true);
                  setViewProjectData(item);
                  hideMenu();
                }}
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                  }}>
                  <Entypo name="eye" size={20} color={textColor} />
                </TouchableOpacity>
                <TouchableOpacity
                 onPress={() => {
                  navigation.navigate(ScreenNameEnum.Edit_Project, {
                    Project_name: item.name,
                    Project_color: item.color,
                    Project_id: item.id,
                  });
                  hideMenu();
                }}
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                
                  }}>
                  <AntDesign name="edit" size={20} color={textColor} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    ProjectDelete(item.id);
                  }}
                  style={{
                    width: '30%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    
                  }}>
                  <AntDesign name="delete" size={20} color={textColor} />
                </TouchableOpacity>
                </View>
                
              </View>
            </Card.Content>
          </Card>
        )}
      />
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
                    {viewProjectData.id}
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
                    {viewProjectData.name}
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
                    {viewProjectData.color}
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
    alignItems: 'center',


height:50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  viewTxt: {
   
    fontSize:18,
    fontWeight: '600',
  paddingTop:10,
    width: '50%',
    borderRightWidth: 1,
    height:55,
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
