import React, {FunctionComponent, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenNameEnum from './routes/screenName.enum';
import _routes from '../config/routes';

const Stack = createNativeStackNavigator();

const FeatureRoutes: FunctionComponent<any> = ({
  SceenName,
}: {
  SceenName?: ScreenNameEnum;
}) => {

  console.log(SceenName);
  
  return (
    <Stack.Navigator
      initialRouteName={SceenName}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      {_routes.FEATURE_ROUTE.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default FeatureRoutes;
