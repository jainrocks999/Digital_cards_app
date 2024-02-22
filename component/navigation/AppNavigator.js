import {NavigationContainer, useNavigation} from '@react-navigation/native';

 import RegistrationRoutes from './RegistrationRoutes'

const AppNavigator = () => {

  return (
    <NavigationContainer>
     <RegistrationRoutes />
    </NavigationContainer>
  );
};
export default AppNavigator;
