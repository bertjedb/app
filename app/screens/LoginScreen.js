import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
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

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

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
          text: '',
      };
  }

	login(){
		fetch('http://gromdroid.nl/wp/wp-json/wp/v2/media')
        .then((response) => response.json())
        .then((responseJson) => {
            
        })
        .catch((error) => {
            console.error(error);
        });
	}

  render() {
    return(
      <ThemeContext.Provider value={getTheme(uiTheme)}>
         <Toolbar
           elevation={5}
           styles={styles.toolbar}
             leftElement="menu"
             onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
             centerElement={"Bslim"}
        />
				<View style={styles.container}>
					<View style={styles.card}>
						<TextInput
							style={{height: 40, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: 'black', borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 1, marginLeft: 5, marginRight: 5, marginTop: 5}}
							onChangeText={(text) => this.setState({text})}
							placeholder="Email"
							value={this.state.text}
							/>
						<TextInput
							style={{height: 40, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderColor: 'black', borderWidth: 1, marginLeft: 5, marginRight: 5, marginBottom: 5}}
							onChangeText={(text) => this.setState({text})}
							placeholder="Password"
							value={this.state.text}
							/>
						<TouchableOpacity
				      style={ styles.loginButton }>
				      <Text style={styles.loginButtonText}>Login</Text>
				    </TouchableOpacity>
					</View>
				</View>
      </ThemeContext.Provider>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
  },
	card: {
		backgroundColor: '#4caf50',
		margin: 10,
		padding: 15,
		borderRadius: 10

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
