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
  WebView,
  Animated,
  ListView,
  Easing,
  Modal
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions, Header } from "react-navigation";
import QRCode from "react-native-qrcode";
import ActionButton from "react-native-action-button";
import stylesCss from "../assets/css/style.js";
import QRCodeScanner from "react-native-qrcode-scanner";
import ScannerQR from "./ScannerQR.js";
import ConfettiView from "react-native-confetti-view";
import CardFlip from "react-native-card-flip";
import Api from "../config/api.js";
import Maps from "../config/maps.js";
import LocalStorage from "../config/localStorage.js";
import HTML from "react-native-render-html";
import ImageSlider from "react-native-image-slider";
import { PacmanIndicator } from "react-native-indicators";
import LinearGradient from "react-native-linear-gradient";
import ImageOverlay from "react-native-image-overlay";
import * as Animatable from "react-native-animatable";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";
var capitalize = require("capitalize");

const MapHtml = require("../assets/mapHTML.html");
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Header.HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class EventDetail extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);

    this.state = {
      map: true,
      title: "",
      content: "",
      url: "",
      start: "",
      end: "",
      author: "",
      loading: false,
      deelnemer: false,
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

    {
      let localStorage = LocalStorage.getInstance();
      localStorage.retrieveItem("userId").then(id => {
        localStorage.retrieveItem("clearance").then(clearance => {
          if ((id != null) & (clearance == 1)) {
            this.setState({
              isLoggedIn: true
            });
          }
        });
      });
    }
  }

  componentDidMount() {
    this.animate();
    this.animate2();
    this.animateY();
    const { navigation } = this.props;
    this.setState({subscribed: navigation.getParam("subscribed", "")})
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

    let map = Maps.getInstance();
    const { navigation } = this.props;
    var subscribed = navigation.getParam("subscribed", "");

    const eventID = navigation.getParam("id", "");
    const title = navigation.getParam("title", "");
    const content = navigation.getParam("content", "");
    const url = navigation.getParam("url", "");
    const start = navigation.getParam("start", "");
    const end = navigation.getParam("end", "");
    const startTime = navigation.getParam("startTime", "");
    const endTime = navigation.getParam("endTime", "");
    const created = navigation.getParam("created", "");
    const author = navigation.getParam("author", "");
    const profilePicture = navigation.getParam("profilePicture", "");
    const link = navigation.getParam("link", "");
    const img = navigation.getParam("img", "");
    const location = navigation.getParam("location", "");
    const qr_code = navigation.getParam("qr_code", "");

    const participants = navigation.getParam("participants", "");
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const dataSource = ds.cloneWithRows(participants);

    console.log(subscribed)
    console.log(eventID)

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
                top: 130,
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  size={20}
                  name={"calendar"}
                  style={{ color: "white", paddingRight: 5 }}
                />
                <Text style={{ fontSize: 16, color: "white" }}>{start}</Text>
              </View>
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
          <Text
            style={{
              fontSize: 14,
              color: "white",
              position: "absolute",
              top: 30,
              left: 60
            }}
          >
            {start}
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
              styles.cardTop,
              {
                transform: [
                  {
                    translateX: this.state.x
                  }
                ]
              }
            ]}
            elevation={5}
          >
            <View style={styles.cardTitle} elevation={5}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                  marginBottom: 0,
                  width: "100%"
                }}
              >
                <View
                  style={{
                    shadowOffset: { width: 0, height: 13 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,

                    backgroundColor: "white",
                    // android (Android +5.0)
                    elevation: 5,
                    marginRight: 0,
                    borderRadius: 10
                  }}
                  onPress={() => this.setState({ imageFullScreen: false })}
                >
                  <Image
                    source={{ uri: profilePicture }}
                    resizeMode="cover"
                    style={{ width: 50, height: 50, borderRadius: 10 }}
                  />
                </View>
                <View
                  style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      color: "grey"
                    }}
                  >
                    {author}
                  </Text>
                  <Text style={{ fontSize: 14, color: "grey" }}>{created}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#DCDCDC",
                width: "94%",
                height: 1,
                margin: 10
              }}
            />
            <View>
              <Text
                style={{
                  color: "grey",
                  fontSize: 20,
                  padding: 10,
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                Kom jij ook?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                {!this.state.subscribed && (
                  <Button
                    onPress={() => {
                      let api = Api.getInstance();
                      let localStorage = LocalStorage.getInstance();
                      localStorage.retrieveItem("userId").then(id => {
                        if (id != null) {
                          userData = {
                            eventId: eventID,
                            personId: id
                          };
                          api.callApi(
                            "api/subToEvent",
                            "POST",
                            userData,
                            response => {
                              if (response["responseCode"] == 200) {
                                this.setState({subscribed: true})
                                alert(
                                  "Je hebt je aangemeld voor dit evenement"
                                );
                              } else if (response["responseCode"] == 400) {
                                alert("Je bent al aangemeld");
                              } else {
                                alert("Er is wat fout gegaan");
                              }
                            }
                          );
                        } else {
                          this.props.navigation.navigate("LoginScreen");
                        }
                      });
                    }}
                    style={{
                      container: {
                        margin: 10,
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: "#94d60a"
                      },
                      text: {
                        color: "white"
                      }
                    }}
                    text="Aanmelden"
                  />
                )}
                {this.state.subscribed && (
                  <Button
                    onPress={() => {
                      let api = Api.getInstance();
                      let localStorage = LocalStorage.getInstance();
                      localStorage.retrieveItem("userId").then(id => {
                        if (id != null) {
                          userData = {
                            eventId: eventID,
                            personId: id
                          };
                          console.log(userData);
                          api.callApi(
                            "api/unSubToEvent",
                            "POST",
                            userData,
                            response => {
                                console.log(response)
                              if (response["responseCode"] == 200) {
                                this.setState({subscribed: false})
                                alert(
                                  "Je hebt je afgemeld voor dit evenement"
                                );
                              } else if (response["responseCode"] == 400) {
                                alert("Je bent al afgemeld");
                              } else {
                                alert("Er is wat fout gegaan");
                              }
                            }
                          );
                        } else {
                          this.props.navigation.navigate("LoginScreen");
                        }
                      });
                    }}
                    style={{
                      container: {
                        margin: 10,
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: "orange"
                      },
                      text: {
                        color: "white"
                      }
                    }}
                    text="Afmelden"
                  />
                )}
              </View>
            </View>
          </Animated.View>
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
            <Text style={{ color: "grey", fontSize: 20, padding: 10 }}>
              Info
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                size={20}
                name={"clock-outline"}
                style={{ color: "grey", paddingRight: 10, paddingLeft: 10 }}
              />
              <Text style={{ fontSize: 16, color: "grey" }}>{startTime} uur tot {endTime} uur</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                size={20}
                name={"map-marker-outline"}
                style={{ color: "grey", paddingRight: 10, paddingLeft: 10 }}
              />
              <Text style={{ fontSize: 16, color: "grey" }}>{location}</Text>
            </View>
            <HTML
              onLinkPress={(evt, href) => {
                Linking.openURL(href);
              }}
              containerStyle={{ marginLeft: 10, marginRight: 10 }}
              ignoredTags={["img"]}
              html={content}
              imagesMaxWidth={Dimensions.get("window").width}
            />
          </Animated.View>
          <Animated.View
            style={[
              styles.cardBottom,
              {
                transform: [
                  {
                    translateX: this.state.x3
                  }
                ]
              }
            ]}
            elevation={5}
          >
            <View
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                overflow: "hidden"
              }}
            >
              <WebView
                source={{ html: map.getMap(location) }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  overflow: "hidden"
                }}
              />
            </View>
          </Animated.View>

          {this.state.isLoggedIn && (
            <Animated.View
              style={[
                styles.card,
                {
                  transform: [
                    {
                      translateX: this.state.x3
                    }
                  ]
                }
              ]}
              elevation={5}
            >
              <View
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  overflow: "hidden",
                  alignItems: "center",
                  marginTop: 20
                }}
              >
                <QRCode
                  value={qr_code}
                  size={180}
                  bgColor="#000"
                  fgColor="#fff"
                />
              </View>
            </Animated.View>
          )}

          <Animatable.View
            delay={500}
            animation="lightSpeedIn"
            iterationCount={1}
            style={styles.lastCard}
            elevation={5}
          >
            <ScrollView>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "grey", fontSize: 20, padding: 10 }}>
                    Deelnemerslijst
                  </Text>
                  <Text style={{ color: "black", fontSize: 20, padding: 10 }}>
                    Aantal: {participants.length}
                  </Text>
                </View>
                <ListView
                  style={styles.participantContainer}
                  dataSource={dataSource}
                  renderRow={participant => (
                    <View style={{ marginLeft: "2%", marginBottom: "2%" }}>
                      <Text style={styles.text}>
                        - {capitalize.words(participant.name)}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </ScrollView>
          </Animatable.View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
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
    marginBottom: 75,
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
    flex: 1
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  }
});

export default EventDetail;
