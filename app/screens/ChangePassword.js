import React, {
    Component
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
		ImageBackground,
    Image,
    Divider,
} from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation';
import UserInput from './UserInput';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

import stylesCss from '../assets/css/style.js';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';

export default class ChangePassword extends Component {

  constructor() {
      super();
      this.state = {
        userId: null,
        email: '',
        oldPassword: '',
        firstNewPassword: '',
        secondNewPassword: '',
      };

  }

  changePassword() {
    if(this.state.firstOldPassword == this.state.secondOldPassword) {
        let localStorage = LocalStorage.getInstance();
        let api = Api.getInstance();

				localStorage.retrieveItem('userId').then((goals) => {
                    let userData = {
                        id: goals,
                        oldPassword: this.state.oldPassword,
                        newPassword: this.state.firstNewPassword
                    }
                    console.log(userData);
                    api.callApi('api/changePassword', 'POST', userData, response => {
                        if(response['responseCode'] == 200){
                            console.log(response['responseCode'])
                            this.props.navigation.dispatch(NavigationActions.back());
                        }
                    });

	              }).catch((error) => {
	              //this callback is executed when your Promise is rejected
	              console.log('Promise is rejected with error: ' + error);
	              });


    } else {
        alert('De ingevulde wachtwoorden zijn niet gelijk.')
    }

  }

  render() {
    return(

    <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.card} elevation={5}>
          <Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
          Wachtwoord veranderen
          </Text>
          <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
          <Text style={{marginTop: 10}}>
            Hier kun je je wachtwoord veranderen.
          </Text>
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Oud wachtwoord'
            secureTextEntry={true}
            value={this.state.oldPassword}
            onChangeText={ (oldPassword) => this.setState({ oldPassword }) }
          />
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Nieuw wachtwoord'
            secureTextEntry={true}
            value={this.state.firstNewPassword}
            onChangeText={ (firstNewPassword) => this.setState({ firstNewPassword }) }
          />
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Herhaal nieuw wachtwoord'
            secureTextEntry={true}
            value={this.state.secondNewPassword}
            onChangeText={ (secondNewPassword) => this.setState({ secondNewPassword }) }
          />
          <Button
            style={{container: stylesCss.defaultBtn, text: {color: 'white'}}}
            raised text="Doorgaan"
            onPress={() => this.changePassword()}
          />
        </View>
      </View>
    </View>
  </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
  },
	card: {
		backgroundColor: '#3bb222',
		margin: 10,
		borderRadius: 10,
		shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 3,
		},
  loginButton: {
    margin: 5,
    backgroundColor: '#FF6700',
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
})
