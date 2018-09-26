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
		AsyncStorage,
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import { NavigationActions } from 'react-navigation';
import Api from '../config/api.js';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

import stylesCss from '../assets/css/style.js';
import LocalStorage from '../config/localStorage.js';

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
<<<<<<< HEAD
          		email: '',
				password: ''
=======
          firstName: 'ha@ha.nl',
					password: '123456',
					succesfull: false,
>>>>>>> upstream/master
      };
  }

	componentWillUnmount() {
		if(true){
			Snackbar.show({
			  title: 'Login succesvol!',
			  duration: Snackbar.LENGTH_LONG,
			  action: {
			    title: 'OK',
			    color: 'green',
			    onPress: () => { /* Do something. */ },
			  },
			});
		}
	}

	setUser(value, id){
		let localStorage = LocalStorage.getInstance();
		localStorage.storeItem('succesfull', true);
		alert(id);
		this.props.navigation.dispatch(NavigationActions.back())

		localStorage.storeItem('userId', id);
   }

	 async storeItem(key, item) {
		 try {
				 //we want to wait for the Promise returned by AsyncStorage.setItem()
				 //to be resolved to the actual value before returning the value
				 var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
				 return jsonOfItem;
		 } catch (error) {
			 console.log(error.message);
		 }
 	}

	login() {
        let api = Api.getInstance();
        let userData = {
            email: this.state.email,
            password: this.state.password,
        }

        api.callApi('login', 'POST', userData, response => {
					console.log(response);
            if(response['value'] == true){
				this.setUser(response['value'], response['userId']);
			} else {
				alert("ERROR " + response['value'])
				//alert("Please try again..")
			}
        });
        //alert("registrating");

  }

  render() {
    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>

			<View style={styles.container}>
				<View style={styles.card} elevation={5}>
				<Text style={{margin: 15, fontWeight: 'bold', fontSize: 16, color: '#93D500'}}>
				Inloggen
				</Text>
					<View style={{backgroundColor: '#93D500', height: 220, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
						<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 20}}>
							<View style={styles.SectionStyleTop}>
								<Icon name="at" size={24} color='grey' style={styles.ImageStyle}/>
								<TextInput
										style={{flex:1}}
										placeholder="Email"
										underlineColorAndroid="transparent"
										value={ this.state.email }
										onChangeText={ email => this.setState({email}) }
								/>
							</View>
						</View>
						<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
							<View style={styles.SectionStyleBottom}>
								<Icon name="lock" size={24} color='grey' style={styles.ImageStyle}/>
								<TextInput
										style={{flex:1}}
										secureTextEntry={true}
										placeholder="Password"
										underlineColorAndroid="transparent"
										value={ this.state.password }
										onChangeText={ password => this.setState({password}) }
								/>
							</View>
						</View>
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: '#FF6700'
								},
								text: {
									color: 'white'
								}
							}}
							raised text="Doorgaan"
							onPress={() => this.login()} />
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: '#FF6700'
								},
								text: {
									color: 'white'
								}
							}}
							raised text="Registreren"
							onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({
								routeName: 'LoginStack',
								action: NavigationActions.navigate({ routeName: 'Registration' })
								})
							)} />
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
		backgroundColor: '#FFFFFF',
		height: 270,
		margin: 10,
		borderRadius: 10,
		shadowOffset: {width: 0, height: 13},
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3,
	},

  SectionStyleTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
		borderTopLeftRadius: 5 ,
		borderTopRightRadius: 5 ,
	},

	SectionStyleBottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderBottomLeftRadius: 5 ,
		borderBottomRightRadius: 5 ,
	},

	ImageStyle: {
	    margin: 5,
	    alignItems: 'center'
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
