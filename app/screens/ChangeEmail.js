import React, { Component } from "react";

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
import { DrawerActions, NavigationActions, Header } from 'react-navigation';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';
import LinearGradient from 'react-native-linear-gradient';

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

import stylesCss from "../assets/css/style.js";
import Api from "../config/api.js";
import LocalStorage from "../config/localStorage.js";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default class ChangeEmail extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
      oldEmail: "",
      newEmail: "",
      secCode: ""
    };
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 2500
    });
  }

  successMessage(msg) {
    showMessage({
      message: msg,
      type: "success",
      duration: 4000
    });
  }

  changeEmail() {
    let api = Api.getInstance();
    let userData = {
        'oldEmail': this.state.oldEmail,
        'newEmail': this.state.newEmail,
        'secCode': this.state.secCode
    }
    api.callApi('changeUserEmail', 'POST', userData, response => {
          if(response['responseCode'] != 503) {
            if(response['responseCode'] == 200) {
                this.setState({
                    oldEmail: '',
                    newEmail: '',
                    secCode: ''
                })
                this.successMessage("Je e-mail adres is verandert")
            } else if(response['responseCode'] == 400) {
                this.setState({'secCode': ''})
                this.errorMessage(response['msg'])
            } else {
                this.errorMessage('Er is wat fout gegaan')
            }
          } else {
            this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
          } 
      });
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
            centerElement="Wachtwoord veranderen"
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
              Hier kun je je E-mail adres veranderen.
            </Text>
            <View
              style={{
                backgroundColor: "white",
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 15,
                paddingTop: 0,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10
              }}
            >
              <TextField
                textColor="green"
                tintColor="green"
                baseColor="green"
                label="Oude E-mail adres"
                value={this.state.oldEmail}
                onChangeText={oldEmail => this.setState({ oldEmail })}
              />
              <TextField
                textColor="green"
                tintColor="green"
                baseColor="green"
                label="Nieuwe E-mail adres"
                value={this.state.newEmail}
                onChangeText={newEmail => this.setState({ newEmail })}
              />
              <TextField
                textColor="green"
                tintColor="green"
                baseColor="green"
                label="Veiligheidscode"
                secureTextEntry={true}
                value={this.state.secCode}
                onChangeText={secCode => this.setState({ secCode })}
              />
              <Button
                style={{
                  container: stylesCss.defaultBtn,
                  text: { color: "white" }
                }}
                raised
                text="Doorgaan"
                onPress={() => this.changeEmail()}
              />
            </View>
          </View>
        </View>
        <FlashMessage position="top" />
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
