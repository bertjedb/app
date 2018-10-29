import React, { Component } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextField } from "react-native-material-textfield";
import {
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";
import styles from "../assets/css/style.js";
import Api from "../config/api.js";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";

export default class ChangeEmailRequest extends Component {
  constructor() {
    super();
    this.state = {
      email: ""
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
      duration: 5000
    });
  }

  recover() {
    if (/\S+@\S+\.\S+/.test(this.state.email) == false) {
      this.errorMessage("Vul een geldig e-mail adres in");
    } else {
      let api = Api.getInstance();
      let userData = {
          'oldEmail': this.state.email,
      }
      api.callApi('changeEmailRequest', 'POST', userData, response => {
          if(response['responseCode'] != 503) {
            if(response['responseCode'] == 400){
               this.errorMessage('Het ingevulde e-mail adres is niet bij ons bekend.');
            } else if(response['responseCode'] == 500) {
                this.errorMessage('Er is iets fout gegaan bij het genereren van een veiligheidscode.')
            }
            else {
                this.successMessage('Er is een email met een veiligheids code verzonden naar: ' + response['oldEmail'],);
                this.props.navigation.dispatch(NavigationActions.navigate({
                      routeName: 'LoginStack',
                      action: NavigationActions.navigate({ routeName: 'ChangeEmail' })
                    }))
            }
          } else {
            this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
          }
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
            centerElement="E-mail verandering aanvragen"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <View style={styles.ChangeEmailReqcontainer}>
          <View style={styles.ChangeEmailReqcard} elevation={5}>
            <Text
              style={{
                margin: 15,
                fontWeight: "bold",
                fontSize: 14,
                color: "white"
              }}
            >
              Wil je je e-mail adres veranderen? Vul hieronder je huidige email
              adres in en ontvang een veiligheidscode om je e-mail adres te
              vervangen! (Check ook je spam map van je e-mail adres!)
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
                label="Email"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
              <Button
                style={{
                  container: styles.defaultBtn,
                  text: { color: "white" }
                }}
                raised
                text="Doorgaan"
                onPress={() => this.recover()}
              />
            </View>
          </View>
        </View>
        <FlashMessage position="top" />
      </ImageBackground>
    );
  }
}
