import Login from '../screen/login';
import AppDrawerNavigator from '../components/DrawerComponent';

export default AppSwitchNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Dashboard: {
        screen: AppDrawerNavigator
    }
})