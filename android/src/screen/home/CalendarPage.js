import React, { Component } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Container, Card} from 'native-base';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LeaveSummary from './LeaveSummary';
import Holiday from './Holiday';
import AsyncStorage from '@react-native-community/async-storage';
const width = Dimensions.get('window').width * 0.9;
const widthtab = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height ;

const data = [
  {
    from: "2019-09-01",
    to: "2019-09-01",
    days: 0.5,
    type: "ลาป่วย",
    status: "Approved",
  },{
    from: "2019-09-15",
    to: "2019-09-15",
    days: 0.5,
    type: "ลากิจ",
    status: "Approved",
  },{
    from: "2019-09-08",
    to: "2019-09-08",
    days: 0.5,
    type: "ลาพักผ่อน",
    status: "Approved",
  },

]


class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading:true,
      dataSource:'',
      marked:null
    };
  }

  componentDidMount() {
    console.log('componentDidMount')
    fetch('http://leave.greenmile.co.th/api/get_calendar')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:false,
          dataSource: responseJson.data,
        })
    })
    .catch((error) => {
      console.error('Eror in page home', error);
    });
    this.anotherFunc();
  }

  anotherFunc = () => {
    let arryDate = [];
    let arryValue = {};
    data.forEach((value, index) => {
      console.log('index', index)
      console.log('index', value.from,' and ' , value.to)
      if(value.from === value.to) {
         let obj = Object.assign({}, { [value.from] : {periods:[{startingDay: true, endingDay: true, color: this.getColor(value.type)}]}});
         arryDate.push(obj);
      }
    });
    arryValue = Object.assign(...arryDate)
    console.log('anotherFunc() ', arryValue);
    this.setState({ marked : arryValue});
  }

  getColor = (color) => {
    switch(color) {
      case 'ลาป่วย' : return '#f1c40f';
      case 'ลากิจ' : return '#cd201f'
      default:
        return '#379245'
    }
  }

  render() {
    console.log('render')
    return (
      <Container style={styles.ContainerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          // animated
        />
        <ImageBackground source={require('../../images/background_one.png')}  style={{position:'absolute', left:0, right:0, width:'100%', height:height*0.8}}/>
        <ScrollView style={{backgroundColor:'transparent'}}>
            <View style={{paddingHorizontal:10, marginTop:80}}>
              {console.log('calendar after fetch api: ', this.state.dataSource)}
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
                      markedDates={this.state.marked}
                      // markedDates={{
                      //   '2019-09-20': {
                      //     periods: [
                      //       { startingDay: true, endingDay: false, color: 'red' },
                      //     ]
                      //   },
                      // }}
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
