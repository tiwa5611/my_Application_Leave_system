import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Card  from '../../Card'
import Block from '../../Block';
import theme from '../../../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
export default class Cenlendar extends Component {
  static navigationOptions = {
    title: 'ปฏิทิน',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
    //   <View style={styles.container}>
    //         <View style={styles.leaveSick}>
    //             <Text> test ลาป่วย Sick </Text>
    //         </View>
    <ScrollView>
        <Card style={{ paddingVertical: 25, }} >
          <Block style={{backgroundColor: '#007B70', }}>
            <Text> test ลาป่วย Sick </Text>
          </Block>
          <Block style={{backgroundColor: '#007C21',}}>
            <Text> test ลากิจ Sick </Text>
          </Block>
          <Block style={{paddingHorizontal: 10,backgroundColor: '#C86400',}}>
            <Text> test ลาพักร้อน Sick </Text>
          </Block>
          <Block style={{paddingHorizontal: 10, backgroundColor: '#fff',}}>
              <Calendar current />
          </Block>
        </Card>
    </ScrollView>
    
     
            
    //         <View>
    //             <Text> test holiday </Text>
    //         </View>
    //         <View>
    //             <Calendar
    //                 // Initially visible month. Default = Date()
    //                 current
    //             />
    //         </View>
    //   </View>
    //<Card>
        //
    //</Card>
    );
  }
}


