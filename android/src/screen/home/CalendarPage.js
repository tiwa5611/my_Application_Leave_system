import React, { Component } from 'react';
import { View, Text, StatusBar, ImageBackground, TouchableOpacity, StyleSheet, Dimensions, ScrollView, RefreshControl } from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {Container, Card} from 'native-base';
import moment, { max } from 'moment';
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
      marked:null,
      marktest:null
    };
  }

  componentDidMount() {
    this.fetchDataApi();                   
  }

  markDay = (data1) => {
    let arrResult = []
    let result = [];
    data1.forEach( element => {
      let line = this.getlineCalendar(arrResult[element.date_from])
      let dateDiff = moment(element.date_from).diff(moment(element.date_to), 'days')
      for ( let i = 0 ; i <= dateDiff*(-1) ; i++ ) {
        if ( i == 0 ) {
          date_from = element.date_from
        } else {
          date_from = moment(element.date_from).add(i, 'day').format('YYYY-MM-DD');
        }
        if( typeof arrResult[date_from] === 'undefined') {
          arrResult[date_from] = { periods : [] }
        }
        arrResult[date_from]['periods'][line] = {
          startingDay: (i == 0)? true : false ,
          endingDay : ( i == dateDiff*(-1) || dateDiff*(-1) == 0 )? true : false ,
          color: this.getColor(element.leave_type)
        }
      }
    });
    arryValue = Object.assign({}, arrResult)
    result = this.convertFormatCalendar(arryValue)
    this.setState({marktest:result})
  }

  convertFormatCalendar = (array) => {
    Object.keys(array).forEach((key) => {
      let maxKey = this.maxKeyArray(array[key])
      for ( let i = 0 ; i < maxKey ; i++  ) {
        if(typeof array[key].periods[i] === 'undefined') {
          array[key].periods[i] = { color: 'transparent'} 
        }
      }
    });
    return array
  }

  maxKeyArray = (key) => {
    let maxKey = 0;
    if( maxKey < key.periods.length) {
      maxKey =  key.periods.length
    }
     return maxKey
  }

  getlineCalendar = (array) => {
    let line = 0 ;
    if(typeof array !== 'undefined'){
      let loop = true ; 
      while(loop) {
        if((typeof array['periods'][line] === 'undefined')){
          loop = false
        } else {
          line++;
        }
      }
    }
    return line
  } 

  fetchDataApi = () => {
    fetch('http://leaveuat.greenmile.co.th/api/get_calendar')
    // fetch('http://10.0.2.2:8000/api/get_calendar')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading: false,
          refreshing: false,
          dataSource: responseJson.data,
        })
        this.markDay( responseJson.data );
    })
    .catch((error) => {
      console.error('Eror in page home', error);
    });
  }
  
  onRefresh = () => {
    this.setState({refreshing:true})
    this.fetchDataApi()
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
              onRefresh={this.onRefresh.bind(this)}
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
                      marginTop:5,
                      paddingHorizontal:1,
                    }}
                    horizontal
                    pagingEnabled
                    calendarWidth={width}
                    markingType={'multi-period'}
                    markedDates={this.state.marktest}
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
                          marginTop:-5,
                        },
                        ContainerStyle:{
                          borderRadius:15,
                        }
                      }
                    }}
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
