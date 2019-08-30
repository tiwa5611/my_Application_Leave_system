import React, { Component } from 'react';
import {Text, StatusBar, View, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
import {Container, Card} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import LeaveType from './LeaveType';
import LeaveTime from './LeaveTime';
import Period from './Period';
import LeaveReason from './LeaveReason';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
     }
  }
  render() {    
      return (
      <Container style={styles.ContainerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          animated
        />
        <ImageBackground source={require('../../images/background_two.png')} style={{position:'absolute', width:'100%',  height:height*0.8}}/>
          <Image source={require('../../images/screen_create.png')} style={styles.imageView} />
            <ScrollView>
              <View style={{flexDirection:'row', paddingHorizontal:width/12, justifyContent:'space-between', marginTop: 20,}}>
                <Text style={styles.textTitle}>แบบฟอร์มใบลา</Text>
              </View>
              <View style={{ paddingHorizontal:10, marginTop:10}}>
                <Card style={styles.cardStyle}>
                    <LeaveType/>
                    <Text style={{fontSize:20, fontFamily:'Kanit-Regular', color:'gray', marginTop:10, paddingHorizontal:10}} >วันที่ลา</Text>
                    <LeaveTime/>
                    <Text style={{fontSize:20, fontFamily:'Kanit-Regular', color:'gray', marginTop:10, paddingHorizontal:10}} >ระยะเวลา</Text>
                    <Period/>
                    <LeaveReason/>
                    <View style={{paddingHorizontal:10 ,marginTop:30}}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.btnSendstyle}>
                            <Text style={styles.textSendFrom}>ส่งใบลา</Text>
                        </TouchableOpacity>
                    </View>
                </Card> 
              </View>
            </ScrollView>
      </Container>
    );
  }
}

export default CreateScreen = createAppContainer(createStackNavigator({
  Create: { 
    screen: CreatePage
  },
},{

  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerTransparent:true,
      headerLeft:
      <TouchableOpacity style={{marginTop:30, marginLeft:15 ,marginBottom:10}}>
        <Icon name="bars" size={30} color={'white'} style={{marginTop:15}}
          onPress={ () => navigation.openDrawer() }
        />
      </TouchableOpacity>
    };
  }
}));

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: '#e2e2e2',

  },
  textTitle: {
    color:'white',
    fontSize:30,
    fontFamily:'Kanit-Regular',
    marginTop:180,
    //paddingRight:170
  },
  btnSendstyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#328e44',
    color:'green',
    borderRadius:50,
    height:50,
    marginBottom:20
  },
  imageView:{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width:width/1.5, 
      height:width/1.5,
      marginTop:15,
      marginLeft:width/3.4
  },
  cardStyle: {
    paddingHorizontal:10,
    borderRadius:10,
    marginBottom:20,
    flex:1
  },
  textSendFrom: {
    color:'white',
    fontSize:20,
    fontFamily:'Kanit-Regular',
  },
  
});
