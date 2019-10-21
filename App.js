/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import AppContainer from './android/src/components/AppContainerComponent';
import  ModalExample  from './android/src/screen/CheckInternet';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      connection_status : true
    }
    NetInfo.isConnected.addEventListener(
      'connectionChange', (res) => {
          console.log('status: ', res)
          if(res) {
              this.setState({connection_status:true})
          } else {
              this.setState({connection_status:false})
          }
      }
    );
  }
  render() {
    return (
        this.state.connection_status? 
        <AppContainer/>
        :
        <View style={styles.MainContainer}>
          <Icon name={'wifi-off'} size={80} color={'#A3A3A3'}/>
          <Text style={{fontSize: 20, marginTop: 10, fontFamily:'Kanit-Regular', color:'#A3A3A3'}}>กรุณาตรวจเครือข่าย</Text>
        </View>
    )
  }
}
export default App;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2e2e2',
    padding: 20
  },
  TextStyle: {
    fontSize:20,
    textAlign: 'center',
  }
});

