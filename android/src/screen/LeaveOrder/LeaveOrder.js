import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, StatusBar, StyleSheet, FlatList } from 'react-native';
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
    };
  }

  render() {
    const data =
        [  
          {
            name: 'ทิวา โคตรชมภู',
            datefrom:'21-08-2019',
            dateto:'21-08-2019',
            status:'อนุมัติ'
          },
          {
            name: 'ทิวา โคตรชมภู',
            datefrom:'21-08-2019',
            dateto:'21-09-2019',
            status:'รออนุมัติ'
          },
          {
            name: 'ทิวา โคตรชมภู',
            datefrom:'21-08-2019',
            dateto:'22-08-2019',
            status:'อนุมัติ'
          }
      ]
    return (
      <Container style={styles.containerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          animated={false}
        />
        <View>
        <FlatList
          data={data}
          renderItem={({item}) => { 
            return(
              <View>
                <View style={styles.containerListStyle}>
                  <View style={{ width:5, backgroundColor : item.status === 'อนุมัติ'? '#379245':'#bcc5bc' }}/>
                  <View style={{marginLeft:10, marginRight:15, alignItems:'center', justifyContent:'center' }}>
                    <Icon name={item.status === 'อนุมัติ'? 'check-circle' : 'history' } size={30} color={item.status === 'อนุมัติ'? '#379245':'#bcc5bc'}/>
                  </View>
                  <View style={{flexDirection:'column', marginVertical:10}}>
                    <View style={{marginTop:10}}>
                        <Text style={styles.timeStyle}>31 สิงหาคม - 2 กันยายน 2019</Text>
                    </View>
                    <View style={{flexDirection:'row'}} >  
                      <Text style={styles.textName}>{item.name}</Text>
                      <Text style={[styles.textName,{ marginLeft:10}]}>({item.status})</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          }
        />
        </View>
      </Container>
    );
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
  
