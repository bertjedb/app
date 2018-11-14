import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  NetInfo,
  Dimensions,
  Alert
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Toolbar, Button } from "react-native-material-ui";
import { Header, NavigationActions } from "react-navigation";
import styles from "../assets/css/style.js";
import ImagePicker from "react-native-image-picker";
import Video from "react-native-video";
import RNFetchBlob from "rn-fetch-blob";
import { showMessage } from "react-native-flash-message";
import LocalStorage from "../config/localStorage.js";
import Api from "../config/api.js";
import { PacmanIndicator } from "react-native-indicators";
import VideoPlayer from "react-native-video-controls";

export default class VideoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: "",
      contentUrl: "",
      uploaded: false
    };
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 3000
    });
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 3000
    });
  }

  launchVideo = () => {
    const options = {
      title: "Video Kiezen",
      mediaType: "video",
      cameraType: "back",
      storageOptions: {
        skipBackup: true,
        path: "image"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      const uri = response.uri;
      this.setState({ uri });
      date = new Date().getDate();
      month = new Date().getMonth() + 1;
      year = new Date().getFullYear();
      hour = new Date().getHours();
      minute = new Date().getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      fileName =
        "NewsVideo|" +
        date +
        "-" +
        month +
        "-" +
        year +
        "|" +
        hour +
        ":" +
        minute;
      console.log("recorded");
      this.uploadContent(fileName, uri, "video/mp4", "mp4");
    });
  };

  createWPArticle() {
    fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/make-post", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        title: "Nieuw Bslim filmpje!",
        start: this.state.begin,
        end: this.state.end
      }) // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        alert(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  createArticle() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (true) {
          //this.createWPArticle();
          let localStorage = LocalStorage.getInstance();
          let points = localStorage.retrieveItem("userId").then(id => {
            if (id != null) {
              let userData = {
                title: "Nieuw Bslim filmpje!",
                content: "Bslim heeft een nieuw filmpje geupload.",
                img: this.state.contentUrl
              };
              let api = Api.getInstance();
              api.callApi(
                "api/createNewsItemApp",
                "POST",
                userData,
                response => {
                  if (responseCode["responseCode"] != 503) {
                    if (response["responseCode"] == 200) {
                      this.setState({
                        title: "",
                        content: "",
                        img: ""
                      });
                      this.successMessage(
                        "Er is een nieuw artikel aangemaakt!"
                      );
                      alert("Er is een nieuw artikel aangemaakt!");
                    } else {
                      this.errorMessage("Er is wat fout gegaan");
                    }
                  } else {
                    this.errorMessage(
                      "Zorg ervoor dat u een internet verbinding heeft"
                    );
                  }
                }
              );
            }
          });
        } else if (
          this.state.content != "" &&
          this.state.pickedImage.uri != "" &&
          this.state.title.length > 30
        ) {
          this.errorMessage("De titel mag maximaal 30 characters lang zijn!");
        } else {
          this.errorMessage("Vul alle velden in aub");
        }
      } else {
        this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
      }
    });
  }

  uploadContent(fileName, imageSource, mimeType, fileExtension) {
    console.log("uploading");
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        this.setState({
          uploading: true
        });
        RNFetchBlob.fetch(
          "POST",
          "http://gromdroid.nl/bslim/wp-json/wp/v2/media",
          {
            Authorization: "Basic YWRtaW46YnNsaW1faGFuemUh",
            "Content-Type": +mimeType,
            "Content-Disposition":
              "attachment; filename=" + fileName + "." + fileExtension
          },
          RNFetchBlob.wrap(imageSource)
        )
          .uploadProgress({ interval: 250 }, (written, total) => {
            //indicate upload process here
          })
          .then(res => {
            responseJson = res.json();
            console.log(responseJson);
            this.setState({
              contentUrl: responseJson["source_url"],
              uploading: false,
              uploaded: true
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
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
            centerElement="Video uploaden"
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
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
              Video opnemen
            </Text>
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center"
              }}
            >
              <View style={{ height: 350, marginBottom: 10 }}>
                {this.state.uploaded && (
                  <VideoPlayer
                    source={{ uri: this.state.contentUrl }}
                    navigator={this.props.navigator}
                  />
                )}
                {this.state.uploading && (
                  <PacmanIndicator style={{ padding: 25 }} color="#94D600" />
                )}
              </View>
              {this.state.uploaded && (
                <Button
                  style={{
                    container: styles.defaultBtn,
                    text: { color: "white" }
                  }}
                  raised
                  text="Nieuws artikel aanmaken"
                  onPress={this.createArticle()}
                />
              )}
              {!this.state.uploaded && (
                <Button
                  style={{
                    container: styles.defaultBtn,
                    text: { color: "white" }
                  }}
                  raised
                  text="Video selecteren/opnemen"
                  onPress={this.launchVideo}
                />
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
