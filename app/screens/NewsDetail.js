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
  Animated,
  Modal,
  Easing
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
import Video from "react-native-video";
import ImageOverlay from "react-native-image-overlay";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Header.HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class NewsDetail extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);

    this.state = {
      title: "",
      content: "",
      link: "",
      img: "",
      scroll: true,
      scrollOpacity: "rgba(148, 214, 10, 0)",
      scrollHeight: "40%",
      scrollBlur: 0,
      scrollY: new Animated.Value(0),
      x: new Animated.Value(-500),
      x2: new Animated.Value(-500),
      x3: new Animated.Value(-500),
      y: new Animated.Value(-300),
      imageIndex: 0,
      imageFullScreen: false
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

  componentDidMount() {
    this.animate();
    this.animate2();
    this.animateY();
  }

  handleScroll(event) {
    this.setState({
      scrollOpacity: "rgba(148, 214, 10, " + this.state.scrollY / 150 + ")",
      scrollHeight:
        "" + ((event.nativeEvent.contentOffset.y / 150) * 40 + 40) + "%",
      scrollBlur: event.nativeEvent.contentOffset.y / 450
    });
  }

  animateY() {
    this.animatedValue.setValue(0);
    Animated.timing(this.state.y, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.state.x, {
      toValue: 1,
      duration: 250,
      delay: 125,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.animate3());
  }

  animate2() {
    this.animatedValue.setValue(0);
    Animated.timing(this.state.x2, {
      toValue: 1,
      delay: 250,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  animate3() {
    this.animatedValue.setValue(0);
    Animated.timing(this.state.x3, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["10%", "0%"]
    });

    const { navigation } = this.props;

    const title = navigation.getParam("title", "");
    const content = navigation.getParam("content", "");
    const link = navigation.getParam("link", "");
    const img = navigation.getParam("img", "");
    let type = img.substring(img.length - 3);
    var videoContent = false;
    if (type == "mp4") {
      videoContent = true;
    }

    return (
      <View
        style={{ width: "100%", height: "100%", backgroundColor: "#DCDCDC" }}
      >
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
          <Animated.View
            style={[
              styles.header,
              {
                transform: [
                  {
                    translateY: this.state.y
                  }
                ]
              }
            ]}
          >
            <ImageOverlay
              overlayColor="black"
              overlayAlpha={0.3}
              source={{ uri: img }}
              resizeMode="cover"
              containerStyle={{ width: "100%", height: 200 }}
            />
            <Animated.View
              style={{
                position: "absolute",
                top: 150,
                left: 15,
                opacity: this.state.scrollY.interpolate({
                  inputRange: [0, 80],
                  outputRange: [1, 0]
                })
              }}
            >
              <Text
                style={{ fontSize: 28, fontWeight: "bold", color: "white" }}
              >
                {title}
              </Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.headerTitle,
            {
              opacity: this.state.scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [0, 1]
              })
            }
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
              position: "absolute",
              top: 8,
              left: 60
            }}
          >
            {title}
          </Text>
        </Animated.View>
        <Toolbar
          style={styles.headerTitle}
          iconSet="MaterialCommunityIcons"
          centerElement=""
          leftElement={"arrow-left"}
          rightElement={"share-variant"}
          onRightElementPress={() =>
            Share.share({
              message:
                "Binnenkort organiseert bslim: " +
                capitalize.words(title.toString().replace(", ,", " ")) +
                ". Voor meer informatie ga naar: " +
                link
            })
          }
          onLeftElementPress={() => this.props.navigation.goBack()}
        />
        <Animated.ScrollView
          style={styles.cardContainer}
          scrollEventThrottle={16}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              listener: event => {
                this.setState({
                  scrollOpacity:
                    "rgba(148, 214, 10, " +
                    event.nativeEvent.contentOffset.y / 150 +
                    ")"
                });
              },
              useNativeDriver: true
            }
          )}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  {
                    translateX: this.state.x2
                  }
                ]
              }
            ]}
            elevation={5}
          >
            <HTML
              onLinkPress={(evt, href) => {
                Linking.openURL(href);
              }}
              containerStyle={{ margin: 10 }}
              ignoredTags={["img"]}
              html={content}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </Animated.View>
        </Animated.ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    paddingTop: 150
  },

  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  headerTitle: {
    height: Header.HEIGHT,
    backgroundColor: "#94d60a",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },

  header: {
    position: "absolute",
    top: -1,
    left: 0,
    right: 0,
    backgroundColor: "#DCDCDC",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },

  cardTop: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 155,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  lastCard: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 45,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  cardBottom: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  cardTitle: {
    flexDirection: "row",
    width: Dimensions.get("window").width,
    margin: 0,
    padding: 0
  },

  participantContainer: {
    margin: "5%",
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fcd6e8",
    height: 500
  },
  participantField: {
    flex: 1,
    margin: "5%",
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  participantRow: {
    flex: 1,
    padding: 12,
    flexDirection: "row"
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  }
});

export default NewsDetail;
