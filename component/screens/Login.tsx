import {
  View,
  Text,
  Image,
  Vibration,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              <TextInput placeholder="Enter Email " />
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
              <TextInput placeholder="Enter Password " />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              alignItems: 'center',
              marginTop: 25,
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
               navigation.navigate('home');
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
                navigation.navigate('SignUp');
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
