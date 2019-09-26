import {createStackNavigator} from 'react-navigation'
import DashboardTabNavigator from '../components/TabBarComponent';
import EditPage from '../screen/editForm';
export default StackNavigator = createStackNavigator({
    DashboardTabNavigator:DashboardTabNavigator,
    Edit:EditPage
  },{
      defaultNavigationOptions:({ navigation }) => {
        return {
            header:null,
        };
      },
  });