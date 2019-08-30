import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator, createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Calendar from '../screen/home';
import Create from '../screen/create';
import Profile from '../screen/profile';

export default DashboardTabNavigator = createMaterialTopTabNavigator(
    {
      Calendar: {
        screen:Calendar,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="calendar-alt" size={22} color={tintColor} />
          )
        }
      },
      Create: {
        screen:Create,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="paper-plane" size={22} color={tintColor} />
          )
        }
      },
      Profile: {
        screen:Profile,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Icon name="user" size={22} color={tintColor} />
          )
        }
      },
    },
    {
      tabBarPosition:'bottom',
      tabBarOptions:{
        showIcon:true,
        showLabel:false,
        activeTintColor:'green',
        inactiveTintColor:'white',
        style: {
          backgroundColor: '#328e44'
        },
        indicatorStyle: {
          height: null,
          top: 0,
          backgroundColor: '#e2e2e2',
        },
      }
    },
);