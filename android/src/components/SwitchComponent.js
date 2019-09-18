import Login from '../screen/login';
import AppDrawerNavigator from '../components/DrawerComponent';
import CreatePage from '../screen/create'

export default AppSwitchNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Dashboard: {
        screen: AppDrawerNavigator
    }
})