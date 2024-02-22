import Drawer_Navigation from "../Drawer_Navigation";
import ScreenNameEnum from "./screenName.enum";
import FORGOT_PASSWORD from "../../screens/FORGOT_PASSWORD";
import Home_Screen from "../../screens/Home_Screen";
import Login_Screen from "../../screens/Login_Screen";
import REGISTER_SCREEN from "../../screens/REGISTER_SCREEN";
import WelcomeSliderScreen from "../../screens/WelcomeSliderScreen";
import PIXELS_SCREEN from '../../screens/PIXELS_SCREEN'
import PROJECT_SCREEN from "../../screens/PROJECT_SCREEN";
import VCARD_SCREEN from "../../screens/VCARD_SCREEN";
import CUSTOMDOMAIN_SCREEN from "../../screens/CUSTOMDOMAIN_SCREEN";
import CREATE_VCARD from "../../screens/CREATE_VCARD";
import CREATE_PIXEL from "../../screens/CREATE_PIXEL";
import CREATE_PROJECT from "../../screens/CREATE_PROJECT";
import CONNECT_DOMAIN from "../../screens/CONNECT_DOMAIN";

import RegistrationRoutes from "../RegistrationRoutes";
import EDIT_VCARD from "../../screens/EDIT_VCARD";
import Account_Screen from "../../screens/Account_Screen";
import Vcard_QR from "../../screens/Vcard_QR";


const _routes = {

  REGISTRATION_ROUTE: [
    { name: ScreenNameEnum.WELCOME_SLIDER_SCREEN, Component: WelcomeSliderScreen, },
    { name: ScreenNameEnum.LOGIN_SCREEN, Component: Login_Screen },
    { name: ScreenNameEnum.REGISTER_SCREEN, Component: REGISTER_SCREEN, },
    { name: ScreenNameEnum.FORGOT_PASSWORD, Component: FORGOT_PASSWORD, },
    { name: ScreenNameEnum.DRAWER_NAVIGATION, Component: Drawer_Navigation, },

  ],



  DRAWER_ROUTE: [

    { name: ScreenNameEnum.HOME_TAB_SCREEN, Component: Home_Screen },
    { name: ScreenNameEnum.VCARD_SCREEN, Component: VCARD_SCREEN },
    { name: ScreenNameEnum.PROJECT_SCREEN, Component: PROJECT_SCREEN },
    { name: ScreenNameEnum.PIXELS_SCREEN, Component: PIXELS_SCREEN },
    { name: ScreenNameEnum.CUSTOMDOMAIN_SCREEN, Component: CUSTOMDOMAIN_SCREEN },
    { name: ScreenNameEnum.CREATE_VCARD, Component: CREATE_VCARD, },
    { name: ScreenNameEnum.CREATE_PIXEL, Component: CREATE_PIXEL, },
    { name: ScreenNameEnum.CREATE_PROJECT, Component: CREATE_PROJECT, },
    { name: ScreenNameEnum.CONNECT_DOMAIN, Component: CONNECT_DOMAIN, },
    { name: ScreenNameEnum.EDIT_VCARD, Component: EDIT_VCARD, },
    { name: ScreenNameEnum.ACCOUNT_SCREEN, Component: Account_Screen, },
    { name: ScreenNameEnum.VCARD_QR, Component: Vcard_QR, },

  ],
};

export default _routes;
