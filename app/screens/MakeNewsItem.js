import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  NetInfo,
  ScrollView
} from "react-native";
import styles from "../assets/css/style.js";
import { showMessage } from "react-native-flash-message";
import { TextField } from "react-native-material-textfield";
import { Button, Toolbar } from "react-native-material-ui";
import Api from "../config/api.js";
import LocalStorage from "../config/localStorage.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";
import ImgToBase64 from "react-native-image-base64";
import LinearGradient from "react-native-linear-gradient";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import { PacmanIndicator } from "react-native-indicators";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default class MakeNewsItem extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      pickedImage: { uri: "" },
      imgPicked: false,
      loading: false
    };
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 3000
    });
  }

  successMessage(msg) {
    showMessage({
      message: msg,
      type: "success",
      duration: 4000
    });
  }

  createWPArticle() {
    fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/make-post", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        title: this.state.title,
        content:
          "<p>" +
          this.state.content +
          '</p><img src="' +
          this.state.img +
          '" alt="Image" />'
      }) // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        alert("Nieuw artikel succesvol aangemaakt");

        this.props.navigation.dispatch(NavigationActions.back());
        this.setState({ loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  createArticle() {
    this.setState({ loading: true });

    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (
          this.state.title != "" &&
          this.state.title.length <= 64 &&
          this.state.content != "" &&
          this.state.pickedImage.uri != ""
        ) {
          RNFetchBlob.fetch(
            "POST",
            "http://gromdroid.nl/bslim/wp-json/wp/v2/media",
            {
              Authorization: "Basic YWRtaW46YnNsaW1faGFuemUh",
              "Content-Type": +"image/jpeg",
              "Content-Disposition": "attachment; filename=hoi.jpg"
            },
            RNFetchBlob.wrap(this.state.pickedImage.uri)
          )
            .then(res => res.json())
            .then(responseJson => {
              this.setState({ img: responseJson["guid"]["raw"] });
              this.createWPArticle();
              console.log(this.state.img);
            })
            .catch(error => {
              callBack(error);
            });
        } else if (
          this.state.content != "" &&
          this.state.pickedImage.uri != "" &&
          this.state.title.length > 64
        ) {
          this.errorMessage("De titel mag maximaal 64 characters lang zijn!");
        } else {
          this.errorMessage("Vul alle velden in aub");
        }
      } else {
        this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
      }
    });
  }

  handleBegin(dateTime) {
    minutes = dateTime.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    dateString =
      dateTime.getDate().toString() +
      "-" +
      (dateTime.getMonth() + 1).toString() +
      "-" +
      dateTime.getFullYear().toString() +
      " " +
      dateTime.getHours().toString() +
      ":" +
      minutes;

    dateToSend =
      dateTime.getFullYear().toString() +
      "-" +
      (dateTime.getMonth() + 1).toString() +
      "-" +
      dateTime.getDate().toString() +
      " " +
      dateTime.getHours().toString() +
      ":" +
      minutes;
    this.setState({ begin: dateToSend, beginText: dateString });
    this.hidePicker();
  }

  handleEnd(dateTime) {
    minutes = dateTime.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    dateString =
      dateTime.getDate().toString() +
      "-" +
      (dateTime.getMonth() + 1).toString() +
      "-" +
      dateTime.getFullYear().toString() +
      " " +
      dateTime.getHours().toString() +
      ":" +
      minutes;

    dateToSend =
      dateTime.getFullYear().toString() +
      "-" +
      (dateTime.getMonth() + 1).toString() +
      "-" +
      dateTime.getDate().toString() +
      " " +
      dateTime.getHours().toString() +
      ":" +
      minutes;
    this.setState({ end: dateToSend, endText: dateString });
    this.hidePicker();
  }

  hidePicker() {
    this.setState({ showBegin: false, showEnd: false });
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: "Pick an Image", maxWidth: 500, maxHeight: 500 },
      res => {
        if (res.didCancel) {
          console.log("User cancelled!");
        } else if (res.error) {
          console.log("Error", res.error);
        } else {
          this.setState({
            pickedImage: { uri: res.uri },
            imgPicked: true
          });
        }
      }
    );
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
            centerElement="Nieuws aanmaken"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <View style={styles.container}>
          {!this.state.loading && (
            <ScrollView>
              <View style={styles.cardGreen} elevation={5}>
                <Text
                  style={{
                    margin: 15,
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "white"
                  }}
                >
                  Nieuws artikel aanmaken
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
                  <Text style={{ marginTop: 10 }}>
                    Hier kun je een nieuws artikel aanmaken
                  </Text>
                  <TextField
                    textColor="green"
                    tintColor="green"
                    baseColor="green"
                    label="Titel"
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                  />

                  <TextField
                    textColor="green"
                    tintColor="green"
                    baseColor="green"
                    label="Inhoud"
                    multiline={true}
                    numberOfLines={30}
                    value={this.state.content}
                    onChangeText={content => this.setState({ content })}
                  />

                  <TouchableOpacity
                    style={styles.imgSel}
                    onPress={this.pickImageHandler}
                  >
                    <ImageBackground
                      style={{ width: 100, height: 100 }}
                      source={this.state.pickedImage}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          with: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,.3)"
                        }}
                      >
                        <Icon
                          size={35}
                          name={"image-plus"}
                          style={{
                            color: "white",
                            alignSelf: "center",
                            marginTop: "30%"
                          }}
                        />
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>

                  <Button
                    style={{
                      container: styles.defaultBtn,
                      text: { color: "white" }
                    }}
                    raised
                    text="Doorgaan"
                    onPress={() => this.createArticle()}
                  />
                </View>
              </View>
            </ScrollView>
          )}
          {this.state.loading && (
            <PacmanIndicator color="#94D600" style={{ marginTop: "20%" }} />
          )}
        </View>
      </ImageBackground>
    );
  }
}
