import React, { Component } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Container, Card, CardItem, Body, Item} from 'native-base';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LeaveSummary from './LeaveSummary';
import Holiday from './Holiday';
import AsyncStorage from '@react-native-community/async-storage';
const width = Dimensions.get('window').width * 0.9;
const widthtab = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height ;



class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      isloading:true,
      dataSource:''
    };
  }

  componentDidMount() {
    fetch('http://leave.greenmile.co.th/api/get_leave')
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

  getToken = async () => {
    try {
      let token_user = await AsyncStorage.getItem('user_token');
      let parsed = JSON.parse(token_user)
      this.setState({status_token:true})
      console.log('how get token: ', parsed);
    } catch (error) {
      console.log('error didMonth: ', error);
    } 
  }

  render() {

    return (
      <Container style={styles.ContainerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          // animated
        />
        <ImageBackground source={require('../../images/background_one.png')}  style={{position:'absolute', left:0, right:0, width:'100%', height:height*0.8}}/>
        <ScrollView style={{backgroundColor:'transparent'}}>
            <View style={{paddingHorizontal:10, marginTop:80}}>
              <Card style={styles.CalendarCard}>
                  <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <CalendarList
                      style={{
                        width,
                        overflow: 'hidden',
                        marginTop:5
                      }}
                      horizontal
                      pagingEnabled
                      calendarWidth={width}
                      markedDates={{
                        '2019-08-20': {
                          periods: [
                            { startingDay: true, endingDay: false, color: 'red' },
                          ]
                        },
                        '2019-08-21': {
                          periods: [
                            { startingDay: false, endingDay: true, color: 'red' },
                            // { startingDay: false, endingDay: true, color: '#ffa500' },
                            // { startingDay: true, endingDay: false, color: '#f0e68c' },
                          ]
                        },
                        '2019-08-22': {
                          periods: [
                            { startingDay: true, endingDay: true, color: 'green' },
                          ]
                        },
                        '2019-08-26': {
                          periods: [
                            { startingDay: true, endingDay: false, color: '#f1c40f' },
                          ]
                        }
                        ,
                        '2019-08-27': {
                          periods: [
                            { startingDay: false, endingDay: true, color: '#f1c40f' },
                          ]
                        }
                        // '2019-08-20': {textColor: 'green'},
                        // '2019-08-22': {startingDay: true, color: 'green'},
                        // '2019-08-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                        // '2019-08-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                      }}
                      theme = {{
                        todayTextColor: 'green',
                        monthTextColor: 'green',
                        textSectionTitleColor: 'rgba(0, 128, 0, 0.5)',
                        textMonthFontFamily: 'Kanit-Regular',
                        textMonthFontSize: (width * 0.06),
                        textDayFontFamily: 'Kanit-Regular',
                        textDayHeaderFontFamily:'Kanit-Regular',
                        'stylesheet.calendar.header': {
                          week: {
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop:-5
                          },
                          ContainerStyle:{
                            borderRadius:15
                          }

                        }
                      }}
                      markingType={'multi-period'}
                    />
                  </View>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate("LeaveOrder")} >
                     <Text style={ styles.textOrderleave }>รายการลาของพนักงาน</Text>
                  </TouchableOpacity>
              </Card>
              <Holiday/>
              <LeaveSummary/>
            </View>
          </ScrollView>
      </Container>
    );
  }
}

export default CalendarScreen = createAppContainer(createStackNavigator({
  Calendar: { 
    screen: CalendarPage
  },
},{
  defaultNavigationOptions: ({ navigation }) => {
  return {
      headerTransparent:true,
      title:'หน้าหลัก',
      headerLeft:
      <LinearGradient
        colors={['#328f44', '#91c958']}
        locations={[0.1,0.9,1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{flex:1 ,width:widthtab}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{marginTop:30, marginLeft:20 ,marginBottom:10}}>
            <Icon name="bars" size={30} color={'white'} style={{marginTop:15}}
              onPress={ () => navigation.openDrawer() }
            />
          </TouchableOpacity>
          <View style={{flex:1 ,justifyContent:'center' ,alignItems:'center'}}>
            <Text style={{fontSize:30, fontFamily:'Kanit-Regular', marginTop:45, marginRight:20, color:'white'}}>หน้าหลัก</Text>
          </View>
        </View>
      </LinearGradient>
  };
}
}));



const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: '#e2e2e2',
  },
  CalendarCard: {
      borderRadius: 15,
      alignItems:'center',
      justifyContent:'center',
  },
  linearGradient: {
    height:70,
    justifyContent:'center'
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  textOrderleave: {
    fontSize:20,
    fontFamily:'Kanit-Regular',
    color:'green',
    marginBottom:10
  }
});
