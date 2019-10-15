import React, { Component } from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import {Card} from 'native-base';
export default class Holiday extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isloading:false,
      dataSource: '',
      firtData: '',
      secendData:''
    };
  }

  componentDidMount() {
    let first;
    let second;
    fetch('http://leaveuat.greenmile.co.th/api/get_vacations')
    // fetch('http://10.0.2.2:8000/api/get_vacations')
    // fetch('http://127.0.0.1:8000/api/get_vacations')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:true,
          dataSource : responseJson.data
        })
        this.state.dataSource.forEach( (value , index) => {
          switch(index) {
            case 0 : first = value ; break;
            case 1 : second = value ; break;
          }
        });
        this.setState({
          firtData:first,
          secendData:second
        })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
        <Card style={styles.LeaveCard}>
          <View style={{flex:1, alignItems:'center', justifyContent:'center', marginBottom:10, marginHorizontal:10}}>
              <Text style={{fontSize:20, marginTop:5, fontFamily: 'Righteous-Regular', color:'rgba(0, 0, 0, 0.4)'}}>Holiday</Text>
              <Text style={{fontSize:20, color:'green', fontFamily:'Kanit-Regular', marginTop:5}}>{this.state.firtData.title}</Text>
              <Text style={{flex: 1, textAlign: 'center', fontSize:15, fontFamily:'Kanit-Regular'}}>{ this.state.secendData.title }</Text>
          </View>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
    LeaveCard: {
        flex:1,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
      },
})
