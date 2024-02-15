import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FeatureRoutes from './FeatureRoutes'
 import RegistrationRoutes from './RegistrationRoutes'
const AppNavigator = () => {
  const isAuthenticated = useSelector(state => state.auth.isLogin);

  return (
    <NavigationContainer>
      {isAuthenticated ? <FeatureRoutes /> : <RegistrationRoutes />}
    </NavigationContainer>
  );
};
export default AppNavigator;
