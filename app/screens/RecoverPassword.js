import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Divider
} from "react-native";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import { FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextField } from "react-native-material-textfield";
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
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";

export default class RecoverPassword extends Component {
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
      this.errorMessage("Vul een geldig e-mail adres in!!");
    } else {
      let api = Api.getInstance();
      let userData = {
        email: this.state.email
      };
      api.callApi("reset-password", "POST", userData, response => {
        if (response["responseCode"] != 503) {
          if (response["boolean"] == false) {
            this.errorMessage(
              "Er bestaat geen account met het e-mail adres: " +
                this.state.email
            );
          } else {
            this.successMessage(
              "Er is een e-mail met het nieuwe wachtwoord verzonden naar: " +
                this.state.email
            );
            this.props.navigation.dispatch(
              NavigationActions.navigate({
                routeName: "LoginStack",
                action: NavigationActions.navigate({ routeName: "LoginScreen" })
              })
            );
          }
        } else {
          this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
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
            centerElement="Wachtwoord opvragen"
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
              Ben je je wachtwoord vergeten? Vul hieronder je e-mail adres in en
              ontvang een nieuw wachtwoord! (Check ook je spam map van je e-mail
              adres!)
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
                  container: stylesCss.defaultBtn,
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
  }
});
