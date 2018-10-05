import React, { Component } from 'react';
import { MyAppNotLoggedIn, MyAppLoggedIn } from './config/router2';
import { View, StatusBar } from 'react-native';
import LocalStorage from './config/localStorage.js';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: '#94D600',
    },
    toolbar: {
        container: {
            height: 58,
        },
    },
};

class App extends Component {
	constructor(){
		super()
		this.state = {
			loggedIn: false
		}
		console.disableYellowBox = true;
	}
  render() {
      let localStorage = LocalStorage.getInstance();
      localStorage.retrieveItem('userId').then((id) => {
          if(id != null){
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
			<StatusBar
			    backgroundColor="#76AB00"
			    barStyle="light-content"
			  />
			<ThemeContext.Provider value={getTheme(uiTheme)}>
	        {this.state.loggedIn &&  <MyAppLoggedIn/>}
	        {!this.state.loggedIn && <MyAppNotLoggedIn/>}
			</ThemeContext.Provider>
			</View>

    	);
  }
}

export default App;
