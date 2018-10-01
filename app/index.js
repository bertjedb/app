import React, { Component } from 'react';
import { MyAppNotLoggedIn, MyAppLoggedIn } from './config/router';
import { View } from 'react-native';


class App extends Component {
	constructor(){
		super()
		this.state = {
			loggedIn: false
		}
		console.disableYellowBox = true;
	}
  render() {
    return (
    		 <MyAppLoggedIn/>
    	);
  }
}

export default App;
