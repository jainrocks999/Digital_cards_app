import {
  View,
  Text,
  Image,
  Vibration,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../Loader';
import { register } from '../redux/feature/RegisterSlice';

export default function REGISTER_SCREEN() {
  const navigation = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const isFatching = useSelector(state => state.theme.data.isLoading);
  const [error, setError] = useState('');


  const validateEmail = email => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordRegex.test(password);
  };

  const Register = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      alert(password)
      setError(
        'Password must contain at least 8 characters, including  letters ,least one special character,  and numbers.',
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }
const params = {
  data:{
    name:name,email: email,password: password
  },
  navigation:navigation
}
    dispatch(register())
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isFatching ? <Loading /> : null}
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
            marginHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            height: hp(95),
            padding: 20,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>Sign Up</Text>
          <View style={{marginTop: 25}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>Name</Text>
            <View
              style={{
                backgroundColor: '#f0f0f0',
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter Name "
                value={name}
                onChangeText={txt => setName(txt)}
              />
            </View>
          </View>
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
                placeholder="Enter Email "
                value={email}
                onChangeText={txt => setEmail(txt)}
              />
            </View>
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
                placeholder="Enter Password "
                value={password}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>
              Confirm Password
            </Text>
            <View
              style={{
                backgroundColor: '#f0f0f0',
                marginTop: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Enter Confirm Password "
                value={confirmPassword}
                onChangeText={txt => setConfirmPassword(txt)}
               
              />
            </View>
            {error ? (
              <Text style={{color: 'red', marginTop: 10, marginLeft: 5}}>
                {error}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 15,
            }}>
            <TouchableOpacity>
              <Text> Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Lost Password</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setError('');
              Register();
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
              Register
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#1034a6'}}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: hp(10)}} />
      </ScrollView>
    </View>
  );
}
