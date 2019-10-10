import React, { Component } from 'react';
import { View, Text } from 'react-native';
import constants from 'jest-haste-map/build/constants';

const myObj = {
    name: 'zack',
    age: 27,
    height: 511
};

const data = [
	{
		"leave_type": "ลากิจ",
		"date_from": "2019-02-25",
		"date_to": "2019-02-25",
		"leave_days": 0.5,
		"status": "Send to approve"
	},
	{
		"leave_type": "ลาพักผ่อน",
		"date_from": "2019-02-25",
		"date_to": "2019-02-25",
		"leave_days": 1,
		"status": "Approved"
	},
	{
		"leave_type": "ลาป่วย",
		"date_from": "2019-03-04",
		"date_to": "2019-03-04",
		"leave_days": 1,
		"status": "Approved"
	},
	{
		"leave_type": "ลาพักผ่อน",
		"date_from": "2019-01-11",
		"date_to": "2019-01-11",
		"leave_days": 0.5,
		"status": "Approved"
	},
	{
		"leave_type": "ลาป่วย",
		"date_from": "2019-04-24",
		"date_to": "2019-01-24",
		"leave_days": 1,
		"status": "Approved"
	},
]

export default class TestMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


testMapObject = () => {
	let arrResult = []
	let periods = []
    data.forEach(element => {
		periods.push(element)
		// for ( let i in element ) {
		// 	console.log('i', periods[i] = element[i])
		// }
    });
    console.log('Key Array: ', periods);
}
  

  render() {
    return (
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text> {this.testMapObject()} </Text>
      </View>
    );
  }
}
