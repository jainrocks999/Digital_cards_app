import {View, Text} from 'react-native';
import React, {FunctionComponent} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './Custom_Drawer';
import ScreenNameEnum from './routes/screenName.enum';
import _routes from './routes/routes';

const Drawer = createDrawerNavigator();

const Drawer_Navigation: FunctionComponent<any> = ({
  SceenName,
}: {
  SceenName?: ScreenNameEnum;
}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      {_routes.DRAWER_ROUTE.map(screen => (
        <Drawer.Screen
          key={screen.name}
          options={{headerShown: false}}
          name={screen.name}
          component={screen.Component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default Drawer_Navigation;
