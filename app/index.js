import React, { Component } from 'react';
import { MyAppNotLoggedIn, MyAppLoggedIn } from './config/router';
import { View } from 'react-native';
import LocalStorage from './config/localStorage.js';


class App extends Component {
	constructor(){
		super()
		this.state = {
			loggedIn: false,
		}
		console.disableYellowBox = true;
	}
  render() {
      let localStorage = LocalStorage.getInstance();
      localStorage.retrieveItem('userId').then((goals) => {
          if(goals != null){
              this.setState({
                                loggedIn: true,
                            })
          } else {
              this.setState({
                                loggedIn: false,
                            })
          }
        }).catch((error) => {
        //this callback is executed when your Promise is rejected
        console.log('Promise is rejected with error: ' + error);
        });
    return (
        <View style={{flex: 1}}>
        {this.state.loggedIn &&  <MyAppLoggedIn/>}
        {!this.state.loggedIn && <MyAppNotLoggedIn/>}
        </View>
    	);
  }
}

export default App;
