import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground
} from "react-native";
import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button
} from 'react-native-material-ui';
import { DrawerActions, NavigationActions, Header } from 'react-navigation';
import stylesCss from '../assets/css/style.js';
import Api from '../config/api.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import { showMessage, hideMessage } from "react-native-flash-message";
import { sha256 } from "react-native-sha256";
import { TextField } from "react-native-material-textfield";
import LinearGradient from "react-native-linear-gradient";

export default class Registration extends Component {
  constructor() {
    super();
    //sets the state for the registration screen, there are 2 passwords fields because we want
    // the user to type their password twice to avoid typing errors
    //the 'succesfull' state variable is used to display the snackbar when logged in
    this.state = {
      email: "",
      firstPassword: "",
      secondPassword: "",
      firstName: "",
      lastName: "",
      succesfull: false
    };
  }

  componentWillUnmount() {
    if (this.state.succesfull) {
      Snackbar.show({
        title: "Registratie succesvol!",
        duration: Snackbar.LENGTH_LONG,
        action: {
          title: "OK",
          color: "green",
          onPress: () => {
            /* Do something. */
          }
        }
      });
    }
  }

  errorMessage(msg){
    showMessage({
        message: msg,
        type: "danger",
        duration: 3000,
      });
  }

  checkRegistration() {
    // empty check
    if (
      this.state.firstName == "" ||
      this.state.lastName == "" ||
      this.state.email == "" ||
      this.state.firstPassword == "" ||
      this.state.secondPassword == ""
    ) {
      this.errorMessage("Vul alstublieft alle velden in!");
    }

    // special chars check
    else if (/^[a-zA-Z0-9]*$/.test(this.state.firstName) == false) {
      this.errorMessage(
        "Gebruik alstublieft geen speciale karakters in uw naam!"
      );
    } else if (/^[a-zA-Z0-9]*$/.test(this.state.lastName) == false) {
      this.errorMessage(
        "Gebruik alstublieft geen speciale karakters in uw naam!"
      );
    } else if (/\S+@\S+\.\S+/.test(this.state.email) == false) {
      this.errorMessage("Gebruik alstublieft een valide email!");
    }

    // check password
    else if (this.state.firstPassword.length <= 5) {
      this.errorMessage("Uw wachtwoord moet langer dan 5 karakters zijn!");
    } else if (this.state.firstPassword.length >= 64) {
      this.errorMessage("Uw wachtwoord mag niet langer dan 64 karakters zijn!");
    } else if (this.state.firstPassword != this.state.secondPassword) {
      this.errorMessage("De ingevulde wachtwoorden zijn niet gelijk!");
    }

    // if registration is succesfull
    else {
      let api = Api.getInstance();
      sha256(this.state.firstPassword).then(hash => {
        let userData = {
          email: this.state.email,
          password: hash,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        };
        api.callApi("register", "POST", userData, response => {
          if (response["responseCode"] != 503) {
            if (response["responseCode"] == 200) {
              this.setState({
                succesfull: true
              });
              this.props.navigation.dispatch(NavigationActions.back());
            } else {
              alert(response["responseCode"]["message"]);
            }
          } else {
            this.errorMessage(
              "Zorg ervoor dat u een internet verbinding heeft"
            );
          }
        });
      });
    }
  }

  render() {
    return (
      <ImageBackground
        blurRadius={3}
        source={require("../assets/sport_kids_bslim.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={[
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201",
            "#94D600",
            "#76C201"
          ]}
          style={{ height: Header.HEIGHT }}
        >
          <Toolbar
            iconSet="MaterialCommunityIcons"
            centerElement="Registreren"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <View style={styles.container}>
          <View style={styles.card} elevation={5}>
            <Text
              style={{
                margin: 15,
                fontWeight: "bold",
                fontSize: 14,
                color: "white"
              }}
            >
              Hier kun je een nieuw account aanmaken.
            </Text>
            <View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
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
              autoCapitalize = 'none'
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
            <Button
              style={{container: stylesCss.defaultBtn, text: {color: 'white'}}}
              raised text="Doorgaan"
              onPress={() => this.checkRegistration()}
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
    justifyContent: "center"
  },
  card: {
    backgroundColor: "#93D500",
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 3
  },
  loginButton: {
    margin: 5,
    backgroundColor: "#FF6700",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden"
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white"
  }
});
