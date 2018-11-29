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
import Autocomplete from "react-native-autocomplete-input";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
      beginText: "",
      endText: "",
      pickedImage: { uri: "" },
      imgPicked: false,
      value: "",
      isLoading: false,
      query: "",
      data: [],
      query: "",
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
    this.setState({ loading: true });
    fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/update-post", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        id: this.state.id,
        title: this.state.name,
        content:
          "<p>" +
          this.state.desc +
          '</p><img src="' +
          this.state.img +
          '" alt="Image" />',
        start: this.state.begin,
        end: this.state.end,
        author: this.state.author,
        address: this.state.loc
      }) // <-- Post parameters
    })
      .then(response => response.json())
      .then(responseText => {
        if (responseText == 200) {
          alert("Evenement succesvol bijgewerkt");
          this.props.navigation.dispatch(NavigationActions.back());
          this.setState({ loading: false });
        } else {
          alert("Er is iets mis gegaan");
          this.setState({ loading: false });
        }
        console.log(this.state.img);
      })
      .catch(error => {
        console.error(error);
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
            imgPicked: true,
            onlineImg: false
          });
          ImgToBase64.getBase64String(this.state.pickedImage.uri).then(
            base64String => {
              this.setState({
                img: base64String
              });
            }
          );
        }
      }
    );
  };

  componentDidMount() {
    this.setState({
      id: this.props.navigation.getParam("id", ""),
      name: this.props.navigation.getParam("title", ""),
      desc: this.props.navigation
        .getParam("content", "")
        .replace(/<\/?[^>]+(>|$)/g, ""),
      pickedImage: this.props.navigation.getParam("img", ""),
      query: "",
      pickedImage: { uri: this.props.navigation.getParam("img", "") },
      img: this.props.navigation.getParam("img", ""),
      onlineImg: true,
      author: this.props.navigation.getParam("author", "")
    });
    this.handleBegin(
      new Date(
        this.props.navigation.getParam("begin", "").replace("GMT", "GMT+0100")
      )
    );
    this.handleEnd(
      new Date(
        this.props.navigation.getParam("end", "").replace("GMT", "GMT+0100")
      )
    );
  }

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
        {!this.state.loading && (
          <ScrollView style={{ marginBottom: 56 }}>
            <View style={styles.container}>
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
                          height: 125
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
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={this.state.pickedImage}
                    />
                  </TouchableOpacity>

                  <Button
                    style={{
                      container: styles.defaultBtn,
                      text: { color: "white" }
                    }}
                    raised
                    text="Doorgaan"
                    onPress={() => this.createWPEvent()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
        {this.state.loading && (
          <PacmanIndicator color="#94D600" style={{ marginTop: "20%" }} />
        )}
      </ImageBackground>
    );
  }
}
