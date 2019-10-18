import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class CheckInternet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connection_status: false
     }
     NetInfo.isConnected.addEventListener(
        'connectionChange', (res) => {
            console.log('status: ', res)
            if(res) {
                this.setState({connection_status:true})
            } else {
                this.setState({connection_status:false})
            }
        }
      );
  }

  componentDidMount () {
    
  }

//   componentWillUnmount() {
//     NetInfo.isConnected.removeEventListener(
//         'connectionChange',
//         this._handleConnectivityChange
//     );

//   }

//   _handleConnectivityChange = (isConnected) => {
//     this.setState({connection_Status:isConnected})
//     console.log(`is connected: ${this.state.status}`);
//   };

  render() {
      
    return (
        <View style={styles.MainContainer}>
            {this.state.connection_status? <Text>ออนไลน์</Text>:
            <View style={styles.MainContainer}>
              <Icon name={'wifi-off'} size={80} color={'#A3A3A3'}/>
              <Text style={{fontSize: 20, marginTop: 10, fontFamily:'Kanit-Regular', color:'#A3A3A3 '}}>กรุณาตรวจเครือข่าย</Text>
            </View>
          }
        </View>
    );
  }
}

 Layout = () =>  {
    return (
      <View style={styles.MainContainer}>
        <Icon name={'wifi-off'} size={60}/>
        <Text style={{fontSize: 20,}}>กรุณาตรวจเครือข่าย</Text>
      </View>
    );
} 


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e2e2e2',
      padding: 20
    },
    TextStyle: {
      fontSize:20,
      textAlign: 'center',
    }
  
  });