import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground
} from 'react-native';
import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button
} from 'react-native-material-ui';
import { DrawerActions, NavigationActions } from 'react-navigation';
import styles from '../assets/css/style.js';
import Api from '../config/api.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';


const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

export default class Registration extends Component {

  constructor() {
      super();
      //sets the state for the registration screen, there are 2 passwords fields because we want
      // the user to type their password twice to avoid typing errors
      //the 'succesfull' state variable is used to display the snackbar when logged in
      this.state = {
        email: '',
        firstPassword: '',
        secondPassword: '',
        firstName: '',
        lastName: '',
		succesfull: false,
      };

  }

	componentWillUnmount() {
		if(this.state.succesfull){
			Snackbar.show({
			  title: 'Registratie succesvol!',
			  duration: Snackbar.LENGTH_LONG,
			  action: {
			    title: 'OK',
			    color: 'green',
			    onPress: () => { /* Do something. */ },
			  },
			});
		}
	}

  registrate() {
  	//first checks wether or not the 2 password fields contain the same password
    if(this.state.firstPassword == this.state.secondPassword) {
    	if(this.state.firstPassword.length >= 5) {
        	let api = Api.getInstance();
        	//hash password here
        	let userData = {
        	    email: this.state.email,
        	    password: this.state.firstPassword,
        	    firstName: this.state.firstName,
        	    lastName: this.state.lastName,
        	}
        	api.callApi('register', 'POST', userData, response => {
        	    if(response['responseCode'] == 200){
								this.setState({
									succesfull: true,
								})
								this.props.navigation.dispatch(NavigationActions.back());
				} else {
					alert("Probeer opnieuw aub")
				}
        	});
        } else {
        	alert('Je wachtwoord moet minimaal 5 karakters lang zijn');
        }
    } else {
        alert('De ingevulde wachtwoorden zijn niet gelijk.');
    }

  }

  render() {
    return(
			<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
				<View style={styles.container}>
					<View style={styles.card} elevation={5}>
						<Text style={{margin: 15, fontWeight: 'bold', fontSize: 16, color: '#93D500'}}>
						Registreren
						</Text>
						<View style={{backgroundColor: '#93D500', height: 340, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
							<View style={{paddingLeft: 10, paddingRight: 10, paddingTop: 20, paddingBottom: 10}}>
								<View style={styles.SectionStyle}>
									<Icon name="account-box-outline" size={24} color='grey' style={styles.ImageStyle}/>
									<TextInput
											style={{flex:1}}
											label="First name"
                      placeholder="Voornaam"
                      value={ this.state.firstName }
                      onChangeText={ firstName => this.setState({firstName}) }
									/>
								</View>
							</View>
							<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
								<View style={styles.SectionStyle}>
									<Icon name="account-box" size={24} color='grey' style={styles.ImageStyle}/>
									<TextInput
											style={{flex:1}}
											label="Last name"
                      placeholder="Achternaam"
                      value={ this.state.lastName }
                      onChangeText={ lastName => this.setState({lastName}) }
									/>
								</View>
							</View>
							<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
								<View style={styles.SectionStyle}>
									<Icon name="at" size={24} color='grey' style={styles.ImageStyle}/>
									<TextInput
											style={{flex:1}}
											label="E-mail address"
                      placeholder="E-mailadres"
                      value={ this.state.email }
                      onChangeText={ email => this.setState({email}) }
									/>
								</View>
							</View>
							<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
								<View style={styles.SectionStyle}>
									<Icon name="lock" size={24} color='grey' style={styles.ImageStyle}/>
									<TextInput
											style={{flex:1}}
											label="Password"
                      value={ this.state.password }
                      placeholder="Wachtwoord (min. 6 characters)"
											secureTextEntry={true}
                      onChangeText={ firstPassword => this.setState({firstPassword}) }
									/>
								</View>
							</View>
							<View style={{paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
								<View style={styles.SectionStyle}>
									<Icon name="lock" size={24} color='grey' style={styles.ImageStyle}/>
									<TextInput
											style={{flex:1}}
											label="Password"
                      value={ this.state.password }
                      placeholder="Herhaal wachtwoord"
                      onChangeText={ secondPassword => this.setState({secondPassword}) }
                      secureTextEntry={true}
                      onSubmitEditing= { () => {
                          this.registrate();
                      }}
									/>
								</View>
							</View>
							<Button
                style={{container: styles.rgstBtn, text:{color: 'white'}}}
                raised text="Doorgaan"
                onPress={() => {
                    this.registrate();
                }}>
              </Button>
						</View>
					</View>
				</View>
			</ImageBackground>
    );
  }
}
