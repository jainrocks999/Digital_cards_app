import * as React from 'react';
import {Provider} from 'react-redux';
import {LogBox, Text, TouchableOpacity, View} from 'react-native';
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
  const [updatedApp, setUpdatedApp] = React.useState(false);

  React.useEffect(() => {
    getVersion();
  }, []);

  const getVersion = async () => {
    const user = await firestore().collection('versions').get();
    console.log('app js', user?.docs[0]._data);
    setUpdatedVersion(user?.docs[0]._data.version);
  };
  console.log('deviceInfo ', DeviceInfo.getVersion());

  return (
    <>
      {DeviceInfo.getVersion() !== updatedVersion && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
          }}>
          <View
            style={{
              height: '30%',
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
                marginTop: '10%',
              }}>
              Please Update Your App  {updatedVersion}
            </Text>

            <TouchableOpacity
              onPress={() => {}}
              style={{
                backgroundColor: 'green',
                marginTop: '20%',
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
          </View>
        </View>
      )}
      {DeviceInfo.getVersion() === updatedVersion && (
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
