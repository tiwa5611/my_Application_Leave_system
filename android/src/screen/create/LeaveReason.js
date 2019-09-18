import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class LeaveReason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textReason:''
    };
  }

  render() {
    return (
        <View style={{paddingHorizontal:10}}>
          <Text style={styles.textInputBlock}>เหตุผลการลา</Text>
          <TextInput
            style={{
              height: 60, 
              borderColor: 'gray', 
              borderWidth: 1,
              marginTop:5,
              borderRadius:10
            }}
            multiline = {true}
            numberOfLines = {2}
            textAlignVertical = 'top'
            onChangeText={(textReason) => this.setState({textReason})}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    textInputBlock:{
        fontSize:20, 
        fontFamily:'Kanit-Regular', 
        color:'gray'
      }
})