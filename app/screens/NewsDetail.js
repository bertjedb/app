import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Share,
  Linking,
  Platform,
  WebView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { DrawerActions, Header } from "react-navigation";
import ActionButton from "react-native-action-button";

import stylesCss from "../assets/css/style.js";

import QRCodeScanner from "react-native-qrcode-scanner";

import ScannerQR from "./ScannerQR.js";

import ConfettiView from "react-native-confetti-view";

import CardFlip from "react-native-card-flip";

import Api from "../config/api.js";

import LocalStorage from "../config/localStorage.js";

import HTML from "react-native-render-html";
import LinearGradient from "react-native-linear-gradient";

import ImageSlider from "react-native-image-slider";
import { PacmanIndicator } from "react-native-indicators";
import MyWebView from "react-native-webview-autoheight";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

class NewsDetail extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      link: "",
      img: ""
    };
    let days = [
      "Zondag",
      "Maandag",
      "Dinsdag",
      "Woensdag",
      "Donderdag",
      "Vrijdag",
      "Zaterdag"
    ];
    let months = [
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "December"
    ];
  }

  render() {
    const { navigation } = this.props;

    const title = navigation.getParam("title", "");
    const content = navigation.getParam("content", "");
    const link = navigation.getParam("link", "");
    const img = navigation.getParam("img", "");

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
            centerElement={title}
            leftElement={"arrow-left"}
            onLeftElementPress={() => this.props.navigation.goBack()}
          />
        </LinearGradient>
        <View style={styles.cardContainer}>
          <View style={styles.card} elevation={5}>
            <ScrollView
              style={{
                height: Dimensions.get("window").height - 160,
                borderRadius: 10,
                width: Dimensions.get("window").width - 50
              }}
            >
              <View
                style={{
                  widht: "100%",
                  height: 200,
                  paddingBottom: 10,
                  marginBottom: 20
                }}
              >
                <Image
                  source={{ uri: img }}
                  resizeMode="cover"
                  style={{ width: "100%", height: 200, borderRadius: 5 }}
                />
                {/*{this.state.img &&*/}
                {/*<ImageSlider*/}
                {/*autoPlayWithInterval={3000}*/}
                {/*images={[this.state.img]}/>*/}
                {/*}*/}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "black",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: 5
                  }}
                >
                  {title}
                </Text>
              </View>
              <View
                style={{ flex: 1, alignItems: "center", textAlign: "center" }}
              >
                <HTML
                  onLinkPress={(evt, href) => {
                    Linking.openURL(href);
                  }}
                  containerStyle={{
                    marginLeft: 20,
                    marginRight: 10,
                    alignItems: "center",
                    textAlign: "center"
                  }}
                  ignoredTags={["img"]}
                  html={content}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
              </View>

              <View style={{ flexDirection: "row" }}>
                <Button
                  style={{
                    container: {
                      margin: 10,
                      borderRadius: 10,
                      backgroundColor: "green"
                    },
                    text: {
                      color: "white"
                    }
                  }}
                  text="Delen"
                  onPress={() =>
                    Share.share({
                      message:
                        "Bslim nieuws: " +
                        title +
                        ". Voor meer informatie ga naar: " +
                        link
                    })
                  }
                />
              </View>
            </ScrollView>
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

  cardTitle: {
    flexDirection: "row",
    margin: 0,
    padding: 0
  }
});

export default NewsDetail;
