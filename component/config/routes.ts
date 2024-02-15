import ScreenNameEnum from "../navigation/routes/screenName.enum";
import FORGOT_PASSWORD from "../screens/FORGOT_PASSWORD";
import Home_Screen from "../screens/Home_Screen";
import Login_Screen from "../screens/Login_Screen";
import REGISTER_SCREEN from "../screens/REGISTER_SCREEN";
import WelcomeSliderScreen from "../screens/WelcomeSliderScreen";



const _routes = {

  REGISTRATION_ROUTE: [
    {name: ScreenNameEnum.WELCOME_SLIDER_SCREEN, Component:WelcomeSliderScreen, },
    {name: ScreenNameEnum.LOGIN_SCRENN, Component:Login_Screen },
    {name: ScreenNameEnum.REGISTER_SCREEN, Component:REGISTER_SCREEN, },
    {name: ScreenNameEnum.FORGOT_PASSWORD, Component:FORGOT_PASSWORD, },
  
  ],


  FEATURE_ROUTE: [
    { name: ScreenNameEnum.HOME_TAB_SCREEN, Component:Home_Screen },
   
  ],
};

export default _routes;
