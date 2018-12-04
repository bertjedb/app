import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import {
  COLOR,
  Toolbar,
  Button
} from "react-native-material-ui";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import Api from "../config/api.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Snackbar from "react-native-snackbar";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { sha256 } from "react-native-sha256";
import stylesCss from "../assets/css/style.js";
import { TextField } from "react-native-material-textfield";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import ProgressBarAnimated from "react-native-progress-bar-animated";
import ActionButton from "react-native-action-button";
import * as mime from "react-native-mime-types";
import DefaultUserImage from "../assets/default-user-image.png";
import LinearGradient from "react-native-linear-gradient";
import ImgToBase64 from "react-native-image-base64";

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500
  },
  toolbar: {
    container: {
      height: 60
    }
  }
};

export default class CreateAdmin extends Component {
  constructor() {
    super();
    //sets the state for the registration screen, there are 2 passwords fields because we want
    // the user to type their password twice to avoid typing errors
    //the 'succesfull' state variable is used to display the snackbar when logged in
    this.state = {
      wordpress: true,
      wpUsername: "",
      wpPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      firstPassword: "",
      secondPassword: "",
      biography: "",
      succesfull: false,
      pickedImage: DefaultUserImage,
      emailError: "",
      emailColor: "green",
      firstPasswordError: "",
      firstPasswordColor: "green",
      secondPasswordError: "",
      secondPasswordColor: "green",
      img: ""
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

  wordpressLogin() {
    data = {
      username: this.state.wpUsername,
      password: this.state.wpPassword
    }; //change fetch url to bslim wordpress
    fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          firstName: responseJson["data"]["display_name"].substr(
            0,
            responseJson["data"]["display_name"].indexOf(" ")
          ),
          lastName: responseJson["data"]["display_name"].substr(
            responseJson["data"]["display_name"].indexOf(" ") + 1
          ),
          email: responseJson["data"]["user_email"],
          idWP: responseJson["data"]["ID"],
          firstPassword: this.state.wpPassword,
          secondPassword: this.state.wpPassword,
          biography: "",
          wordpress: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 2500
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
      RNFetchBlob.fetch(
        "POST",
        "http://gromdroid.nl/bslim/wp-json/wp/v2/media",
        {
          //// TODO: Real authorization instead of hardcoded base64 username:password
          Authorization: "Basic YWRtaW46YnNsaW1faGFuemUh",
          "Content-Type": +"image/jpeg",
          "Content-Disposition": "attachment; filename=hoi.jpg"
          // here's the body you're going to send, should be a BASE64 encoded string
          // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
          // The data will be converted to "byte array"(say, blob) before request sent.
        },
        RNFetchBlob.wrap(this.state.pickedImage.uri)
      )
        .then(res => res.json())
        .then(responseJson => {
          sha256(this.state.firstPassword).then(hash => {
            console.log(responseJson["guid"]["raw"]);
            let userData = {
              email: this.state.email,
              password: hash,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              biography: this.state.biography,
              img: responseJson["guid"]["raw"],
              wordpresskey: this.state.idWP
            };
            api.callApi("register-admin", "POST", userData, response => {
              console.log(response);
              if (response["responseCode"] == 200) {
                this.setState({
                  succesfull: true
                });
                this.props.navigation.dispatch(NavigationActions.back());
              } else {
                alert(response["responseCode"]["message"]);
              }
            });
          });
        })

        .catch(error => {
          callBack(error);
        });
    }
  }

  reset = () => {
    this.setState({
      pickedImage: DefaultUserImage,
      img: ""
    });
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an Image", maxWidth: 800, maxHeight: 600 },
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: { uri: res.uri }
          });
        }
      }
    );
  };

  checkEmail(email) {
    if (/\S+@\S+\.\S+/.test(email) == false) {
      this.setState({
        emailError: "Vul een geldig email adres in",
        email: email,
        emailColor: "red"
      });
    } else {
      this.setState({ emailError: "", email: email, emailColor: "green" });
    }
  }

  checkFirstPassword(password) {
    if (password.length <= 5) {
      this.setState({
        firstPasswordError: "Uw wachtwoord moet langer dan 5 karakters zijn!",
        firstPassword: password,
        firstPasswordColor: "red"
      });
    } else if (password.length >= 64) {
      this.setState({
        firstPasswordError:
          "Uw wachtwoord mag niet langer dan 64 karakters zijn!",
        firstPassword: password,
        firstPasswordColor: "red"
      });
    } else {
      this.setState({
        firstPasswordError: "",
        firstPassword: password,
        firstPasswordColor: "green"
      });
    }
  }

  checkSecondPassword(password) {
    if (password.length <= 5) {
      this.setState({
        secondPasswordError: "Uw wachtwoord moet langer dan 5 karakters zijn!",
        secondPassword: password,
        secondPasswordColor: "red"
      });
    } else if (password.length >= 64) {
      this.setState({
        secondPasswordError:
          "Uw wachtwoord mag niet langer dan 64 karakters zijn!",
        secondPassword: password,
        secondPasswordColor: "red"
      });
    } else if (this.state.firstPassword != password) {
      this.setState({
        secondPasswordError: "Wachtwoord is niet hetzelfde",
        secondPassword: password,
        secondPasswordColor: "red"
      });
    } else {
      this.setState({
        secondPasswordError: "",
        secondPassword: password,
        secondPasswordColor: "green"
      });
    }
  }

  resetHandler = () => {
    this.reset();
  };

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
            centerElement="Nieuwe begeleider"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <ScrollView style={styles.container}>
          {this.state.wordpress && (
            <View
              onPress={() => this.wordpressLogin()}
              style={{
                backgroundColor: "#028cb0",
                borderRadius: 10,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                margin: 10
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Icon
                    size={48}
                    name={"wordpress"}
                    style={{ padding: 5, color: "white" }}
                  />

                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "white"
                    }}
                  >
                    {"Login op wordpress"}
                  </Text>
                </View>
                <View
                  style={{ marginLeft: 10, marginRight: 20, marginBottom: 20 }}
                >
                  <TextField
                    multiline={true}
                    textColor="white"
                    tintColor="white"
                    baseColor="white"
                    label="Gebruikersnaam"
                    value={this.state.wpUsername}
                    onChangeText={wpUsername => this.setState({ wpUsername })}
                  />
                  <TextField
                    multiline={true}
                    textColor="white"
                    tintColor="white"
                    baseColor="white"
                    label="Wachtwoord"
                    secureTextEntry={true}
                    value={this.state.wpPassword}
                    onChangeText={wpPassword => this.setState({ wpPassword })}
                  />
                  <Button
                    style={{
                      container: { marginTop: 10, backgroundColor: "white" },
                      text: { color: "#028cb0" }
                    }}
                    raised
                    text="Doorgaan"
                    onPress={() => this.wordpressLogin()}
                  />
                </View>
              </View>
            </View>
          )}
          {!this.state.wordpress && (
            <View style={styles.card} elevation={5}>
              <Text
                style={{
                  margin: 15,
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "white"
                }}
              >
                Hier kun je een nieuw begeleider account koppelen.
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
                <View
                  style={{
                    widht: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={styles.placeholder}
                    onPress={this.pickImageHandler}
                  >
                    <ImageBackground
                      blurRadius={3}
                      style={styles.img}
                      imageStyle={{ borderRadius: 100 }}
                      source={this.state.pickedImage}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 100,
                          with: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,.3)"
                        }}
                      >
                        <Icon
                          size={35}
                          name={"image-plus"}
                          style={{ color: "white" }}
                        />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <TextField
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Voornaam"
                  value={this.state.firstName}
                  onChangeText={firstName => this.setState({ firstName })}
                />
                <TextField
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Achternaam"
                  value={this.state.lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                />
                <TextField
                  textColor={this.state.emailColor}
                  tintColor="green"
                  baseColor="green"
                  error={this.state.emailError}
                  label="Email adres"
                  value={this.state.email}
                  onChangeText={email => this.checkEmail(email)}
                />
                <TextField
                  textColor={this.state.firstPasswordError}
                  tintColor="green"
                  baseColor="green"
                  error={this.state.firstPasswordError}
                  label="Wachtwoord"
                  secureTextEntry={true}
                  value={this.state.firstPassword}
                  onChangeText={firstPassword =>
                    this.checkFirstPassword(firstPassword)
                  }
                />
                <TextField
                  textColor={this.state.secondPasswordError}
                  tintColor="green"
                  baseColor="green"
                  error={this.state.secondPasswordError}
                  label="Herhaal wachtwoord"
                  secureTextEntry={true}
                  value={this.state.secondPassword}
                  onChangeText={secondPassword =>
                    this.checkSecondPassword(secondPassword)
                  }
                />
                <TextField
                  multiline={true}
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Biografie"
                  value={this.state.biography}
                  onChangeText={biography => this.setState({ biography })}
                />
                <Button
                  style={{
                    container: stylesCss.defaultBtn,
                    text: { color: "white" }
                  }}
                  raised
                  text="Doorgaan"
                  onPress={() => this.checkRegistration()}
                />
              </View>
            </View>
          )}
        </ScrollView>
        <FlashMessage position="top" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  },

  placeholder: {
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,.6)",
    borderColor: "rgba(0,0,0,0.2)",
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 20
  },
  img: {
    borderWidth: 1,
    backgroundColor: "rgba(0,0,0,.6)",
    borderColor: "rgba(0,0,0,0.2)",
    width: 100,
    height: 100,
    borderRadius: 100
  },
  button: {
    flexDirection: "row"
  },
  previewImage: {
    width: "100%",
    height: "100%"
  }
});