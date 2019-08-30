import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import {Card} from 'native-base';
export default class Holiday extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Card style={styles.LeaveCard}>
            <Text style={{fontSize:20, marginTop:5, fontFamily: 'Righteous-Regular', color:'rgba(0, 0, 0, 0.4)'}}>Holiday</Text>
            <Text style={{fontSize:20, color:'green', fontFamily:'Kanit-Regular', marginTop:5}}>วันจันทร์ 12 สิงหาคม วันแม่แห่งชาติ</Text>
            <Text style={{fontSize:15, fontFamily:'Kanit-Regular'}}>วันจันทร์ 20 สิงหาคม วันหยุดแห่งชาติ</Text>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    LeaveCard: {
        borderRadius: 15,
        alignItems:'center',
        height:100,
        marginTop:10
      },
})
