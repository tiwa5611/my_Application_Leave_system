import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {Container} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';


export default class ContentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.closeDrawer = this.closeDrawer.bind(this);
    this.pressLink = this.pressLink.bind(this);
  }

  closeDrawer() {
    this.props.drawerMethods.closeDrawer();
  }

  pressLink(screen) {
    this.props.navigate.navigate(screen);
    this.props.drawerMethods.closeDrawer();
  }

  render() {
    return (
        <Container>
            <ImageBackground source={require('../images/bac_login.png')} style={{flex:1, backgroundColor:'transparent'}}>
                <TouchableOpacity activeOpacity={1} style={{ marginTop:30, marginLeft:20,}} onPress={()=> this.props.navigation.closeDrawer()}>
                    <Image source={require('../images/ga_bath.png')} style={{width:40, height:40,}}/>
                </TouchableOpacity>
                <View style={styles.imageStyle}>
                    <Image source={require('../images/logo_drawer.png')} style={{width:180, height:180}}/>
                </View>
                <View style={styles.textGroupStyle}>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.pressLink('Calendar')}>
                        {/* onPress={()=> this.props.navigation.navigate('Calendar') */}
                        <Text style={styles.textStyle}>หน้าหลัก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.props.navigation.navigate('Create')}>
                        <Text style={styles.textStyle}>แบบฟอร์มใบลา</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.props.navigation.navigate('History')}>
                        <Text style={styles.textStyle}>ประวัติการลา</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.props.navigation.navigate('Profile')}>
                        <Text style={styles.textStyle}>ประวัติส่วนตัว</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.props.navigation.navigate('Leaveorder')}>
                        <Text style={styles.textStyle}>รายการลา</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} style={styles.styleBlockButton} onPress={()=> this.deleteToken()}>
                    {/* this.props.navigation.navigate('Login') */}
                        <Text style={styles.textStyle}>ออกจากระบบ</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Container>
      
    );
  }

  async deleteToken () {
    try {
        await AsyncStorage.removeItem('user_token')
        RNRestart.Restart();
        return this.props.navigation.navigate('Login');
    } catch(error) {
    alert("error:", error)
    }
  }
}

const styles = StyleSheet.create({
    imageStyle:{
        alignItems:'center',
        marginTop:-10
    },
    textGroupStyle:{
        alignItems:'center',
        marginTop:30
    },
    textStyle:{
        fontSize:25,
        color:'white',
        fontFamily:'Kanit-Regular'
    },
    styleBlockButton:{
        marginTop:20
    }

})
