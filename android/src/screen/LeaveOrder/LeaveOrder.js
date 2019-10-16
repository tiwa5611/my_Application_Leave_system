import React, { Component } from 'react';
import {ActivityIndicator, View, Text, Dimensions, TouchableOpacity, Image, StatusBar, StyleSheet, FlatList } from 'react-native';
import {createAppContainer, createStackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import  {Container} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
const widthtab = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;
class LeaveOrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading:true,
      dataSource:''
    };
  }

  componentDidMount() {
    fetch('http://leaveuat.greenmile.co.th/api/get_incoming_leave')
    // fetch('http://10.0.2.2:8000/api/get_incoming_leave')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:false,
          dataSource: responseJson.data,
        })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    if(this.state.isloading) {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator  size="large" color="green"/>
        </View>
      );
    } else {
      if(!this.state.dataSource === '') {
        return (
          <Container style={styles.containerStyle}>
            <StatusBar translucent
              backgroundColor="rgba(0, 0, 0, 0.01)"
              animated={false}
            />
            <View>
            <FlatLis
              data={this.state.dataSource}
              renderItem={({item}) => {
                return(
                  <View>
                    <View style={styles.containerListStyle}>
                      <View style={{ width:5, backgroundColor : item.status === 'Approved'? '#379245':'#bcc5bc' }}/>
                      <View style={{marginLeft:10, marginRight:15, alignItems:'center', justifyContent:'center' }}>
                        <Icon name={item.status === 'Approved'? 'check-circle' : 'history' } size={30} color={item.status === 'Approved'? '#379245':'#bcc5bc'}/>
                      </View>
                      <View style={{flexDirection:'column', marginVertical:10}}>
                        <View style={{marginTop:10}}>
                            <Text style={styles.timeStyle}>{item.leave_date}</Text>
                        </View>
                        <View style={{flexDirection:'row'}} >  
                          <Text style={styles.textName}>{item.emp_name}</Text>
                          <Text style={[styles.textName,{ marginLeft:10}]}>({item.status === 'Approved' ? 'อนุมัติ' : 'รออนุมัติ' })</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              }
            />
            </View>
          </Container>
        )
      } else {
        return (
          <Container style={styles.containerStyle}>
              <View style={{flex:1, alignItems:"center", justifyContent:'center'}}>
              { console.log('xxxx')}
                <Icon name={'plane'} size={40} style={[{transform: [{ rotate: '315deg'}]}]} color={'#A3A3A3'}/>
                <Text style={{fontSize:25, color:'#A3A3A3', fontFamily:'Kanit-Regular', marginTop:10}}>ไม่มีข้อมูลการลา</Text>
              </View>
          </Container>
        )
      }
    }
  }
}

export default  LeaveOrder = createAppContainer(createStackNavigator({
    LeaveOrder:{
      screen:LeaveOrderPage
    }
  },{
    defaultNavigationOptions: ({ navigation }) => {
      return {
          headerTransparent:true,
          headerLeft:
          <LinearGradient
            colors={['#348e44', '#90c959']}
            locations={[0,1,0.6]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            style={{flex:1 ,width:widthtab}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{marginTop:40, marginLeft:20 ,marginBottom:10}} onPress={() => navigation.navigate('Dashboard')}>
                <Image source={require('../../images/back_button.png')} style={{height:30, width:30, marginTop:15}}/>
              </TouchableOpacity>
              <View style={{flex:1 ,justifyContent:'center' ,alignItems:'center'}}>
                <Text style={{fontSize:30, fontFamily:'Kanit-Regular', marginTop:45, marginRight:20, color:'white'}}>รายการลา</Text>
              </View>
            </View>
          </LinearGradient>
      };
    }
  }))

  const styles = StyleSheet.create({
    containerStyle:{
      backgroundColor: '#e2e2e2',
      marginTop:height/10.5
    },
    containerListStyle: {
      backgroundColor:'white',
      flexDirection:'row',
    },
    timeStyle:{
      marginTop:5,
      fontSize:(widthtab/19.5), 
      fontFamily:'Kanit-Regular'
    },
    textStatus:{
      fontSize:15,
      marginLeft:15,
      marginTop:5,
      marginBottom:10,
      fontFamily:'Kanit-Regular'
    },
    textName: {
      fontSize:(widthtab/20), 
      fontFamily:'Kanit-Regular', 
      color:'rgba(0, 0, 0, 0.5)'
    }
  })
  
