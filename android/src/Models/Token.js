import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { get } from 'http';

class Token extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token:''
    };
  }

  render() {
    return (
      <View>
          {console.log('Token:', this.getToken())}
        <Text> Token </Text>
      </View>
    );
  }
    getToken = async() => {
        return await AsyncStorage.getItem('user_token');
    }

    returnToken = () => {
        this.getToken().then((token) =>{
            let user_id = token
        })
        return this
    }
}




export default Token;