import React, { Component } from 'react';
import {Animated, PanResponder, ActivityIndicator, View,Image, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ListView} from 'react-native';
import  {Container, List, Button} from 'native-base';
import {createAppContainer, createStackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true, 
      dataSource: '',
      listViewData:''
    };
  }

  componentDidMount() {
    const count = 100
    this.fetchDataApi()
    this.rowSwipeAnimatedValues = {};	
    {console.log('componentDidMount', this.state.listViewData)}
    Array(count).fill('').forEach((_, i) => {
      this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });
  }

  fetchDataApi = async () => {
    console.log('token',JSON.parse(await AsyncStorage.getItem('user_token')))
    console.log('fetch')
    // fetch('http://leave.greenmile.co.th/api/get_leave')
    fetch('http://10.0.2.2:8000/api/get_leave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'token': JSON.parse(await AsyncStorage.getItem('user_token')),
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading : false,
          listViewData : responseJson.data.fill(...responseJson.data).map((value, i) => ({key: `${i}`, type : value}))
        })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  closeRow(rowMap, rowKey) {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
  }
  
  editRow =  async (rowMap, rowKey) => {
    console.log("ID edit Row: ", rowKey);
    fetch('http://10.0.2.2:8000/api/get_vacation_detail', {
      method: 'POST',
      headers: {
        Accept: 'appliction/json',
        'Content-Type' : 'appliction/json'
      },
      body: JSON.stringify({
        // 'token': JSON.parse(await AsyncStorage.getItem('user_token')),
        'id': rowKey
      })
    })
    .then((responseJson) => responseJson.json())
    .then((result) => {
      console.log(result)
      return this.props.navigation.push('Create', { rowKey, result})
    })
    .catch((error) => {
      console.log('error editrow() fetch data: ', error)
    })
  }

	deleteRow = async (rowMap, rowKey) => {
    console.log("ID: ", rowKey);
    // async ( rowKey ) => {
      console.log('token delete function: ', JSON.parse(await AsyncStorage.getItem('user_token')))
      // fetch('http://leave.greenmile.co.th/api/get_leave')
      fetch('http://10.0.2.2:8000/api/delete_leave', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'id': rowKey
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.data){
            alert('ลบข้อมูลสำเร็จ')
            this.fetchDataApi();
            this.closeRow(rowMap, rowKey)
          } else {
            alert('ผิดพลาด')
          }
      })
      .catch((error) => {
        console.error(error);
      });
    }

	onRowDidOpen = (rowKey, rowMap) => {
		console.log('This row opened', rowKey);
	}

	onSwipeValueChange = (swipeData) => {
		const { key, value } = swipeData;
		this.rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  }
  
  getColor = (color) => {
      switch(color) {
        case 'ลาป่วย' : return '#f1c40f';
        case 'ลากิจ' : return '#cd201f'
        default:
          return '#379245'
      }
    }
  
    getIcon = (icon) => {
      switch(icon) {
        case 'ลาป่วย' : return "plus-circle";
        case 'ลากิจ' : return "exclamation-triangle";
        default:
          return "plane"
      }
    }

  render() {
    const {navigate} = this.props.navigation;
    if(this.state.isloading) {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator  size="large" color="green"/>
        </View>
      );
    } else {
      return (
        <Container style={styles.containerStyle}>
          <StatusBar translucent
            backgroundColor="rgba(0, 0, 0, 0.01)"
          />
          <SwipeListView
            data={this.state.listViewData}
            renderItem={ (data ) => (
              <View>
                <View style={styles.containerListStyle}>
                  <View style={{width:5, backgroundColor:this.getColor(data.item.type.leave_type) }} />
                  <View style={{marginLeft:10, marginRight:15, alignItems:'center', justifyContent:'center'}}>
                    <Icon name={this.getIcon(data.item.type.leave_type)} color={this.getColor(data.item.type.leave_type) } size={30} style={[{transform: data.item.type.leave_type == 'ลาพักร้อน' ? [{ rotate: '315deg'}] :  [{ rotate: '0deg'}]}]}/>
                  </View>
                  <View> 
                    <Text style={styles.textTyleLeave}>{data.item.type.leave_date}</Text>
                    <Text style={styles.textReason}>{data.item.type.leave_desc}</Text>
                  </View>
                  <View style={{flex:1, flexDirection:'row-reverse', marginLeft:5, marginTop:5}}>
                    <Icon name={ data.item.type.status == 'Send to approve' ? 'info-circle': ''} color={'#8a8787'}/>
                  </View>
                </View>
              </View> 
            )}
            renderHiddenItem={ (data, rowMap) => (
              <View style={{flexDirection:'row-reverse', height:'100%'}}>
                { console.log(' data in history page :', data.item.type)}
                <TouchableOpacity
                  onPress={ () => {
                    this.editRow(rowMap, data.item.type.id)
                  }}
                  activeOpacity={0.5} 
                  style={[styles.swipeButtonStyle, {backgroundColor: '#8a8787'}]} 
                >
                  <Text style={styles.textSwipeStyle}>แก้ไข</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={ () => this.deleteRow(rowMap, data.item.type.id) }
                  activeOpacity={0.5} 
                  style={[styles.swipeButtonStyle, {backgroundColor: 'red'}]}
                >
                  <Text style={styles.textSwipeStyle}>ลบ</Text>
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            rightOpenValue={-150}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={this.onRowDidOpen}
            onSwipeValueChange={this.onSwipeValueChange}
            />
        </Container>
      );
    }
  }
}


export const Separator = () => <View style={styles.separator} />;

export default  History = createAppContainer(createStackNavigator({
  History:{
    screen:HistoryPage
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
        headerTransparent:true,
        headerLeft:
        <LinearGradient
          colors={['#348e44', '#90c959']}
          locations={[0,1,0.6]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={{flex:1 ,width:width}}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{marginTop:40, marginLeft:20 ,marginBottom:10}} onPress={() => navigation.navigate('Dashboard')}>
              <Image source={require('../../images/back_button.png')} style={{height:30, width:30, marginTop:15}}/>
            </TouchableOpacity>
            <View style={{flex:1 ,justifyContent:'center' ,alignItems:'center'}}>
              <Text style={{fontSize:30, fontFamily:'Kanit-Regular', marginTop:45, marginRight:20, color:'white'}}>ประวัติการลา</Text>
            </View>
          </View>
        </LinearGradient>
    };
  }
}))

const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor: '#e2e2e2',
    marginTop:height/10
  },
  containerListStyle: {
    backgroundColor:'white',
    flexDirection:'row',
  },
  rightSwipeItemDelete: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: width*0.08
  },
  rightSwipeItemEdit: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: width*0.05
  },
  textTyleLeave:{
    marginTop:10,
    fontSize:width*0.045,
    marginLeft:10,
    fontFamily:'Kanit-Regular'
  },
  textReason:{
    fontSize:15,
    marginLeft:15,
    marginTop:5,
    marginBottom:10,
    fontFamily:'Kanit-Regular'
  },
  timeStyle: {
    fontSize:(width/25), 
    fontFamily:'Kanit-Regular', 
    color:'rgba(0, 0, 0, 0.5)'
  },
  swipeButtonStyle: {
    width:75, 
    justifyContent:'center', 
    alignItems:'center'
  },
  textSwipeStyle: {
    fontSize:20,
    fontFamily:'Kanit-Regular',
    color:'white'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  }
})
