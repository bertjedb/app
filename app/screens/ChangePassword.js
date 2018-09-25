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
import { DrawerActions } from 'react-navigation';
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

export default class ChangePassword extends Component {

  constructor() {
      super();
      this.state = {
        email: '',
        newPassword: '',
        firstOldPassword: '',
        secondOldPassword: '',
      };

  }

  changePassword() {
    if(this.state.firstOldPassword == this.state.secondOldPassword) {
        let api = Api.getInstance();
        let userData = {
            email: this.state.email,
            newPassword: this.state.newPassword
        }
        api.callApi('/changePassword', 'POST', userData, response => {
            console.log(response);
        });
        alert("Changing password");
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
            label='Nieuw wachtwoord'
            value={this.state.newPassword}
            onChangeText={ (newPassword) => this.setState({ newPassword }) }
          />
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Oud wachtwoord'
            secureTextEntry={true}
            value={this.state.firstOldPassword}
            onChangeText={ (firstOldPassword) => this.setState({ firstOldPassword }) }
          />
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Herhaal oud wachtwoord'
            secureTextEntry={true}
            value={this.state.secondOldPasswordt}
            onChangeText={ (secondOldPasswordt) => this.setState({ secondOldPasswordt }) }
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
