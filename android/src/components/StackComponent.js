import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation'
import DashboardTabNavigator from '../components/TabBarComponent';

export default StackNavigator = createStackNavigator({
    DashboardTabNavigator:DashboardTabNavigator
  },{
      defaultNavigationOptions:({ navigation }) => {
        return {
            header:null,
            //headerTransparent:true,
            // headerLeft:
            // <LinearGradient
            //   start={{x: 0, y: 0}} end={{x: 0, y: 1}}
            //   //locations={[0,0.5,0.6]}
            //   colors={['#328e44', '#76b852']}
            //   style={{flex:1 ,width:width}}>
            //   <TouchableOpacity style={{marginTop:30, marginLeft:20 }}>
            //     <Icon name="bars" size={30} color={'black'}
            //       onPress={ () => navigation.openDrawer() }
            //     />
            //   </TouchableOpacity>
            // </LinearGradient>
            
        };
      },
  });