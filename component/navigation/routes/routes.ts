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
import EDIT_VCARD from "../../screens/EDIT_VCARD";
import Account_Screen from "../../screens/Account_Screen";
import Vcard_QR from "../../screens/Vcard_QR";
import Edit_Project from "../../screens/Edit_Project";
import Edit_Pixel from "../../screens/Pixel_Edit";
import Edit_Domain from "../../screens/Edit_Domain";
import AccountStack from "../AccountStack";
import PixelStack from "../PixelStack";
import ProjectStack from "../ProjectStack";
import VcardStack from "../VcardStack";
import DomainStack from "../DomainStack";


const _routes = {

  REGISTRATION_ROUTE: [
    { name: ScreenNameEnum.WELCOME_SLIDER_SCREEN, Component: WelcomeSliderScreen, },
    { name: ScreenNameEnum.LOGIN_SCREEN, Component: Login_Screen },
    { name: ScreenNameEnum.REGISTER_SCREEN, Component: REGISTER_SCREEN, },
    { name: ScreenNameEnum.FORGOT_PASSWORD, Component: FORGOT_PASSWORD, },
    { name: ScreenNameEnum.DRAWER_NAVIGATION, Component: Drawer_Navigation, },

  ],



  DRAWER_ROUTE: [

   
    { name: ScreenNameEnum.VCARD_STACK, Component: VcardStack },
    { name: ScreenNameEnum.ACCOUNT_STACK, Component:AccountStack },
    { name: ScreenNameEnum.PIXEL_STACK, Component: PixelStack },
    { name: ScreenNameEnum.PROJECT_STACK, Component: ProjectStack },
    { name: ScreenNameEnum.DOMAIN_STACK, Component: DomainStack },

  ],

  VCARD_STACKS: [
    { name: ScreenNameEnum.HOME_TAB_SCREEN, Component: Home_Screen },
    { name: ScreenNameEnum.VCARD_SCREEN, Component: VCARD_SCREEN },
    { name: ScreenNameEnum.CREATE_VCARD, Component: CREATE_VCARD, },
    { name: ScreenNameEnum.VCARD_QR, Component: Vcard_QR, },
    { name: ScreenNameEnum.EDIT_VCARD, Component: EDIT_VCARD, },
  ],
  PROJECT_STACKS: [
    { name: ScreenNameEnum.PROJECT_SCREEN, Component: PROJECT_SCREEN },
    { name: ScreenNameEnum.CREATE_PROJECT, Component: CREATE_PROJECT, },
    { name: ScreenNameEnum.Edit_Project, Component: Edit_Project, },
  ],
  PIXEL_STACKS: [
    { name: ScreenNameEnum.PIXELS_SCREEN, Component: PIXELS_SCREEN },
    { name: ScreenNameEnum.CREATE_PIXEL, Component: CREATE_PIXEL, },
    { name: ScreenNameEnum.Edit_Pixel, Component: Edit_Pixel, },
  ],

  DOMAIN_STACKS: [
    { name: ScreenNameEnum.CUSTOMDOMAIN_SCREEN, Component: CUSTOMDOMAIN_SCREEN },
    { name: ScreenNameEnum.CONNECT_DOMAIN, Component: CONNECT_DOMAIN, },
    { name: ScreenNameEnum.Edit_Domain, Component: Edit_Domain, },
  ],
  ACCOUNT_STACKS:[
    
    { name: ScreenNameEnum.ACCOUNT_SCREEN, Component: Account_Screen, },
  ]
};

export default _routes;
