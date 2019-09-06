import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar, TextInput} from 'react-native';
import {Container, Input, Item, Icon} from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      status_token : ''
    };
  }

  componentDidMount () {
    
    // this.conditiongetToken().then(( token ) => {
    //   let status = token
    //   if(status != null) {
    //     return this.props.navigation.navigate('Dashboard')
    //   } else {
    //     console.log('Not have token');
    //   }
    // }).catch((error) =>{
    //   alert("error in page login:", error)
    // }) 
  } 

  render() {

    this.conditiongetToken().then(( token ) => {
      let status = token
      if(status != null) {
        return this.props.navigation.navigate('Dashboard')
      } else {
        console.log('Not have token');
      }
    }).catch((error) =>{
      alert("error in page login:", error)
    }) 

    return (
      <Container>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          animated
        />
        <ImageBackground source={require('../images/bac_login.png')} style={styles.bacground}>
          <StatusBar hidden={false} />
            <KeyboardAwareScrollView behavior="padding" style={{width:'100%'}}>
              <View style={{alignItems:'center', marginTop:'25%'}}>
                <Text style={styles.textTitle}>GreenMile</Text>
                <Text style={styles.textLeave}>LEAVE SYSTEM</Text>
              </View>
              <View style={styles.blockInput}>
                <View style={{paddingHorizontal:50}}>
                  <Text style={styles.textSubtitle}>USERNAME</Text>
                    <Item style={styles.textInput}>
                      <Input 
                        onChangeText={(text) => this.setState({ username:text })}
                        value={this.state.username}
                      />
                    </Item>
                </View>
                <View style={{paddingHorizontal:50 ,marginTop:20}}>
                  <Text style={styles.textSubtitle}>PASSWORD</Text>
                    <Item style={styles.textInput}>
                      <Input 
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password:text })}
                        value={this.state.password}
                      />
                    </Item>
                </View>
                <View style={{paddingHorizontal:50 ,marginTop:30}}>
                  <TouchableOpacity activeOpacity={0.5} style={styles.btnLogin}  onPress={this.clickListener}>
                    <Text style={styles.textLogin}>Login</Text>
                    {/* onPress={() => this.props.navigation.navigate('Dashboard')} */}
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
      </Container>
    );
  }

  clickListener = () => {
    fetch('http://leave.greenmile.co.th/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
                          "username": this.state.username, 
                          "password": this.state.password,
                        })
    }).then((response) => response.json())
    .then((result) => { 
        if(result.data != null) {
          this.saveToken(result.data);
        } else {
          alert('username or password fail.')
        }
    }).catch( (error) => {
      console.log("-------- error ------- " + error);
      alert("result:" + error)
    });
  }

  saveToken = ( token ) => {
    AsyncStorage.setItem('user_token',JSON.stringify(token));
    return this.props.navigation.navigate('Dashboard');
  }

  conditiongetToken = async () => {
   return await AsyncStorage.getItem('user_token');
  }
}

const styles = StyleSheet.create({
  bacground: {
    alignItems:'center',
    width: '100%', 
    height: '100%',
    flexDirection:'column'
  },
  textInput: {
    flexDirection:'column',
    borderBottomColor: 'white',
    borderBottomWidth:5,
  },
  textInput:{
    height:40,
  },
  textSubtitle: {
    fontSize:15,
    color:'white',
    fontFamily: 'Righteous-Regular',
  },
  blockInput:{
    flexDirection:'column',
    marginTop:90,
    width:'100%',
  },
  textTitle:{
    fontSize:50,
    color:'white',
    fontFamily: 'Righteous-Regular',
  },
  textLeave: {
    fontSize:25,
    color:'white',
    fontFamily: 'PermanentMarker-Regular',
  },
  btnLogin: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    color:'green',
    borderRadius:50,
    height:50,
  },
  textLogin: {
    color:'#44bd32',
    fontSize:25,
    fontFamily:'Kanit-Regular',
    marginVertical:10
  }
})
