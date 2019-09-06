import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Image, ImageBackground, Dimensions, View, Text } from 'react-native';
import {Container, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSouce:''
    };
  }

  componentDidMount () {
    this.fetchDatafromAIP()
  }

  fetchDatafromAIP = async () => {
    try {
      const token_profile = await AsyncStorage.getItem('user_token');
      if( token_profile != null) {
        let token_value = JSON.parse(token_profile)
        fetch('http://leave.greenmile.co.th/api/profile' , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "token": token_value.token, 
          })
        })
        .then((response) => response.json())
        .then((result) => { 
          this.setState({
            dataSouce:result.data
          })
        }).catch( (error) => {
          alert("result:" + error)
        });
      } else {
        console.log(' hot have token');
      }
    } catch (error) {
      console.log('Error in fucntion geToken:', error);
    }
  }

  render() {
    return (
      <Container style={styles.ContainerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          // animated
        />
          <ImageBackground source={require('../../images/background_one.png')} style={{position:'absolute', width: width,  height:height*0.8}}/>
              <View style={{ paddingHorizontal:10 }}>
              {/* source={require('../../images/background_one.png')} */}
                <Card style={styles.cardStyle}>
                  <View style={{marginTop:-130, alignItems:'center' ,backgroundColor: 'transparent' }}>
                    <Image 
                      style={styles.imageStyle}
                      source={{uri: this.state.dataSouce.picture}}
                      />
                  </View>
                  <View style={styles.textViewStart}>
                    <Text style={styles.textTitle}>รหัสพนักงาน</Text>
                    <Text style={styles.textDetail}>{this.state.dataSouce.emp_code}</Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.textTitle}>ชื่อ-สกุล</Text>
                    <Text style={styles.textDetail}>{this.state.dataSouce.emp_name + ' '+ this.state.dataSouce.emp_lastname}</Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.textTitle}>ตำแหน่ง</Text>
                    <Text style={styles.textDetail}>{this.state.dataSouce.emp_position}</Text>
                  </View>
                  <View style={styles.textViewEnd}>
                    <Text style={styles.textTitle}>อีเมล์</Text>
                    <Text style={styles.textDetail}>{this.state.dataSouce.emp_email}</Text>
                  </View>
                </Card>
              </View>
      </Container>
    );
  }
}

export default ProfileScreen = createAppContainer(createStackNavigator({
  Profile: { 
    screen: ProfilePage
  },
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerTransparent:true,
      headerLeft:
      <TouchableOpacity style={{marginTop:30, marginLeft:20 ,marginBottom:10, flexDirection:'row'}}>
            <Icon name="bars" size={30} color={'white'} style={{marginTop:15}}
              onPress={ () => navigation.openDrawer() }
            />
            <View style={{flex:1 ,justifyContent:'center' ,alignItems:'center'}}>
              <Text style={{fontSize:30, fontFamily:'Kanit-Regular', marginTop:10, marginRight:20, color:'white', paddingHorizontal:(width/2)-115}}>ข้อมูลส่วนตัว</Text>
            </View>
      </TouchableOpacity>
    };
  }
}));

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: '#e2e2e2',
  },
  imageStyle: {
    width:230, 
    height:230,
    borderColor:'white',
    borderWidth:5,
    borderRadius:150,
    // backgroundColor: 'transparent'
  },
  cardStyle:{
    marginTop:230,
    borderRadius:20,
  },
  textTitle: {
    fontSize:18,
    color:'rgba(0, 0, 0, 0.5)',
    fontFamily:'Kanit-Regular'
  },
  textDetail: {
    fontSize:23,
    color:'rgba(0, 0, 0, 0.8)',
    fontFamily:'Kanit-Regular'
  },
  textView: {
    marginTop:5,
    marginBottom:5,
    paddingHorizontal:15
  },
  textViewStart: {
    marginTop:5,
    paddingHorizontal:15
  },
  textViewEnd: {
    marginBottom:25,
    paddingHorizontal:15
  }
});
