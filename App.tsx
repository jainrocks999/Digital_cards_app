import * as React from 'react';
import {Provider} from 'react-redux';
import {ImageBackground, LogBox, Text, TouchableOpacity, View} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './component/redux/Store';
import AppNavigator from './component/navigation/AppNavigator';
import DeviceInfo from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import {heightPercentageToDP} from 'react-native-responsive-screen';

function App() {
  const [updatedVersion, setUpdatedVersion] = React.useState('');
  const [RemindME, setRemindMe] = React.useState(true);

  React.useEffect(() => {
    getVersion();
  }, []);

  const getVersion = async () => {
    const user = await firestore().collection('versions').get();
    console.log('app js', user?.docs[0]._data);
    setUpdatedVersion(user?.docs[0]._data.version);
   setRemindMe(DeviceInfo.getVersion() === updatedVersion)

  };
  console.log('version ! ', DeviceInfo.getVersion() !== updatedVersion && !RemindME);
  console.log('version match ', DeviceInfo.getVersion() === updatedVersion && RemindME);

  return (
    <>
      {!RemindME && (
        <View
          style={{
            flex: 1,
        
            backgroundColor: '#f0f0f0',
          }}>
            <ImageBackground style={{flex:1}}   source={require('./component/image/bg.jpg')} >
          <View
            style={{
              position:'absolute',
              bottom:20,
             
              width:'90%',
              borderRadius: 5,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'green',
                fontSize: 22,
                fontWeight: '600',
               marginTop:10
              }}>
              Please Update Your App  {updatedVersion}
            </Text>

            <TouchableOpacity
              onPress={() => {

                setRemindMe(true)
                alert('Update Success enjoy New Features')
              }}
              style={{
                backgroundColor: 'green',
                marginTop:30,
                height: 45,
                borderRadius: 5,
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
                Update App
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { setRemindMe(true)}}
              style={{
                backgroundColor: '#e06951',
                marginTop:20,
                height: 45,
                borderRadius: 5,
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '600', color: '#fff'}}>
              Remind Me Later
              </Text>
            </TouchableOpacity>

            <View  style={{height:50}} />
          </View>

          </ImageBackground>
        </View>
      )}
      {RemindME  && (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigator />
          </PersistGate>
        </Provider>
      )}
    </>
  );
}

export default App;
