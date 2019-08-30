import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
const width = Dimensions.get('window').width; 

export default class LeaveTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.ViewLevelOne}>
          <View style={{flexDirection:'row', shadowColor:'gray', shadowOpacity:1, borderBottomColor:'gray', borderTopColor:'gray'}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
              <DatePicker
                style={{width:width/3}}
                format={'DD/MM/YYYY'}
                androidMode={'spinner'}
                placeHolderText={this.chosenDate}
                customStyles={{
                  dateIcon:{
                    width: null, height: null
                  },
                  dateInput: {
                    borderTopStartRadius:10,
                    borderBottomStartRadius:10,
                    backgroundColor:'white',
                  }
                }}
                onDateChange={(dateform) => {this.setState({dateform: dateform})}}
              />
            </View>
            <View style={styles.styleBloclTextTo}>
              <Text style={styles.textToStyle}>ถึง</Text>
            </View>
            <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              <DatePicker
                style={{width:width/3, marginRight: -10,}}
                date={this.state.dateto}
                androidMode={'spinner'}
                format={'DD/MM/YYYY'}
                customStyles={{
                  dateIcon:{
                    width: 0, height: 0
                  },
                  dateInput: {
                    borderBottomEndRadius:10,
                    borderTopEndRadius:10,
                    backgroundColor:'white',
                  }
                }}
                onDateChange={(dateto) => {this.setState({dateto: dateto})}}
              />
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  ViewLevelOne: {
    width:width*0.82 , 
    borderRadius:200, 
    backgroundColor: '#72b552', 
    marginHorizontal: 10,
    borderTopColor:'rgba(0, 0, 0, 0.7)',
    borderBottomColor: 'rgba(0, 0, 0, 0.7)',
    marginTop:5
  },
  textToStyle:{
    fontFamily:'Kanit-Regular', 
    color:'white',
    fontSize:width*0.04
  },
  styleBloclTextTo: {
    height:40, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: '#72b552', 
    borderColor:'gray', 
  }
})
