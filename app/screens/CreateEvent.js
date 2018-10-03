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
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { sha256 } from 'react-native-sha256';

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

export default class CreateEvent extends Component {

  constructor() {
      super();
      //sets the state for the registration screen, there are 2 passwords fields because we want
      // the user to type their password twice to avoid typing errors
      //the 'succesfull' state variable is used to display the snackbar when logged in
      this.state = {
        email: 't@t.nl',
        firstPassword: '123456',
        secondPassword: '123456',
        firstName: 't',
        lastName: 't',
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

  errorMessage(msg){
    showMessage({
        message: msg,
        type: "danger",
        duration: 2500,
      });
  }

  checkRegistration() {
    console.log(this.state);
    // empty check
    if(this.state.firstName == "" ||
       this.state.lastName == "" ||
       this.state.email == "" ||
       this.state.firstPassword == "" ||
       this.state.secondPassword == ""){
         this.errorMessage("Vul alstublieft alle velden in!");
       }

    // special chars check
    else if(/^[a-zA-Z0-9]*$/.test(this.state.firstName) == false){
      this.errorMessage("Gebruik alstublieft geen speciale karakters in uw naam!");
    }
    else if(/^[a-zA-Z0-9]*$/.test(this.state.lastName) == false){
      this.errorMessage("Gebruik alstublieft geen speciale karakters in uw naam!");
    }
    else if(/\S+@\S+\.\S+/.test(this.state.email) == false){
      this.errorMessage("Gebruik alstublieft een valide email!");
    }

    // check password
    else if(this.state.firstPassword.length <= 5){
      this.errorMessage("Uw wachtwoord moet langer dan 5 karakters zijn!");
    }
    else if(this.state.firstPassword.length >= 64){
      this.errorMessage("Uw wachtwoord mag niet langer dan 64 karakters zijn!");
    }
    else if(this.state.firstPassword != this.state.secondPassword){
      this.errorMessage("De ingevulde wachtwoorden zijn niet gelijk!");
    }

    // if registration is succesfull
    else {
      let api = Api.getInstance();
      sha256(this.state.firstPassword).then( hash => {
        let userData = {
          email: this.state.email,
          password: hash,
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
            alert(response['responseCode']['message'])
          }
        })
      })
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
                      value={ this.state.firstPassword }
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
                      value={ this.state.secondPassword }
                      placeholder="Herhaal wachtwoord"
                      onChangeText={ secondPassword => this.setState({secondPassword}) }
                      secureTextEntry={true}
                      onSubmitEditing= { () => {
                          this.checkRegistration();
                      }}
									/>
								</View>
							</View>
							<Button
                style={{container: styles.rgstBtn, text:{color: 'white'}}}
                raised text="Doorgaan"
                onPress={() => {
                    this.checkRegistration();
                }}>
              </Button>
						</View>
					</View>
				</View>
        <FlashMessage position="top" />
			</ImageBackground>
    );
  }
}
