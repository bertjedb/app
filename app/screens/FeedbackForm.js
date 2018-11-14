import React, { Component } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Header, NavigationActions } from "react-navigation";
import { Toolbar, Button } from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import stylesCss from "../assets/css/style.js";
import { showMessage } from "react-native-flash-message";
import Api from "../config/api";

export default class FeedbackForm extends Component {
  constructor() {
    super();

    this.state = {
      subject: "",
      problem: ""
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

  sendFeedback() {
    if (
      this.state.email == "" ||
      this.state.password == "" ||
      this.state.problem == ""
    ) {
      this.errorMessage("Vul alstublieft alle velden in!");
    } else {
      let api = Api.getInstance();
      let feedbackData = {
        email: this.state.email,
        subject: this.state.subject,
        problem: this.state.problem
      };
      api.callApi("api/sendFeedbackForm", "POST", feedbackData, response => {
        if (response["responseCode"] != 503) {
          if (response["responseCode"] == 400) {
            this.errorMessage(
              "Het ingevulde e-mail adres is niet bij ons bekend."
            );
          } else {
            this.successMessage("Bedankt voor uw feedback");
            // this.props.navigation.dispatch(NavigationActions.navigate({
            //     routeName: 'LoginStack',
            //     action: NavigationActions.navigate({ routeName: 'ChangeEmail' })
            // }))
          }
        } else {
          this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
        }
      });

      this.setState({
        email: "",
        subject: "",
        problem: ""
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
            centerElement={"Feedback"}
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>

        <View style={styles.cardContainer}>
          <View style={styles.card} elevation={5}>
            <View
              style={{
                height: Dimensions.get("window").height - 160,
                borderRadius: 10,
                width: Dimensions.get("window").width - 50
              }}
            >
              <ScrollView style={styles.layoutContent}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Feedback formulier
                  </Text>
                </View>
                <TextField
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Email"
                  multiline={true}
                  autoCapitalize="none"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />

                <TextField
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Onderwerp"
                  multiline={true}
                  autoCapitalize="none"
                  value={this.state.subject}
                  onChangeText={subject => this.setState({ subject })}
                />

                <TextField
                  textColor="green"
                  tintColor="green"
                  baseColor="green"
                  label="Jouw feedback"
                  multiline={true}
                  autoCapitalize="none"
                  value={this.state.problem}
                  onChangeText={problem => this.setState({ problem })}
                  containerStyle={{ marginBottom: "7%" }}
                />

                <Button
                  style={{
                    container: stylesCss.defaultBtn,
                    text: { color: "white" },
                    marginBottom: 20
                  }}
                  raised
                  text="Verstuur"
                  onPress={() => this.sendFeedback()}
                />
              </ScrollView>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 150
  },

  card: {
    backgroundColor: "white",
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  layoutContent: {
    marginTop: "10%",
    marginRight: "10%",
    marginLeft: "10%"
  },

  cardTitle: {
    flexDirection: "row",
    margin: 0,
    padding: 0
  }
});
