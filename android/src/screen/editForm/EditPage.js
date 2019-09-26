import React, { Component } from 'react';
import {Text, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions, Alert} from 'react-native';
import {Container, Card} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import {ButtonGroup } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
let status_tap = false
class CreatePage extends Component {
  constructor(props) {
    // leave_date_type = leave_period
    console.log('state editPage');
    var currentDay = new Date().getDate();
    var currentMonth = new Date().getMonth()+1;
    var currentYear = new Date().getFullYear();
    let current = currentDay+'/'+currentMonth+'/'+currentYear;
    super(props);
    this.state = {
      status_edit: false,
      id_edit: 0 ,
      dataSourceEdit:'',
      date_form : current,
      date_to : current,
      selectedIndex: 2,
      selectedIndexPeriod:2,
      leave_type:'ลาพักร้อน',
      leave_period:'บ่าย',
      textReason:''
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.updateIndexPeriod = this.updateIndexPeriod.bind(this)
  }

  updateIndex = (selectedIndex) => {
    switch(selectedIndex) {
        case 0:this.setState({leave_type:'ลาป่วย'}); break;
        case 1:this.setState({leave_type:'ลากิจ'}); break;
        case 2:this.setState({leave_type:'ลาพักร้อน'}); break;
    }
    this.setState({selectedIndex})
  }

  updateIndexPeriod = (selectedIndexPeriod) => {
      switch(selectedIndexPeriod) {
        case 0:this.setState({leave_period:'ทั้งวัน'}); break;
        case 1:this.setState({leave_period:'เช้า'}); break;
        case 2:this.setState({leave_period:'บ่าย'}); break;
    }
    this.setState({selectedIndexPeriod})
  }

  setIndexTypeFormEdit (type) {
    switch(type) {
      case 'ลาป่วย' : return 0;
      case 'ลากิจ' : return 1;
      case 'ลาพักผ่อน' : return 2;
      default: 
        return 0;
    }
  }

  setIndexPeriodFormEdit (dateType) {
      switch(dateType) {
        case 'ทั้งวัน' : return 0;
        case 'เข้า' : return 1;
        case 'บ่าย' : return 2;
        default:
          return 0;
      }
  }

  componentDidMount(){
    // const { navigation } = this.props
    // const keyid = navigation.getParam('keyId', 'Not found Key id')
    if (this.props.navigation.state.params != null) {
      this.setState({
        status_edit:true,
        idEdit: this.props.navigation.state.params.rowKey,
        date_form: this.props.navigation.state.params.result.data.leave_datefrom,
        date_to : this.props.navigation.state.params.result.data.leave_dateto,
        selectedIndex : this.setIndexTypeFormEdit(this.props.navigation.state.params.result.data.leave_type),
        selectedIndexPeriod: this.setIndexPeriodFormEdit(this.props.navigation.state.params.result.data.leave_date_type),
        leave_period: this.props.navigation.state.params.result.data.leave_date_type,
        leave_type: this.props.navigation.state.params.result.data.leave_type,
        textReason: this.props.navigation.state.params.result.data.leave_note,
      })
    }
  }

  render() {    
      const buttons = ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน'];
      const buttonsPeriod = ['ทั้งวัน', 'เช้า', 'บ่าย'];
      const { selectedIndex, selectedIndexPeriod } = this.state;
      return (
      <Container style={styles.ContainerStyle}>
        <StatusBar translucent
          backgroundColor="rgba(0, 0, 0, 0.01)"
          animated
        />
        <ImageBackground source={require('../../images/background_two.png')} style={{position:'absolute', width:'100%',  height:height*0.8}}/>
          <Image source={require('../../images/screen_create.png')} style={styles.imageView} />
            <ScrollView>
              <View style={{flexDirection:'row', paddingHorizontal:width/12, justifyContent:'space-between', marginTop: 20,}}>
                <Text style={styles.textTitle}>แบบฟอร์มแก้ใขใบลา</Text>
              </View>
              <View style={{ paddingHorizontal:10, marginTop:10}}>
                <Card style={styles.cardStyle}>
                  {/* Leave type */}
                    <View style={{marginTop:10,}}>
                        <Text style={{fontSize:20, marginLeft:10, fontFamily:'Kanit-Regular', color:'gray'}}>ประเภทการลา</Text>
                        <ButtonGroup
                          selectedIndex={selectedIndex}
                          onPress={this.updateIndex}
                          buttons={buttons}
                          textStyle={{fontFamily:'Kanit-Regular'}}
                          selectedButtonStyle={{ backgroundColor:'#72b552'}}
                          selectedTextStyle = {{ color: 'white', fontFamily:'Kanit-Regular' }}
                          containerStyle={{height: 50, borderRadius:10, height:40, borderColor:'gray'}}
                        />
                    </View>
                    <Text style={{fontSize:20, fontFamily:'Kanit-Regular', color:'gray', marginTop:10, paddingHorizontal:10}} >วันที่ลา</Text>
                    <View style={styles.ViewLevelOne}>
                      {/* date from */}
                      <View style={{flexDirection:'row', shadowColor:'gray', shadowOpacity:1, borderBottomColor:'gray', borderTopColor:'gray'}}>
                        <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                          <DatePicker
                            style={{width:width/3}}
                            format={'DD/MM/YYYY'}
                            androidMode={'spinner'}
                            date={this.state.date_form}
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
                            onDateChange={(date_form) => {this.setState({date_form: date_form})}}
                          />
                        </View>
                        <View style={styles.styleBloclTextTo}>
                          <Text style={styles.textToStyle}>ถึง</Text>
                        </View>
                          {/* Date to */}
                        <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                          <DatePicker
                            style={{width:width/3, marginRight: -10,}}
                            date={this.state.date_to}
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
                            onDateChange={(date_to) => {this.setState({date_to: date_to}) }}
                          />
                        </View>
                      </View>
                    </View>
                    <Text style={{fontSize:20, fontFamily:'Kanit-Regular', color:'gray', marginTop:10, paddingHorizontal:10}} >ระยะเวลา</Text>
                    {/* Period time */}
                    <View>
                      <ButtonGroup
                        selectedIndex={selectedIndexPeriod}
                        onPress={this.updateIndexPeriod}
                        buttons={buttonsPeriod}
                        textStyle={{fontFamily:'Kanit-Regular'}}
                        selectedButtonStyle={{ backgroundColor:'#72b552'}}
                        selectedTextStyle = {{ color: 'white' , fontFamily:'Kanit-Regular' }}
                        containerStyle={{height: 50, borderRadius:10, height:40, borderColor:'gray'}}
                      />
                    </View>
                    {/* <LeaveReason/> */}
                    <View style={{paddingHorizontal:10}}>
                      <Text style={styles.textInputBlock}>เหตุผลการลา</Text>
                      <TextInput
                        style={{
                          height: 60, 
                          borderColor: 'gray', 
                          borderWidth: 1,
                          marginTop:5,
                          borderRadius:10,
                        }}
                        multiline = {true}
                        value={this.state.textReason}
                        numberOfLines = {2}
                        textAlignVertical = 'top'
                        onChangeText={(textReason) => this.setState({textReason})}
                      />
                    </View>
                    {/* Button submit */}
                    <View style={{paddingHorizontal:10 ,marginTop:30}}>
                        <TouchableOpacity activeOpacity={0.5} style={styles.btnSendstyle} onPress={this.hadleSubmit}>
                            <Text style={styles.textSendFrom}>ส่งใบลา</Text>
                        </TouchableOpacity>
                    </View>
                </Card> 
              </View>
            </ScrollView>
      </Container>
    );
  }

  hadleSubmit = async () => {
    try {
      let token = await AsyncStorage.getItem('user_token');
      let token_value = JSON.parse(token);
      // fetch('http://127.0.0.1:8000/api/update_leave', {
        fetch('http://10.0.2.2:8000/api/update_leave', {
      // fetch('http://leave.greenmile.co.th/api/save_leave' , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token" : token_value,
          "ID" : this.state.idEdit,
          "LEAVE_DATEFROM" : moment(this.state.date_form, 'DD/MM/YYYY').format("YYYY-MM-DD"), 
          "LEAVE_DATETO" : moment(this.state.date_to, 'DD/MM/YYYY').format("YYYY-MM-DD"), 
          "LEAVE_TYPE" : this.state.leave_type, 
          "LEAVE_NOTE" : this.state.textReason, 
          "LEAVE_DATE_TYPE" : this.state.leave_period, 
        })
      })
      .then((responseJson) => (responseJson.json()))
      .then((result) => {
        if(result.data) {
          // Alert.alert(
          //   'บันทึกข้อมูลสำเร็จ',
          //   [
          //     {text: 'ตกลง', onPress: () => {return this.props.navigation.navigate('History')}},
          //   ]
          // )
          return this.props.navigation.navigate('History');
        } else {
          console.log('response from serve fail: ', result);
          alert('ผิดพลาด')
        }
      })
      .catch((error) => {
        console.log("Error in save create:", error)
      })
    } catch (error) {
      console.log('Error in Create Page :', error)
    }
  }
}

