/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './android/src/components/AppContainerComponent';
import Calendar from './android/src/screen/history';
import Test from './android/src/screen/Test'
class App extends Component {
  render() {
    return <AppContainer/>;
    // return <Calendar/>
    // return <Test/>
  }
}
export default App;


