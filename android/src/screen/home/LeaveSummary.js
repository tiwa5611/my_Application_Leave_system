import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
export default class LeaveSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                <Text style={styles.textCountStyle}>5.5</Text>
                <Text style={{color:'white', fontFamily:'Kanit-Regular', marginHorizontal:12}}>ลาป่วย</Text>
                </View>
                <View style={styles.itemStyle}/>
                <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:10}}>
                <Text style={styles.textCountStyle}>3.5</Text>
                <Text style={styles.textLeaveType}>ลากิจ</Text>
                </View>
                <View style={styles.itemStyle}/>
                <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal:10}} >
                <Text style={styles.textCountStyle}>0</Text>
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
