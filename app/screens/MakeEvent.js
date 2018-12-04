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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Autocomplete from "react-native-autocomplete-input";
import { PacmanIndicator } from "react-native-indicators";

export default class MakeEvent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      loc: "",
      begin: "",
      end: "",
      desc: "",
      showBegin: false,
      showEnd: false,
      beginText: "dd/MM/yy H:MM",
      endText: "dd/MM/yy H:MM",
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

  createWPEvent() {
    console.log(
      "Title: " +
        this.state.name +
        "\n Desc: " +
        this.state.desc +
        "\n Start: " +
        this.state.begin +
        "\n End: " +
        this.state.end +
        "\n Author: " +
        this.state.wordpresskey +
        "\n Adres: " +
        this.state.loc
    );
    fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/create-post", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        title: this.state.name,
        content:
          "<p>" +
          this.state.desc +
          '</p><img src="' +
          this.state.img +
          '" alt="Image" />',
        start: this.state.begin,
        end: this.state.end,
        author: this.state.wordpresskey,
        address: this.state.loc
      }) // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        this.props.navigation.dispatch(NavigationActions.back());
        this.setState({ loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  }

  createEvent() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        this.setState({ loading: true });
        let api = Api.getInstance();
        let localStorage = LocalStorage.getInstance();
        localStorage
          .retrieveItem("wordpresskey")
          .then(goals => {
            this.setState({ wordpresskey: goals });
            console.log(this.state.wordpresskey);
          })
          .catch(error => {
            //this callback is executed when your Promise is rejected
            console.log("Promise is rejected with error: " + error);
          });
        if (
          this.state.name != "" &&
          this.state.begin != "" &&
          this.state.end != "" &&
          this.state.query != "" &&
          this.state.desc != "" &&
          this.state.pickedImage.uri != ""
        ) {
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
              this.setState({ img: responseJson["guid"]["raw"] });
              this.createWPEvent();
            })

            .catch(error => {
              callBack(error);
            });
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

  findFilm(query) {
    this.setState({ query: query });
    if (query == "") {
      this.setState({ data: [] });
    } else {
      fetch(
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" +
          query +
          "&language=nl&sensor=false&key=AIzaSyAlHhXzz2tr1rZC0ia_7XgiCSLEDB4Dl5c&components=country:NL"
      )
        .then(res => res.json())
        .then(json => {
          this.setState({
            data: json["predictions"]
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
            centerElement="Evenement aanmaken"
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
                  Evenementen aanmaken
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
                    Hier kun je nieuwe evenementen aanmaken
                  </Text>
                  <TextField
                    textColor="green"
                    tintColor="green"
                    baseColor="green"
                    label="Naam van evenement"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                  />

                  <TouchableOpacity
                    onPress={() => this.setState({ showBegin: true })}
                    style={styles.dateSection}
                  >
                    <Icon
                      style={styles.searchIcon}
                      name="calendar"
                      size={20}
                      color="green"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Begin van evenement"
                      value={"Start: " + this.state.beginText}
                      underlineColorAndroid="green"
                      onTouchStart={() => this.setState({ showBegin: true })}
                      editable={false}
                    />
                  </TouchableOpacity>
                  <DateTimePicker
                    isVisible={this.state.showBegin}
                    onConfirm={dateTime => this.handleBegin(dateTime)}
                    onCancel={() => this.hidePicker()}
                    mode={"datetime"}
                  />

                  <TouchableOpacity
                    onPress={() => this.setState({ showEnd: true })}
                    style={styles.dateSection}
                  >
                    <Icon
                      style={styles.searchIcon}
                      name="calendar"
                      size={20}
                      color="green"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Begin van evenement"
                      value={"Einde: " + this.state.endText}
                      underlineColorAndroid="green"
                      onTouchStart={() => this.setState({ showEnd: true })}
                      editable={false}
                    />
                  </TouchableOpacity>

                  <DateTimePicker
                    isVisible={this.state.showEnd}
                    onConfirm={dateTime => this.handleEnd(dateTime)}
                    onCancel={() => this.hidePicker()}
                    mode={"datetime"}
                  />
                  <View style={{ height: 55 }}>
                    <View
                      style={{
                        left: 0,
                        position: "absolute",
                        right: 0,
                        top: 0,
                        zIndex: 2,
                        overflow: "hidden"
                      }}
                    >
                      <Autocomplete
                        data={this.state.data}
                        inputContainerStyle={{ borderWidth: 0 }}
                        listStyle={{
                          margin: 10,
                          borderWidth: 0,
                          height: 125,
                          backgroundColor: "#00000000"
                        }}
                        renderSeparator={() => (
                          <View
                            style={{
                              width: "100%",
                              height: 1,
                              backgroundColor: "grey"
                            }}
                          />
                        )}
                        renderTextInput={() => (
                          <TextField
                            textColor="green"
                            tintColor="green"
                            baseColor="green"
                            label="Locatie van evenement"
                            value={this.state.query}
                            onChangeText={text => this.findFilm(text)}
                          />
                        )}
                        defaultValue={this.state.query}
                        renderItem={item => (
                          <TouchableOpacity
                            style={{
                              backgroundColor: "white",
                              padding: 5,
                              borderRightWidth: 1,
                              borderLeftWidth: 1,
                              borderColor: "grey"
                            }}
                            onPress={() =>
                              this.setState({
                                query: item.description.replace(
                                  ", Nederland",
                                  ""
                                ),
                                loc: item.place_id,
                                data: []
                              })
                            }
                          >
                            <Text style={{ fontSize: 14 }}>
                              {item.description.replace(", Nederland", "")}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>

                  <TextField
                    textColor="green"
                    tintColor="green"
                    baseColor="green"
                    label="Beschrijving van evenement"
                    value={this.state.desc}
                    multiline={true}
                    numberOfLines={30}
                    onChangeText={desc => this.setState({ desc })}
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
                    onPress={() => this.createEvent()}
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
