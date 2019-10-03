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
const data_test = [
		{
			"leave_type": "ลาป่วย",
			"date_from": "2019-09-11",
			"date_to": "2019-09-12",
			"leave_days": 2,
			"status": "Approved"
		},
		{
			"leave_type": "ลากิจ",
			"date_from": "2019-09-12",
			"date_to": "2019-09-13",
			"leave_days": 2,
			"status": "Approved"
		},
		{
			"leave_type": "ลาพักผ่อน",
			"date_from": "2019-09-13",
			"date_to": "2019-09-14",
			"leave_days": 2,
			"status": "Approved"
		},
		{
			"leave_type": "ลาป่วย",
			"date_from": "2019-09-14",
			"date_to": "2019-09-17",
			"leave_days": 4,
			"status": "Approved"
		},
		{
			"leave_type": "ลาพักผ่อน",
			"date_from": "2019-09-15",
			"date_to": "2019-09-17",
			"leave_days": 3,
			"status": "Approved"
		}
	]

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
    // this.fetchDataApi();
    this.markDay();
  }

  markDay = (data1) => {
    let line = 0
    let arrResult = []
    let arryValue=[]
    data_test.forEach( element => {
        // console.log('line at: ', (typeof arrResult[element.date_from] !== 'undefined')); 
        if(arrResult[element.date_from])  {
          line = this.getlineCalendat(arrResult[element.date_from]);
          console.log('line in if condition: ', line)

        }

        let diff = moment(element.date_from).diff(moment(element.date_to), 'days')
        for ( let i = 0 ; i <= (diff*(-1)) ; i++ ) {
          if ( i === 0 ) {
            if( !arrResult[element.date_from] ){
              console.log('condition if', element.date_from)
              arrResult[element.date_from] =  { periods: [line].push({ startingDay:true , endingDay: false, color:this.getColor(element.leave_type) }) }
            } else {
              console.log('condition else');
              let dateTo = moment(element.date_from).add(i, 'day').format('YYYY-MM-DD');
              arrResult[dateTo]['periods'][line] = { startingDay:( i == 0 ) ? true : false , endingDay: ( diff == 0 || i == diff ) ? true : false, color:this.getColor(element.leave_type) }
            }
          } else {
            let dateTo = moment(element.date_from).add(i, 'day').format('YYYY-MM-DD');
            if( !arrResult[dateTo] ){
              console.log('condition if i != 0', dateTo)
              arrResult[dateTo] =  { periods: [line].push( { startingDay:( i == 0 ) ? true : false , endingDay: true, color:this.getColor(element.leave_type) }) }
            } else {
              console.log('condition else i != 0');
              arrResult[dateTo]['periods'][line] = { startingDay:( i == 0 ) ? true : false , endingDay: ( diff == 0 || i == diff ) ? true : false, color:this.getColor(element.leave_type) }
            }
          }
          console.log('--------------------------');
          console.log('loop at: ', i)
          console.log('line ', line)
          console.log('arryValue: ',arrResult)
          console.log('--------------------------');
        }
    });
    
    // arryValue = Object.assign({}, arrResult)
    console.log('arryValue: ', arrResult)
    console.log('llllll')
    // this.setState({marktest:arryValue})
  }

  getlineCalendat = (array) => {
    let line = 0 ;
    let loop = true ; 
    while(loop) {
      console.log('getlineCalendat', (typeof array['periods'][line]))
      if(typeof array['periods'][line] === 'undefined'){
        loop = false
      } else {
        line++;
      }
    }
    return line
  } 

  aa = () => {
    arrResult.forEach(element => {
      for(let i = 0 ; i < arrResult.length ; i++ ) {
        console.log('i: ', i)
        console.log('arrResult[i]: ', arrResult[i])
          if(arrResult[i] == undefined ) {
            console.log('if')
            arryValue[i] = 'transparent';
          } else {
            console.log('else')
            arryValue[i] = element[i]
          }
        console.log('arryValue[i]: ', arryValue[i])

      }
    });
  }
  betweenDays = (from, days, type, arrResult) => {
    for(let i = 1 ; i <= days - 2 ; i++) {
      let tomorrow = new Date(from);
      tomorrow = moment(tomorrow).add(i, 'day').format('YYYY-MM-DD');
      if(!arrResult[tomorrow]) {
        arrResult[tomorrow] = {periods:[({color:this.getColor(type)})]};
      } else {
        arrResult[tomorrow]['periods'].push({color:this.getColor(type)});
      }
    }
  }

























































  // markDay = (data1) => {
  //   let line = []
  //   let arrResult = []
  //   let arryValue={}
  //   data_test.forEach(element => {
  //       if(element.date_from === element.date_to) {
  //         if(!arrResult[element.date_from]) {
  //           arrResult[element.date_from] = { periods:[{startingDay:true, endingDay:true,color:this.getColor(element.leave_type)}]} 
  //         } else {
  //           arrResult[element.date_from]['periods'].push({startingDay: true, endingDay: true, color:this.getColor(element.leave_type)})
  //         }
  //       } else {
  //         if((element.leave_days - 2) >= 1) {
  //           //leave > three days
  //           if(!arrResult[element.date_from]){
              
  //             arrResult[element.date_from] = { periods:[{startingDay:true, endingDay:false, color:this.getColor(element.leave_type)}]}
  //           } else {
  //             arrResult[element.date_from]['periods'].push({startingDay:true, endingDay: false, color:this.getColor(element.leave_type)})
  //           }
  //           this.betweenDays(element.date_from, element.leave_days, element.leave_type, arrResult)
  //           if(!arrResult[element.date_to]) {
  //             arrResult[element.date_to] = { periods:[{startingDay:false, endingDay:true, color:this.getColor(element.leave_type)}]} 
  //           } else {
  //             arrResult[element.date_to]['periods'].push({startingDay:false, endingDay: true, color:this.getColor(element.leave_type)})
  //           }
  //         } else {
  //           // Perios two days
  //           if(!arrResult[element.date_from]) {
  //             arrResult[element.date_from] = { periods:[{startingDay:true, endingDay:false, color:this.getColor(element.leave_type)}]} 
  //             line.push(true)
  //           } else {
  //             arrResult[element.date_from]['periods'].push({startingDay:true, endingDay:false, color:this.getColor(element.leave_type)})
  //           }
  //           if(!arrResult[element.date_to]) {
  //             arrResult[element.date_to] = { periods:[{startingDay:false, endingDay:true, color:this.getColor(element.leave_type)}]} 
  //           } else {
  //             arrResult[element.date_to]['periods'].push({startingDay:false, endingDay:true, color:this.getColor(element.leave_type)})
  //           }
  //         } 
  //       }
  //   });
  //   arryValue = Object.assign({}, arrResult)
  //   this.setState({marktest:arryValue})
  // }

  // betweenDays = (from, days, type, arrResult) => {
  //   for(let i = 1 ; i <= days - 2 ; i++) {
  //     let tomorrow = new Date(from);
  //     tomorrow = moment(tomorrow).add(i, 'day').format('YYYY-MM-DD');
  //     console.log('test tomorrow: ',tomorrow)
  //     if(!arrResult[tomorrow]) {
  //       arrResult[tomorrow] = {periods:[({color:this.getColor(type)})]};
  //     } else {
  //       arrResult[tomorrow]['periods'].push({color:this.getColor(type)});
  //     }
  //   }
  //   console.log('days in function: ', arrResult) 
  // }

  fetchDataApi = () => {
    // fetch('http://leave.greenmile.co.th/api/get_calendar')
    // console.log('fetchData Function')
    fetch('http://10.0.2.2:8000/api/get_calendar')
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
              {/* {console.log('martest data: ', this.state.marktest)} */}
              {/* {console.log('mared data: ', this.state.marked)} */}
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
                    // markedDates={this.state.marktest}
                    markedDates={{
                      '2019-10-14': {
                        periods: [
                          { startingDay: true, endingDay: false, color: '#5f9ea0' },
                        ]
                      },
                      '2019-10-15': {
                        periods: [
                          { startingDay: false, endingDay: true, color: '#5f9ea0' },
                          { startingDay: true, endingDay: false, color: '#ffa500' },
                        ]
                      },
                      '2019-10-16': {
                        periods: [
                          { startingDay: true, endingDay: false, color: '#ffa500' },
                          { startingDay: false, endingDay: true, color: '#ffa500' },

                        ]
                      },
                      '2019-10-17': {
                        periods: [
                          { startingDay: false, endingDay: true, color: '#ffa500' },
                          { color: 'transparent' },

                        ]
                      },
                      '2019-10-18': {
                        periods: [
                          { color: 'transparent' },
                          { startingDay: false, endingDay: true, color: '#ffa500' },
                          { color: 'transparent' },

                        ]
                      },
                      '2019-10-19': {
                        periods: [
                          { color: 'transparent' },
                          { startingDay: false, endingDay: true, color: '#ffa500' },
                          { color: 'transparent' },

                        ]
                      },
                      '2019-09-20': {
                        periods: [
                          { color: 'transparent' },
                          { startingDay: false, endingDay: true, color: '#ffa500' },
                          { color: 'transparent' },

                        ]
                      },
                      
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
