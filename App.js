/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './android/src/components/AppContainerComponent';
import  ModalExample  from './android/src/Modal/ModalAlert';
class App extends Component {
  render() {
    return <AppContainer/>;
    // return <ModalExample/>
  }
}
export default App;


