import React, { Component } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Container, Card} from 'native-base';
import moment from 'moment';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import LeaveSummary from './LeaveSummary';
import Holiday from './Holiday';
const width = Dimensions.get('window').width * 0.9;
const widthtab = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height ;

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing:false,
      isloading:true,
      dataSource:'',
      marked:null
    };
  }

  componentDidMount() {
    this.fetchDataApi();
  }

  fetchDataApi = () => {
    // fetch('http://leave.greenmile.co.th/api/get_calendar')
    fetch('http://10.0.2.2:8000/api/get_calendar')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading: false,
          refreshing: false,
          dataSource: responseJson.data,
        })
        this.anotherFunc( responseJson.data );
    })
    .catch((error) => {
      console.error('Eror in page home', error);
    });
  }

  
  onRefresh = () => {
    this.setState({refreshing:true})
    this.fetchDataApi().then(() => {
      this.setState({refreshing: false})
    })
  } 

  anotherFunc = (data) => {
    let arryDate = [];
    let arryValue = {};
    data.forEach((value, index) => {
      if(value.date_from === value.date_to) {
         let obj = Object.assign({}, { [value.date_from] : {periods:[{startingDay: true, endingDay: true, color: this.getColor(value.leave_type)}]}});
         arryDate.push(obj);
      }else {
        let obj1 = Object.assign({}, { [value.date_from] : {periods:[{startingDay: true, endingDay: false, color: this.getColor(value.leave_type)}]}});
        arryDate.push(obj1);  
          if((value.leave_days - 2 ) >= 1) {
            this.betweenDays(value.date_from, value.leave_days, value.leave_type, arryDate);
          }
        let obj2 = Object.assign({}, { [value.date_to] : {periods:[{startingDay: false, endingDay: true, color: this.getColor(value.leave_type)}]}});
        arryDate.push(obj2);
      }   
    });
    arryValue = Object.assign(...arryDate)
    this.setState({ marked : arryValue});
  }

  betweenDays = (from, days, type, arryDate) => {
    for(let i = 1 ; i <= days - 2 ; i++) {
      let tomorrow = new Date(from);
      tomorrow = moment(tomorrow).add(i, 'day').format('YYYY-MM-DD');
      let obj = Object.assign({}, { [tomorrow] : {periods:[{color: this.getColor(type)}]}});
      arryDate.push(obj);
    }
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
        <ScrollView style={{backgroundColor:'transparent'}}
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          /> 
          }
        >
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
                      markedDates={this.state.marked}
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
