import React, {Component} from 'react'
import { StyleSheet, Text, View, Picker, Button, Modal, TouchableHighlight, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const height = Dimensions.get('screen').height;
const width  = Dimensions.get('screen').width;
class ModalAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerSelection: 'Default value!',
            pickerDisplayed: false
        }
    }

    setPickerValue = (newValue) => {
        this.setState({
            pickerSelection:newValue
        })
        this.togglePicker();
    }

    togglePicker() {
        this.setState({
          pickerDisplayed: !this.state.pickerDisplayed
        })
      }

    render () {
        const pickerValues = [
            {
              title: 'Chicken',
              value: 'chicken'
            },
            {
              title: 'Eggs',
              value: 'eggs'
            },
            {
              title: 'Vegetables',
              value: 'vegetables'
            }
          ]
        return (
            <View style={styles.container}>
            <Text>The default value is { this.state.pickerSelection }</Text>
            <Button onPress={() => this.togglePicker()} title={ "Select a value!" } />
            <Modal 
                visible={this.state.pickerDisplayed} animationType={"fade"} transparent={true} color={'red'}
                backgroundColor={'red'}
            >
                    <LinearGradient
                        colors={['#328f44', '#91c958']}
                        locations={[0.1,0.9,1]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ 
                          margin: 20, 
                          padding: 20,
                          right: 20,
                          left:20,
                          bottom:(height/2)-100,
                          alignItems: 'center',
                          borderRadius: 10,
                          position: 'absolute' 
                          }}
                    >
                    {/* <Text>Please pick a value</Text>
                    { pickerValues.map((value, index) => {
                      return(
                        <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                          <Text>{ value.title }</Text>
                        </TouchableHighlight>
                        );
                    })}
                    <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                      <Text style={{ color: '#999' }}>Cancel</Text>
                    </TouchableHighlight> */}
                    <View style={styles.containerSubLinear}>
                        <View style={styles.title}>
                            <Text style={styles.textTitle}>แจ้งเตือน</Text>
                        </View>
                        <View style={styles.description}>
                            <Text style={styles.textDescription}>รายละเอียด</Text>
                        </View>
                        <View style={styles.buttonScop}>
                            <View style={{flex:1, alignItems:'center', marginTop:10,}}>
                                <TouchableHighlight onPress={() => this.togglePicker()} style={{flex:1, paddingTop: 4, paddingBottom: 4 }}>
                                    <Text style={{ color: 'white', fontSize: 15 }}>ตกลง</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{borderLeftColor:'white', borderLeftWidth:0.5, marginTop:10}}/>
                            <View style={{flex:1, alignItems:'center', marginTop:10,}}>
                                <TouchableHighlight onPress={() => this.togglePicker()} style={{flex:1, paddingTop: 4, paddingBottom: 4 }}>
                                    <Text style={{ color: 'white' ,fontSize: 15}}>ยกเลิก</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                  </LinearGradient>
            </Modal>
          </View>
        ); 
    }
}
export default  ModalAlert

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerSubLinear: {
        width:width-100
    },
    title: {
        alignItems:"center",
    },
    description: {
        alignItems:"center",
        marginBottom:20,
        color:'white'
    },
    textTitle: {
        fontSize:20,
        marginTop:-5,
        color:'white'
    },
    textDescription: {
        color:'white'
    },
    buttonScop: {
        flex:1,
        borderTopColor:'white',
        borderTopWidth:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    }
  });