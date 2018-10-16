import React, { Component } from 'react';
import { MyAppNotLoggedIn, MyAppLoggedIn } from './config/router';
import { View, StatusBar, StyleSheet } from 'react-native';
import LocalStorage from './config/localStorage.js';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-navigation';
import OneSignal from 'react-native-onesignal';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
    palette: {
        primaryColor: 'transparent'
    },
    toolbar: {
        container: {
            height: Header.HEIGHT,
        },
    },
};

class App extends Component {
	constructor(){
		super()
		this.state = {
			userId: null
		}
		console.disableYellowBox = true;
	}

  componentWillMount() {
    OneSignal.init("893db161-0c60-438b-af84-8520b89c6d93");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
	componentDidMount() {
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
          console.log('Promise is rejected with error: OH BOII' + error);
          });
	}

    update() {
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
          console.log('Promise is rejected with error: OH BOII' + error);
          });
    }
  render() {
    return (

			<View style={{flex: 1}}>
            { this.update() }
			<StatusBar
			    backgroundColor="#76AB00"
			    barStyle="light-content"
			  />
			<ThemeContext.Provider value={getTheme(uiTheme)}>
	        {this.state.loggedIn ? <MyAppLoggedIn/> : <MyAppNotLoggedIn/>}
			</ThemeContext.Provider>
			</View>

    	);
  }
}

export default App;
