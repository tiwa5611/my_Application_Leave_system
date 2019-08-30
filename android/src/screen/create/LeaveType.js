import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {ButtonGroup } from 'react-native-elements';
export default class LeaveType extends Component {
    constructor () {
        super()
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
        
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {

        const buttons = ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน']
        const { selectedIndex } = this.state
      
        return (
            <View style={{marginTop:10,}}>
                <Text style={{fontSize:20, marginLeft:10, fontFamily:'Kanit-Regular', color:'gray'}}>ประเภทการลา</Text>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    textStyle={{fontFamily:'Kanit-Regular'}}
                    selectedButtonStyle={{ backgroundColor:'#72b552'}}
                    selectedTextStyle = {{ color: 'white', fontFamily:'Kanit-Regular' }}
                    containerStyle={{height: 50, borderRadius:10, height:40, borderColor:'gray'}}
                />
            </View>
        );
    }
}
