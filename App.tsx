// In App.js in a new project

import * as React from 'react';
import {Provider} from 'react-redux';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './component/redux/Store';
import AppNavigator from './component/navigation/AppNavigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
