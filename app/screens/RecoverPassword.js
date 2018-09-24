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

export default class RecoverPassword extends Component {

  constructor() {
      super();
      this.state = {
        email: '',
      };

  }

  recover() {
      let api = Api.getInstance();
      let userData = {
          email: this.state.email,
      }
      api.callApi('/changePassword', 'POST', userData, response => {
          console.log(response);
      });
      alert("Er is een email met het nieuwe wachtwoord verzonden naar: " + this.state.email);
  }

  render() {
    return(

    <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.card} elevation={5}>
          <Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
          Wachtwoord herstellen
          </Text>
          <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
          <Text style={{marginTop: 10}}>
            Ben je je wachtwoord vergeten? Vul hieronder je email adres in en ontvang een nieuw wachtwoord!
            (Check ook je spam map van je email adres!)
          </Text>
          <TextField
            textColor='green'
            tintColor='green'
            baseColor='green'
            label='Email'
            value={this.state.email}
            onChangeText={ (email) => this.setState({ email }) }
          />
          <Button
            style={{container: stylesCss.defaultBtn, text: {color: 'white'}}}
            raised text="Doorgaan"
            onPress={() => this.recover()}
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
})
