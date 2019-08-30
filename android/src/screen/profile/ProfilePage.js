import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity, Image, ImageBackground, Dimensions, View, Text } from 'react-native';
import {Container, Card} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createStackNavigator} from 'react-navigation';
const widthtab = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                <Card style={styles.cardStyle}>
                  <View style={{marginTop:-130, alignItems:'center'  }}>
                    <Image source={require('../../images/pee_one.png')} style={styles.imageStyle}/>
                  </View>
                  <View style={styles.textViewStart}>
                    <Text style={styles.textTitle}>รหัสพนักงาน</Text>
                    <Text style={styles.textDetail}>G015</Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.textTitle}>ชื่อ-สกุล</Text>
                    <Text style={styles.textDetail}>นายพีราวิช  ปัญธิเดช</Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.textTitle}>ตำแหน่ง</Text>
                    <Text style={styles.textDetail}>นักพัฒนาระบบ</Text>
                  </View>
                  <View style={styles.textViewEnd}>
                    <Text style={styles.textTitle}>อีเมล์</Text>
                    <Text style={styles.textDetail}>perawit.p@greenmile.co.th</Text>
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
      
      // <LinearGradient
      //   //colors={['#328f44', '#91c958']}
      //   locations={[0.1, 0.9, 0.5, 0]}
      //   start={{ x: 0, y: 1 }}
      //   end={{ x: 1, y: 1 }}
      //   style={{flex:1 ,width:widthtab, backgroundColor:'transparent'}}>
      //   <View style={{flexDirection:'row'}}>
      //     <TouchableOpacity style={{marginTop:30, marginLeft:20 ,marginBottom:10}}>
      //       <Icon name="bars" size={30} color={'white'} style={{marginTop:15}}
      //         onPress={ () => navigation.openDrawer() }
      //       />
      //     </TouchableOpacity>
      //     <View style={{flex:1 ,justifyContent:'center' ,alignItems:'center'}}>
      //       <Text style={{fontSize:30, fontFamily:'Kanit-Regular', marginTop:40, marginRight:20, color:'white'}}>ข้อมูลส่วนตัว</Text>
      //     </View>
      //   </View>
      // </LinearGradient>
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
