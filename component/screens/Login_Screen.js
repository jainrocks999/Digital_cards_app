import {
  View,
  Text,
  Image,
  Vibration,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import {login} from '../redux/feature/authSlice';
import ScreenNameEnum from '../navigation/routes/screenName.enum';

export default function Login_Screen() {

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  const isError = useSelector(state => state.auth.isError);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  };

  const Login = () => {
    validateEmail();

    if (isValidEmail) {
      const passwordWithoutSpaces = password.replace(/\s/g, '');
      const params = {
        data: {
          email: email,
          password: passwordWithoutSpaces,
        },
        navigation: navigation,
      };
      dispatch(login(params));
    } else {
      console.log('Invalid email or password');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading ? <Loader /> : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            height: hp(35),
          }}>
          <Image
            source={require('../image/logo.png')}
            style={{height: '50%', width: '100%'}}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            shadowColor: '#000',
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: '#fff',
            elevation: 5,
            marginHorizontal: 10,
            height: hp(70),
            padding: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Sign in</Text>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Email</Text>
            <View
              style={{
                backgroundColor: '#f0f0f0',
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <TextInput
                value={email}
                onChangeText={txt => setEmail(txt)}
                placeholder="Enter Email "
              />
            </View>
            {!isValidEmail && (
              <Text style={{color: 'red', marginHorizontal: 5, marginTop: 5}}>
                Please enter a valid email .
              </Text>
            )}
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Password</Text>
            <View
              style={{
                backgroundColor: '#f0f0f0',
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <TextInput
                value={password}
                onChangeText={txt => setPassword(txt)}
                placeholder="Enter Password "
              />
            </View>
          </View>
          {isError && (
            <Text style={{color: 'red', marginHorizontal: 5, marginTop: 5}}>
              Incorrect email or password . Please try again.
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 25,
            }}>
            <TouchableOpacity 
            onPress={()=>setRememberMe(!rememberMe)}
            >
              <Text> Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity
             onPress={() => {
              navigation.navigate(ScreenNameEnum.FORGOT_PASSWORD);
            }}
            >
              <Text>Lost Password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              Login();
            }}
            style={{
              alignItems: 'center',
              width: '80%',
              marginTop: hp(5),
              padding: 15,
              borderRadius: 10,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: '#1034a6',
            }}>
            <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              Login
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ScreenNameEnum.REGISTER_SCREEN);
              }}
              style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#1034a6'}}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
