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

const uiTheme = {
    palette: {
        primaryColor: '#3bb222',
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

class LoginScreen extends Component {

  constructor() {
      super();
			this.state = {
          email: '',
					password: ''
      };
  }

	login(){
		fetch('http://gaauwe.nl/login')
        .then((response) => response.json())
        .then((responseJson) => {

        })
        .catch((error) => {
            console.error(error);
        });
	}

  render() {
    return(

				<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
				<View style={styles.container}>
					<View style={styles.card} elevation={5}>
					 	<Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
						Inloggen
						</Text>
						<View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
						<TextField
							textColor='green'
							tintColor='green'
							baseColor='green'
			        label='Email'
			        value={this.state.email}
			        onChangeText={ (email) => this.setState({ email }) }
			      />
						<TextField
							textColor='green'
							tintColor='green'
							baseColor='green'
			        label='Wachtwoord'
							secureTextEntry={true}
			        value={this.state.password}
			        onChangeText={ (password) => this.setState({ password }) }
			      />
						<Button
              style={{container: stylesCss.defaultBtn, text: {color: 'white'}}}
              raised text="Doorgaan"
              onPress={() => alert("Login succesfull")}
            />
            <Text style={{marginTop: 15}}>
              Wachtwoord vergeten
            </Text>
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
	video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: 'contain',
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


export default LoginScreen;
