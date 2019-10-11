import React from 'react';
import { StyleSheet, Text, View, Picker, Button, Modal, TouchableHighlight, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const height = Dimensions.get('screen').height;
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerSelection: 'Default value!',
      pickerDisplayed: false
    }
  }

  setPickerValue(newValue) {
    this.setState({
      pickerSelection: newValue
    })

    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  render() {
    
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
        <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                <LinearGradient
                    colors={['#328f44', '#91c958']}
                    locations={[0.1,0.9,1]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ margin: 20, padding: 20,
                      backgroundColor: '#efefef',
                      right: 20,
                      left:20,
                      bottom:(height/2)-100,
                      alignItems: 'center',
                      borderRadius: 10,
                      position: 'absolute' }}
                >
                <Text>Please pick a value</Text>
                { pickerValues.map((value, index) => {
                  return(
                    <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.value)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                      <Text>{ value.title }</Text>
                    </TouchableHighlight>
                    );
                })}
                <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                  <Text style={{ color: '#999' }}>Cancel</Text>
                </TouchableHighlight>
              </LinearGradient>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});