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
  AsyncStorage
} from "react-native";
import { DrawerActions, Header, NavigationActions } from "react-navigation";
import { FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextField } from "react-native-material-textfield";
import Api from "../config/api.js";
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { sha256 } from "react-native-sha256";
import LinearGradient from "react-native-linear-gradient";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

import stylesCss from "../assets/css/style.js";
import LocalStorage from "../config/localStorage.js";
import FBSDK, {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken
} from "react-native-fbsdk";
import * as Snackbar from "react-native-snackbar";

const uiTheme = {
  palette: {
    primaryColor: "#3bb222"
  },
  toolbar: {
    container: {
      height: 60
    }
  }
};

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      succesfull: false
    };
   }

  componentWillUnmount() {
    if (true) {
     // hier kan een succes message komen voor inloggen.
    // maar je word ook al geredirect.
    }
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


  setUser(value, id, clearance, wordpresskey) {
    console.log("hallo");
    let localStorage = LocalStorage.getInstance();
    localStorage.storeItem("succesfull", true);
    this.props.navigation.dispatch(NavigationActions.back());
    localStorage.storeItem("userId", id);
    localStorage.storeItem("wordpresskey", wordpresskey);
    localStorage.storeItem("clearance", clearance);
    let api = Api.getInstance();
    api.getPoints();
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
    if (this.state.email == "" || this.state.password == "") {
      this.errorMessage("Vul alstublieft alle velden in!");
    } else if (/\S+@\S+\.\S+/.test(this.state.email) == false) {
      this.errorMessage("Het ingevoerde email adres is geen valide email!");
    } else {
      let api = Api.getInstance();
      sha256(this.state.password).then(hash => {
        let userData = {
          email: this.state.email,
          password: hash
        };
        api.callApi("login", "POST", userData, response => {
          if (response["responseCode"] != 503) {
            if (response["boolean"] == "true") {
              this.setUser(
                response["value"],
                response["userId"],
                response["clearance"],
                response["wordpresskey"]
              );
            } else {
              this.errorMessage(response["msg"]);
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

  fbAuth() {
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      function(result) {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then(data => {
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                console.log(error);
              } else {
                userData = {
                  email: result["email"],
                  firstName: result["first_name"],
                  lastName: result["last_name"]
                };
                let api = Api.getInstance();
                api.callApi("facebookLogin", "POST", userData, response => {
                  if (response["responseCode"] != 503) {
                    if (response["boolean"] == "true") {
                      let localStorage = LocalStorage.getInstance();
                      localStorage.storeItem("succesfull", true);
                      localStorage.storeItem("userId", response["userId"]);
                      localStorage.storeItem(
                        "wordpresskey",
                        response["wordpresskey"]
                      );
                      localStorage.storeItem(
                        "clearance",
                        response["clearance"]
                      );
                    } else {
                      response => this.errorMessage(response["msg"]);
                    }
                  } else {
                    () =>
                      this.errorMessage(
                        "Zorg ervoor dat u een internet verbinding heeft"
                      );
                  }
                });
              }
            };

            const infoRequest = new GraphRequest(
              "/me",
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: "id,email,first_name,last_name"
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function(error) {
        console.log(error);
      }
    );
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
            centerElement="Inloggen"
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
              Inloggen
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
                label="Email adres"
                autoCapitalize="none"
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
            />
              <TextField
                textColor="green"
                tintColor="green"
                baseColor="green"
                label="Wachtwoord"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
              <Button
                style={{
                  container: stylesCss.loginBtn,
                  text: { color: "white" }
                }}
                raised
                text="Doorgaan"
                onPress={() => this.login()}
              />
              <TouchableOpacity
                onPress={() => this.fbAuth()}
                style={stylesCss.facebookBtn}
              >
                <Image
                  source={require("../assets/fbLogo.png")}
                  resizeMode="cover"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    marginRight: "20%"
                  }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    color: "white",
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  Login met Facebook
                </Text>
              </TouchableOpacity>
              <Button
                style={{
                  container: stylesCss.defaultBtn,
                  text: { color: "white" }
                }}
                raised
                text="Nog geen account? Registreer nu!"
                onPress={() => this.props.navigation.navigate("Registration")}
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
    height: 270,
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  SectionStyleTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  SectionStyleBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },

  ImageStyle: {
    margin: 5,
    alignItems: "center"
  },
  logo: {
    height: 250,
    width: 300,
    resizeMode: "contain"
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

export default LoginScreen;
