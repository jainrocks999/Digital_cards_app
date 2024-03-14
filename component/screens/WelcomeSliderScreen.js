import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenNameEnum from '../navigation/routes/screenName.enum';
import {useSelector} from 'react-redux';
import Loader from '../Loader';
export default function WelcomeSliderScreen() {
  const isAuthenticated = useSelector(state => state.auth.isLogOut);
  const isLogin = useSelector(state => state.auth.isLogin);

console.log('welcome screen',!isAuthenticated && isLogin);
  const navigation = useNavigation();
const isFoucs = useIsFocused();

  useEffect(()=>{
checkLogout();

  },[isFoucs,isAuthenticated])

  const checkLogout =()=>{
    if(isAuthenticated){

      navigation.navigate(ScreenNameEnum.LOGIN_SCREEN)
    }
    if(!isAuthenticated && isLogin){
      navigation.navigate(ScreenNameEnum.DRAWER_NAVIGATION)
    }
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    {!isAuthenticated && isLogin || isAuthenticated ? <Loader /> : <>

          <View
            style={{
              height: hp('40%'),
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../image/hero.png')}
              style={{height: hp('40%'), width: '90%'}}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{fontSize: 28, fontWeight: '600', color: 'grey'}}>
              Bluestone Smart Card
            </Text>
            <Text
              style={{
                fontSize: 18,
                width: '90%',
                marginTop: 20,
                fontWeight: '600',
              }}>
              Get your new Bluestone Smart ID Card up and running in minutes &
              order a synced physical Bluestone NFC Card
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNameEnum.LOGIN_SCREEN);
            }}
            style={{
              alignItems: 'center',
              width: '80%',
              marginTop: hp(22),
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#1034a6',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              Get started
            </Text>
          </TouchableOpacity>
       
          </>}
    </View>
  );
}
