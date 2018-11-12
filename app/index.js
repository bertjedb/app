import React, { Component } from "react";
import {
  MyAppNotLoggedIn,
  MyAppLoggedInAdmin,
  MyAppLoggedInUser
} from "./config/router";
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  AsyncStorage
} from "react-native";
import LocalStorage from "./config/localStorage.js";
import { COLOR, ThemeContext, getTheme } from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import { Header } from "react-navigation";
import OneSignal from "react-native-onesignal";
import { PacmanIndicator } from "react-native-indicators";
import FlashMessage from "react-native-flash-message";
import Onboarding from 'react-native-onboarding-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      loading: true,
      firstLaunch: false,
      clearance: null,
    };
    console.disableYellowBox = true;
  }

  componentWillMount() {
    OneSignal.init("893db161-0c60-438b-af84-8520b89c6d93");
    OneSignal.addEventListener("ids", this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onIds);
    clearTimeout(this.timeoutHandle);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.setState({ loading: false });
    }, 100);

    let localStorage = LocalStorage.getInstance();
    localStorage
      .retrieveItem("userId")
      .then(id => {
        console.log(id)
        if (id != null) {
          this.setState({
            loggedIn: true
          });
        } else {
          this.setState({
            loggedIn: false
          });
        }
        localStorage
          .retrieveItem("clearance")
          .then(clr => {
            this.setState({
              clearance: clr
            });
          })
          .catch(error => {
            //this callback is executed when your Promise is rejected
            console.log("Promise is rejected with error: OH BOII" + error);
          });
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
      localStorage.retrieveItem("alreadyLaunched").then(value => {
        if(value == null) {
            //first time launched
            this.setState({firstLaunch: true})
            localStorage.storeItem("alreadyLaunched", true)
        }
      })
  }

  render() {
    return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar
                    backgroundColor="#76AB00"
                    barStyle="light-content"
                />
                { this.update() }
                {!this.state.loading && (
                    <ThemeContext.Provider value={getTheme(uiTheme)}>
                        {!this.state.loggedIn && !this.state.firstLaunch && <MyAppNotLoggedIn />}
                        {this.state.loggedIn && this.state.clearance == 1 && !this.state.firstLaunch && <MyAppLoggedInAdmin />}
                        {this.state.loggedIn && this.state.clearance == 0 && !this.state.firstLaunch && <MyAppLoggedInUser />}
                        {this.state.firstLaunch && (
                            <Onboarding
                                onDone={() => {AsyncStorage.setItem('alreadyLaunched', true); this.setState({firstLaunch: false})}}
                                onSkip={() => {AsyncStorage.setItem('alreadyLaunched', true); this.setState({firstLaunch: false})}}
                                transitionAnimationDuration={250}
                                pages={[
                                {
                                   backgroundColor: '#8bc34a',
                                   image: <Image style={{height: '100%', width: '75%'}} resizeMode='contain' source={require('./assets/logo.png')} />,
                                   title: 'Bslim',
                                   subtitle: 'De meest geweldige app voor de sportende jeugd.',
                                },
                                {
                                   backgroundColor: '#8bc34a',
                                   image: <Icon size={120} name={ 'calendar-range' } style={{ color: 'white' }} />,
                                   title: 'Evenementen',
                                   subtitle: 'Op de evenementen pagina zie je alle evenementen die Bslim organiseert.',
                                },
                                {
                                   backgroundColor: '#8bc34a',
                                   image: <Icon size={120} name={ 'account' } style={{ color: 'white' }} />,
                                   title: 'Inloggen',
                                   subtitle: 'Door op onze app in te loggen kun je stempels verzamelen bij elk Bslim evenement.',
                                },
                                {
                                   backgroundColor: '#8bc34a',
                                   image: <Icon size={120} name={ 'bell' } style={{ color: 'white' }} />,
                                   title: 'Notificaties',
                                   subtitle: 'Dankzij de notificaties blijf je altijd op de hoogte.',
                                }
                                ]}
                            />
                        )}
                    </ThemeContext.Provider>
                )}
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
