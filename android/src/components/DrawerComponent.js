import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import StackComponent from '../components/StackComponent';
import ContentComponent from '../components/ContentComponent';
import CalendarPage from '../screen/home';
import CreatePage from '../screen/create';
import ProfilePage from '../screen/profile';
import HistoryPage from '../screen/history';
import LoginPage from '../screen/login';
import LeaveOrderPage from '../screen/LeaveOrder';
const width = Dimensions.get('window').width;

export default DrawerNavigation = createDrawerNavigator({
  Dashboard: {
    screen: StackComponent,
  },
  Calendar: {
    screen:CalendarPage
  },
  Create: {
    screen:CreatePage
  },
  Profile: {
    screen:ProfilePage
  },
  History: {
    screen:HistoryPage
  },
  Leaveorder: {
    screen:LeaveOrderPage
  },
  Login:{
    screen:LoginPage
  }
},{
  initialRouteName: 'Dashboard',
  contentComponent: ContentComponent,
  drawerWidth: width,
});