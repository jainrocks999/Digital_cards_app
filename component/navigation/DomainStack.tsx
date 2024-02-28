import 'react-native-gesture-handler';
import React, {FunctionComponent} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenNameEnum from './routes/screenName.enum';
import _routes from './routes/routes';


const Stack = createNativeStackNavigator();

const DomainStack: FunctionComponent = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNameEnum.WELCOME_SLIDER_SCREEN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
       
      }}>
      {_routes.DOMAIN_STACKS.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default DomainStack;
