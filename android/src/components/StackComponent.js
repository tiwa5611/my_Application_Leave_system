import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation'
import DashboardTabNavigator from '../components/TabBarComponent';

export default StackNavigator = createStackNavigator({
    DashboardTabNavigator:DashboardTabNavigator
  },{
      defaultNavigationOptions:({ navigation }) => {
        return {
            header:null,
        };
      },
  });