export default CreateScreen = createAppContainer(createStackNavigator({
  Create: { 
    screen: CreatePage
  },
},{

  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerTransparent:true,
      headerLeft:
        <TouchableOpacity style={{marginTop:40, marginLeft:20 ,marginBottom:10}} onPress={() => navigation.navigate('History')}>
          <Image source={require('../../images/back_button.png')} style={{height:30, width:30, marginTop:15}}/>
        </TouchableOpacity>
    };
  }
}));

const styles = StyleSheet.create({
  ContainerStyle: {
    backgroundColor: '#e2e2e2',

  },
  textInputBlock:{
    fontSize:20, 
    fontFamily:'Kanit-Regular', 
    color:'gray'
  },
  textTitle: {
    color:'white',
    fontSize:30,
    fontFamily:'Kanit-Regular',
    marginTop:180,
  },
  btnSendstyle: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#328e44',
    color:'green',
    borderRadius:50,
    height:50,
    marginBottom:20
  },
  imageView:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width:width/1.5, 
    height:width/1.5,
    marginTop:15,
    marginLeft:width/3.4
  },
  cardStyle: {
    paddingHorizontal:10,
    borderRadius:10,
    marginBottom:20,
    flex:1
  },
  textSendFrom: {
    color:'white',
    fontSize:20,
    fontFamily:'Kanit-Regular',
  },
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
  
});
