import React, { Component } from 'react';
import { MyAppNotLoggedIn, MyAppLoggedIn } from './config/router';
import { View, StatusBar, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import LocalStorage from './config/localStorage.js';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import LinearGradient from 'react-native-linear-gradient';
import { Header } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import {PacmanIndicator} from 'react-native-indicators';
import FlashMessage from "react-native-flash-message";
// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: "transparent"
  },
  toolbar: {
    container: {
      height: Header.HEIGHT
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      loading: true
    };
    console.disableYellowBox = true;
  }

  componentWillMount() {
    OneSignal.init("893db161-0c60-438b-af84-8520b89c6d93");

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
    clearTimeout(this.timeoutHandle);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
    let localStorage = LocalStorage.getInstance();
    localStorage
      .retrieveItem("userId")
      .then(id => {
        if (id != null) {
          this.setState({
            loggedIn: true
          });
        } else {
          this.setState({
            loggedIn: false
          });
        }
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: OH BOII" + error);
      });
  }

  update() {
    let localStorage = LocalStorage.getInstance();
    localStorage
      .retrieveItem("userId")
      .then(id => {
        if (id != null) {
          this.setState({
            loggedIn: true
          });
        } else {
          this.setState({
            loggedIn: false
          });
        }
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: OH BOII" + error);
      });
  }

  render() {
    return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#76AB00"
                    barStyle="light-content"
                />
                { this.update() }
                {!this.state.loading &&
                    <ThemeContext.Provider value={getTheme(uiTheme)}>
                        {this.state.loggedIn ? <MyAppLoggedIn/> : <MyAppNotLoggedIn/>}
                    </ThemeContext.Provider>
                }
                {this.state.loading &&
                    <View style={{justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: '#94D600'}}>
                        <Image  style = {{width: 350, height: 225, marginTop: 100}}
                                source = {require('./assets/logo.png')}/>
                        <PacmanIndicator color='white'  />
                    </View>
                }
                <FlashMessage position="top" style={{marginTop: Header.HEIGHT}}/>
            </SafeAreaView>
    	);
  }
}

export default App;
