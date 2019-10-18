import React, { Component } from 'react';
import {Alert, Animated, RefreshControl, ActivityIndicator, View,Image, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ListView} from 'react-native';
import  {Container, List, Button} from 'native-base';
import {createAppContainer, createStackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { TouchableHighlight } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing:false,
      isloading: true, 
      dataSource: '',
      listViewData:''
    };
  }

  onRefresh = async () => {
    this.setState({isRefreshing: true});
    // Simulate fetching data from the server
    fetch('http://leaveuat.greenmile.co.th/api/get_leave', {
    // fetch('http://10.0.2.2:8000/api/get_leave', {
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
          isRefreshing : false,
          listViewData : responseJson.data.fill(...responseJson.data).map((value, i) => ({key: `${i}`, type : value}))
        })
    })
    .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    console.log('componentDidMount in History Page')
    const count_limit = 1000
    this.fetchDataApi()
    this.rowSwipeAnimatedValues = {};	
    Array(count_limit).fill('').forEach((_, i) => {
      this.rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
    });
  }

  fetchDataApi = async () => {
    // fetch('http://leaveuat.greenmile.co.th/api/get_leave')
    fetch('http://leaveuat.greenmile.co.th/api/get_leave', {
    // fetch('http://10.0.2.2:8000/api/get_leave', {
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
  
  editRow =  async (rowMap, rowKey) => {
    //10.0.2.2:8000
    // fetch('http://127.0.0.1:8000/api/get_leave_detail', {
    fetch('http://leaveuat.greenmile.co.th/api/get_leave_detail', {
      method: 'POST',
      headers: {
        Accept: 'appliction/json',
        'Content-Type' : 'appliction/json'
      },
      body: JSON.stringify({
        'token': JSON.parse(await AsyncStorage.getItem('user_token')),
        'id': rowKey
      })
    })
    .then((responseJson) => responseJson.json())
    .then((result) => {
      return this.props.navigation.push('Edit', { rowKey, result})
    })
    .catch((error) => {
      console.log('error editrow() fetch data: ', error)
    })
  }

  closeRow(rowMap, rowKey){
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
  }

  openRow = (rowMap, rowKey) => {
    console.log('row', rowMap[rowKey]);
  }

	deleteRow = async (rowMap, rowKey, rowId) => {
    // fetch('http://leave.greenmile.co.th/api/get_leave')
    // fetch('http://127.0.0.1:8000/api/delete_leave', {
    fetch('http://leaveuat.greenmile.co.th/api/delete_leave', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'id': rowId
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson.data){
          Alert.alert('ลบข้อมูล', 'ลบข้อมูลสำเร็จ')
          this.closeRow(rowMap, rowKey)
          this.fetchDataApi();
        } else {
          Alert.alert('ลบข้อมูล', 'ลบข้อมูลผิดพลาด')
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
      case "ลาป่วย" : return 'plus-circle';
      case "ลากิจ" : return 'exclamation-triangle';
      default:
        return 'plane'
    }
  }

  render() {
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
            keyExtractor={ item => item.id }
            renderItem={ (data, rowKey, rowMap ) => (
              <View>
                <TouchableHighlight
                  onPress={ () => this.openRow(rowKey) }
                  // underlayColor={'#AAA'}
                  activeOpacity={1}
                >
                <View style={styles.containerListStyle}>
                  <View style={{width:5, backgroundColor:this.getColor(data.item.type.leave_type) }} />
                  <View style={{marginLeft:10, marginRight:15, alignItems:'center', justifyContent:'center'}}>
                    <Icon name={this.getIcon(data.item.type.leave_type)} color={this.getColor(data.item.type.leave_type) } size={30} style={[{transform: data.item.type.leave_type == 'ลาพักร้อน' ? [{ rotate: '315deg'}] :  [{ rotate: '0deg'}]}]}/>
                  </View>
                  <View> 
                    <Text style={styles.textTyleLeave}>{data.item.type.leave_date}</Text>
                    <Text style={styles.textReason}>{data.item.type.leave_desc}</Text>
                  </View>
                  {data.item.type.status == 'Send to approve'? 
                    <View style={{flex:1, flexDirection:'row-reverse', marginLeft:5, marginTop:5}}>
                      <Icon name={ data.item.type.status == 'Send to approve' ? 'info-circle': ''} color={'#8a8787'}/>
                    </View> : 
                    <View style={{flex:1, flexDirection:'row-reverse', marginLeft:5, marginTop:5}}>
                      <Text style={{fontSize:10, color:'#8a8787', fontFamily:'Kanit-Regular',}}>{ data.item.type.status == 'Approved' ? 'อนุมัติ': 'ไม่อนุมัติ'} </Text>
                    </View>
                  }
                </View>
              </TouchableHighlight>
              </View> 
            )}
            renderHiddenItem={ (data, rowMap) => (
              data.item.type.status == 'Send to approve'?
              <View style={{flexDirection:'row-reverse', height:'100%'}}>
                <TouchableOpacity
                  onPress={ _ => { this.editRow(rowMap, data.item.type.id)}}
                  activeOpacity={0.5} 
                  style={[styles.swipeButtonStyle, {backgroundColor: '#8a8787'}]} 
                >
                  <Text style={styles.textSwipeStyle}>แก้ไข</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={ _ => this.deleteRow(rowMap, data.item.key, data.item.type.id) }
                  activeOpacity={0.5} 
                  style={[styles.swipeButtonStyle, {backgroundColor: 'red'}]}
                >
                  <Text style={styles.textSwipeStyle}>ลบ</Text>
                </TouchableOpacity>
              </View> :
              <View style={{flexDirection:'row-reverse', height:'100%',}}>
                <TouchableHighlight style={{flex:1, width:150,  backgroundColor: '#e2e2e2', alignItems:'center', justifyContent:'center',}} 
                >
                {/* <Icon name={data.item.type.status === 'Approved'? 'check-circle':'times-circle'} color={'#328e44'} size={width*0.14}/> */}
                  <Text style={{color:'#A3A3A3', fontSize:15, fontFamily:'Kanit-Regular',}} >ไม่สามารถแก้ใขได้</Text>
                </TouchableHighlight>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
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
            <TouchableOpacity style={{marginTop:40, marginLeft:20 ,marginBottom:10}} onPress={() => navigation.navigate('DashboardTabNavigator')}>
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
