import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
export default class LeaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveSick:'',
      leaveHoliday:'',
      leaveErrand:'',
      dataSource:''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData =  async () => {
    let sick, holliday, errand; 
    try {
      const token_summary = await AsyncStorage.getItem('user_token');
      console.log('token value: ', token_summary)
      if( token_summary != null ) {
        let token_value = JSON.parse(token_summary);
        // fetch('http://leave.greenmile.co.th/api/get_personal_leave' , {
        // fetch('http://127.0.0.1:8000/api/get_personal_leave' , {
        fetch('http://10.0.2.2:8000/api/get_personal_leave' , {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "token" : token_value, 
          })
        })
        .then((responseJson) => responseJson.json())
        .then((result) => {
          // console.log('Data fetch to LeaveSummary:', result.data)
          this.setState({ 
            dataSource: result.data 
          })
          this.state.dataSource.forEach((value) => {
              switch(value.title) {
                case 'ลาป่วย': 
                            sick = value.total 
                            break;
                case 'ลากิจ': 
                            errand = value.total 
                            break;
                case 'ลาพักผ่อน': 
                            holliday = value.total
                            break;
                default:
                  break;
              }
          });

          this.setState({
            leaveErrand:errand,
            leaveHoliday:holliday,
            leaveSick:sick
          })
        })
        .catch((error) => {
          console.log('Error at LeaveSummary:', error);
        })
      } else {
        console.log('Else condition LeaveSummary')
      }

    } catch (error) {
      console.log('Error in component LeaveSummary:', error);
    }
  }

  render() {

    

    return (
        <Card style={styles.summaryCard}>
            <LinearGradient
            colors={['#369145', '#74b752']}
            start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
            style={{flex:1, borderRadius: 15}}
            >
            <View style={{alignItems:'center', marginTop:10}}>
                <Text style={{color:'white', fontSize:20, fontFamily: 'Righteous-Regular'}}>Leave Summary</Text>
            </View>
            <View style={{justifyContent:'center', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingHorizontal:30}}>
                <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                <Text style={styles.textCountStyle}>{ this.state.leaveSick }</Text>
                <Text style={{color:'white', fontFamily:'Kanit-Regular', marginHorizontal:12}}>ลาป่วย</Text>
                </View>
                <View style={styles.itemStyle}/>
                <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                <Text style={styles.textCountStyle}>{ this.state.leaveErrand }</Text>
                <Text style={styles.textLeaveType}>ลากิจ</Text>
                </View>
                <View style={styles.itemStyle}/>
                <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:10}} >
                <Text style={styles.textCountStyle}>{ this.state.leaveHoliday }</Text>
                <Text style={styles.textLeaveType}>ลาพักผ่อน</Text>
                </View>
            </View>
            </LinearGradient>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    summaryCard: {
        borderRadius: 105,
        height:150,
        marginTop:10,
        marginBottom:20,
      },
      itemStyle: {
        borderRightColor:'white',
        borderRightWidth:2,
        height:80,
        marginTop:10,
      },
      textCountStyle: {
        fontSize:50,
        color:'white',
        fontFamily:'Righteous-Regular'
      },
      textLeaveType: {
        color:'white',
        fontFamily:'Kanit-Regular',
      }
});
