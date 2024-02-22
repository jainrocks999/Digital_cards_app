import {View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';

export default function FORGOT_PASSWORD() {
  return (
    <View style={{flex: 1}}>
          <ScrollView >
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 30}}>Digital Card</Text>
      </View>
      <View
        style={{
          marginTop: 20,
         marginHorizontal: 20,
         backgroundColor: '#fff',
          borderRadius: 10,
          padding: 10,
         flex:1
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '10%',
            marginTop: 30,
          }}>
          <Text style={{fontSize: 20}}>Reset Password</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#5a9463',
            marginHorizontal: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginTop: 80,
          }}>
          <TextInput placeholder="Email" />
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 50,
            borderRadius: 5,
            justifyContent: 'center',
            height: 45,
            backgroundColor: '#4d6df0',
          }}>
          <Text style={{color: '#fff', fontSize: 18}}>
            Send Password Rest Link
          </Text>
        </TouchableOpacity>
        <View  style={{height:45}}/>
      </View>
      </ScrollView>
   </View>
  );
}
