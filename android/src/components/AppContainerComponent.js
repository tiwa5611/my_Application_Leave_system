import {
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation'
import Login from '../screen/login'
import DrawerNavigation from '../components/DrawerComponent';
import LeaveOrderPage from '../screen/LeaveOrder';


const AppSwitchNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Dashboard: {
        screen: DrawerNavigation
    },
    LeaveOrder:{
        screen: LeaveOrderPage
    },
    // Edit: {
    //   screen: EditPage
    // },
    
})
export default AppContainer = createAppContainer(AppSwitchNavigator);