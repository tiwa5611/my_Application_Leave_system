/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './android/src/components/AppContainerComponent';
import Calendar from './android/src/Models/Token';
class App extends Component {
  render() {
    return <AppContainer/>;
    // return <Calendar/>
  }
}
export default App;


