import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Dimensions,
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
import Api from '../config/api.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { sha256 } from 'react-native-sha256';
import stylesCss from '../assets/css/style.js';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import ActionButton from 'react-native-action-button';
import * as mime from 'react-native-mime-types';
import Video from 'react-native-af-video-player'
import DefaultUserImage from '../assets/default-user-image.png';
import ImgToBase64 from 'react-native-image-base64';


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

export default class CreateAdmin extends Component {

  constructor() {
      super();
      //sets the state for the registration screen, there are 2 passwords fields because we want
      // the user to type their password twice to avoid typing errors
      //the 'succesfull' state variable is used to display the snackbar when logged in
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        firstPassword: '',
        secondPassword: '',
        biography: '',
		    succesfull: false,
        pickedImage: DefaultUserImage,
        img: ''
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
          biography: this.state.biography,
          img: this.state.img
      }
      api.callApi('register-admin', 'POST', userData, response => {
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

  reset = () => {
    this.setState({
      pickedImage: DefaultUserImage
    });
  }

  /**
 * The first arg is the options object for customization (it can also be null or omitted forefault options),
 * The second arg is the callback which sends object: response (more info below in README)
 */

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        ImgToBase64.getBase64String(this.state.pickedImage.uri).then((base64String) => {
            this.setState({
                img: base64String
            });
        });

      }
    });
  }

  resetHandler = () =>{
    this.reset();
  }

  render() {
    return(
      <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
        <ScrollView style={styles.container}>
          <View style={styles.card} elevation={5}>
            <Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
            Registreer nieuw begeleider account
            </Text>
            <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
            <Text style={{marginTop: 10}}>
              Hier kun je een nieuw begeleider account aanmaken.
            </Text>

            <TouchableOpacity
              style={styles.placeholder}
              onPress={this.pickImageHandler}
            >
            <Image
                style={styles.img}
                source={this.state.pickedImage}
                 />
            </TouchableOpacity>

            <TextField
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Voornaam'
              value={this.state.firstName}
              onChangeText={ (firstName) => this.setState({ firstName }) }
            />
            <TextField
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Achternaam'
              value={this.state.lastName}
              onChangeText={ (lastName) => this.setState({ lastName }) }
            />
            <TextField
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Email adres'
              value={this.state.email}
              onChangeText={ (email) => this.setState({ email }) }
            />
            <TextField
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Wachtwoord'
              secureTextEntry={true}
              value={this.state.firstPassword}
              onChangeText={ (firstPassword) => this.setState({ firstPassword }) }
            />
            <TextField
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Herhaal wachtwoord'
              secureTextEntry={true}
              value={this.state.secondPassword}
              onChangeText={ (secondPassword) => this.setState({ secondPassword }) }
            />
            <TextField
              multiline={true}
              textColor='green'
              tintColor='green'
              baseColor='green'
              label='Biografie'
              value={this.state.biography}
              onChangeText={ (biography) => this.setState({ biography }) }
            />
            <Button
              style={{container: stylesCss.defaultBtn, text: {color: 'white'}}}
              raised text="Doorgaan"
              onPress={() => this.checkRegistration()}
            />
          </View>
        </View>
      </ScrollView>
      <FlashMessage position="top" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	card: {
		backgroundColor: '#93D500',
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

  placeholder: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    width:200,
    height:200,
    borderRadius:100,
    marginTop:20,
  },
  img: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    width:200,
    height:200,
    borderRadius:100,
  },
  button: {
    flexDirection:"row",
  },
  previewImage: {
      width: "100%",
      height: "100%"
  }

})
