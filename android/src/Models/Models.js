import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Models extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading:true,
      data:''
    };
  }
}

const getCalender = () => {

    fetch('http://leave.greenmile.co.th/api/get_calendar')
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson.data
        // this.setState({
        // isloading:false,
        // data: responseJson.data,
        // })
        // return data
    })
    .catch((error) => {
    console.error(error);
    return (error)
    });
}

const getVacation = () => {
    fetch('http://leave.greenmile.co.th/api/get_vacations')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            isloading:false,
            dataSourceVacation: responseJson.data,
          })
          return dataSourceVacation;
      })
      
      .catch((error) => {
        console.error(error);
        return (error)
      });
}

const getHistory = () => {
    fetch('http://leave.greenmile.co.th/api/get_leave')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:false,
          dataSourceHistory: responseJson.data,
        })
        return dataSourceHistory;
    })
    
    .catch((error) => {
      console.error(error);
      return (error)
    });
}

const getLeaveOrder = () => {
    fetch('http://leave.greenmile.co.th/api/get_incoming_leave')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:false,
          dataSourceLeaveOrder: responseJson.data,
        })
        return dataSourceLeaveOrder;
    })
    
    .catch((error) => {
      console.error(error);
      return (error)
    });
}

module.exports = {
  getCalender,
  getHistory,
  getLeaveOrder,
  getVacation
}