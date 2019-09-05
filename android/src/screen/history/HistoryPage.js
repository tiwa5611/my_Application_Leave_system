import React, { Component } from 'react';
import {PanResponder, ActivityIndicator, View,Image, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, ListView} from 'react-native';
import  {Container, List, Button, SwipeRow} from 'native-base';
import {createAppContainer, createStackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { FlatList } from 'react-native-gesture-handler';
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      dataSource: '',
    };
  }

  btnEditClick(secId, rowId, rowMap) {
    alert('btn Delet Click ' + secId );
    console.log(rowId);
  }
  componentDidMount() {
    fetch('http://leave.greenmile.co.th/api/get_leave')
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
          isloading:false,
          dataSource: responseJson.data,
        })
    })
    .catch((error) => {
      console.error(error);
    });
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
          {console.log('DataSource: 0005', this.state.dataSource)}
          <List>
            <FlatList
              data={this.state.dataSource}
              keyExtractor = {(item) => item.id !== item.id }
              renderItem={({item}) => (
                <ListItem {...item}/>
              )}
            />
          </List>
        </Container>
      );
    }
  }
}


const ListItem = (item) => {

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
      case 'ลาป่วย' : return 'plus-circle';
      case 'ลากิจ' : return 'exclamation-triangle'
      default:
        return 'plane'
    }
  }

  return (
    <Swipeable
      renderRightActions={ item.status === 'รออนุมัติ' ? RightActions : null }  
    >
      <View>
        <View style={styles.containerListStyle}>
          <View style={{width:5, backgroundColor:getColor(item.leave_type) }} />
          <View style={{marginLeft:10, marginRight:15, alignItems:'center', justifyContent:'center'}}>
            <Icon name={getIcon(item.leave_type)} color={getColor(item.leave_type) } size={30} style={[{transform: item.leave_type == 'ลาพักร้อน' ? [{ rotate: '315deg'}] :  [{ rotate: '0deg'}]}]}/>
          </View>
          <View> 
            <Text style={styles.textTyleLeave}>{item.leave_date}</Text>
            <Text style={styles.textReason}>{item.leave_desc}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row-reverse', marginLeft:5, marginTop:5}}>
            <Icon name={ item.status == 'Approved' ? '': 'info-circle'} color={'#8a8787'}/>
          </View>
        </View>
      </View> 
    </Swipeable>
  );
}



export const Separator = () => <View style={styles.separator} />;


RightActions = () => {

  btnDeleteClick = (secId, rowId) => { 
    alert('You click button Delete', secId,' and ' ,rowId);
  }
  
  btnEditClick = (secId, rowId) => {
    alert('You click button Edit', secId, 'and', rowId);
  }

  return (
        <View style={{flexDirection:'row-reverse', height:'100%'}}>
            <TouchableOpacity
              // onPress={onPress}
              activeOpacity={0.5} 
              style={[styles.swipeButtonStyle, {backgroundColor: '#8a8787'}]} 
            >
              <Text style={styles.textSwipeStyle}>แก้ไข</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              // onPress={this.close}  
              activeOpacity={0.5} 
              style={[styles.swipeButtonStyle, {backgroundColor: 'red'}]}
            >
              <Text style={styles.textSwipeStyle}>ลบ</Text>
            </TouchableOpacity>
        </View>
      );
}

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
