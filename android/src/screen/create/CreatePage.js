import React, { Component } from 'react';
import {Alert, Text, StatusBar, TextInput, View, StyleSheet, TouchableOpacity, ImageBackground, Image, Dimensions} from 'react-native';
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
class CreatePage extends Component {
  constructor(props) {
    // leave_date_type = leave_period
    var currentDay = new Date().getDate();
    var currentMonth = new Date().getMonth()+1;
    var currentYear = new Date().getFullYear();
    let current = currentDay+'/'+currentMonth+'/'+currentYear;
    super(props);
    this.state = {
      date_form : current,
      date_to : current,
      current: current,
      selectedIndex: 0,
      selectedIndexPeriod: 0,
      leave_type: 'ลาป่วย',
      leave_period: 'ทั้งวัน',
      textReason:'',
      disable:[]
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

  refreshPage = () => {
    console.log('Call refreshPage')
    this.setState({
      date_form : current,
      date_to : current,
      textReason: ''
    })
  }

  comPareDate = (dataForm, dateTo) => {
    if((dataForm < dateTo)) {
      return true
    }
    return false
  }

  render() {    
      const buttons = ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน'];
      const buttonsPeriod = ['ทั้งวัน', 'เช้า', 'บ่าย'];
      const { selectedIndex, selectedIndexPeriod } = this.state;
      console.log('date_form: ', this.state.date_form)
      console.log('date_to: ', this.state.date_to)
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
                <Text style={styles.textTitle}>แบบฟอร์มใบลา</Text>
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
                          selectedButtonStyle={{ backgroundColor:'gray'}}
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
                            onDateChange={(date_form) => {
                              // {console.log('this.comPareDate(date_form, this.state.date_to)', this.comPareDate(date_form, this.state.date_to))}
                              console.log('xxx', this.state.current)
                              if(date_form < this.state.current) {
                                console.log('form < current')
                                this.setState({date_form: this.state.current})
                              }else {
                                this.comPareDate(date_form, this.state.date_to)?this.setState({date_form: date_form , selectedIndexPeriod:0, disable:[1,2]}):this.setState({date_form: date_form, date_to:date_form, disable:[]})
                              }
                            }}
                          />
                        </View>
                        <View style={styles.styleBloclTextTo}>
                          <Text style={styles.textToStyle}>ถึง</Text>
                        </View>
                          {/* Date to */}
                        <View  style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                          <DatePicker
                            style={{width:width/3, marginRight: -10,}}
                            date={ this.state.date_to }
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
                            onDateChange={(date_to) => {
                              if(date_to < this.state.current) {
                                this.setState({date_form: this.state.current , date_to: this.state.current, disable:[]})
                              } else if ( date_to < this.state.date_form) {
                                this.setState({date_form: date_to , date_to: date_to, disable:[]})
                              } else if (date_to === this.state.date_form) {
                                this.setState({ date_to : date_to,  disable:[]})
                              } else if ( date_to !== this.state.date_form ) {
                                this.setState({ date_to : date_to, selectedIndexPeriod:0, disable:[1,2]})
                              }
                            }}
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
                        disabled={this.state.disable}
                        textStyle={{fontFamily:'Kanit-Regular'}}
                        selectedButtonStyle={{ backgroundColor:'gray'}}
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
                    <TouchableOpacity 
                      activeOpacity={0.5} 
                      style={{flexDirection:'row', marginBottom:15, justifyContent:'center', alignItems:'center', marginTop:-8}}
                      onPress={() => this.props.navigation.navigate("History")}
                    >
                        <Icon name="paper-plane" size={15} color={'#328e44'} style={{marginRight:5}} />
                        <Text style={{color:'#328e44'}}>ประวัติการลา</Text>
                    </TouchableOpacity>
                </Card> 
              </View>
            </ScrollView>
      </Container>
    );
  }

  hadleSubmit = async () => {
    if(this.state.textReason === '') return Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบ',[{text:'ตกลง',style:'OK'}])
    try {
      let token = await AsyncStorage.getItem('user_token');
      let token_value = JSON.parse(token);
      fetch('http://leaveuat.greenmile.co.th/api/save_leave', {
      // fetch('http://10.0.2.2:8000/api/save_leave', {
      // fetch('http://leave.greenmile.co.th/api/save_leave' , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "token" : token_value,
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
          alert('บันทึกข้อมูลสำเร็จ')
          this.setState({
            date_form:this.current,
            date_to:this.current,
            textReason:''
          })
        } else {
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
        <TouchableOpacity style={{marginTop:30, marginLeft:15 ,marginBottom:10}}>
          <Icon name="bars" size={30} color={'white'} style={{marginTop:15}}
            onPress={ () => navigation.openDrawer() }
          />
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
    backgroundColor: 'gray', 
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
    backgroundColor: 'gray', 
    borderColor:'gray', 
  }
  
});
