import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ListView,
  RefreshControl,
  Share,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { Header, NavigationActions } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import HTML from "react-native-render-html";
import Api from "../config/api.js";
import LinearGradient from "react-native-linear-gradient";
import LocalStorage from "../config/localStorage";
import { PacmanIndicator } from "react-native-indicators";
import { showMessage } from "react-native-flash-message";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

var capitalize = require("capitalize");
var startNum = 0;
var endNum = 10;
var start = startNum;
var end = endNum;

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

class Events extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: null,
      eventArray: [],
      modalVisible: false,
      adminArray: [],
      checkMap: new Map(),
      search: "",
      refreshing: false,
      loading: true,
      check: false,
      sleeping: false,
      personList: []
    };

      startNum = 0;
      endNum = 10;
      start = startNum;
      end = endNum;
    let localStorage = LocalStorage.getInstance();
    localStorage.retrieveItem("clearance").then(clearance => {
      this.setState({ clearance: clearance });
      console.log(clearance);
    });

    let api = Api.getInstance();
    api.callApi("api/getAllEvents", "POST", {}, response => {
      if (response["responseCode"] != 503) {
        if (response["responseCode"] == 200) {
          let array = response["events"];
          let localStorage = LocalStorage.getInstance();
          localStorage.retrieveItem("userId").then(id => {
            if (id != null) {
              userData = {
                personId: id
              };
              api.callApi("api/checkSub", "POST", userData, response => {
                let subEvents = response["subEvents"];
                for (let index = 0; index < subEvents.length; index++) {
                  for (event of array) {
                    if (event.id == subEvents[index].id) {
                      event.subscribed = true;
                    } else {
                      event.subscribed = false;
                    }
                  }
                }
              });
            }
            this.setState({
              refreshing: false,
              loading: false,
              data: array.slice(start, end),
              fullArray: array
            });
          });
        }
      } else {
        this.setState({ sleeping: true });
        setTimeout(() => {
          this.setState({ sleeping: false });
        }, 3000);
        this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
      }
    });
  }

  hideSplashScreen() {
    this.setState({
      splashScreenVisible: false
    });
  }

  errorMessage(msg) {
    showMessage({
      message: msg,
      type: "danger",
      duration: 3000
    });
  }

  onLoad = () => {
    this.refresh();
  };

  _onRefresh = () => {
    this.setState({ refreshing: true, sleeping: false, loading: true });
    this.refresh();
  };

  refresh() {
    startNum = 0;
    endNum = 10;
    start = startNum;
    end = endNum;
    if (!this.state.sleeping) {
      let api = Api.getInstance();
      api.callApi("api/getAllEvents", "POST", {}, response => {
        if (response["responseCode"] != 503) {
          if (response["responseCode"] == 200) {
            let array = response["events"];
            let localStorage = LocalStorage.getInstance();
            localStorage.retrieveItem("userId").then(id => {
              if (id != null) {
                userData = {
                  personId: id
                };
                api.callApi("api/checkSub", "POST", userData, response => {
                  let subEvents = response["subEvents"];
                  for (let index = 0; index < subEvents.length; index++) {
                    for (event of array) {
                      if (event.id == subEvents[index].id) {
                        event.subscribed = true;
                      } else {
                        event.subscribed = false;
                      }
                    }
                  }
                });
              }
              this.setState({
                refreshing: false,
                loading: false,
                data: array.slice(start, end)
              });
            });
          }
        }
      });
    }
  }

  handleSearch() {
    this.setState({
      loading: true
    });
    let api = Api.getInstance();
    userData = {
      searchString: this.state.search
    };
    api.callApi("api/searchEvent", "POST", userData, response => {
      if (response["responseCode"] != 503) {
        if (response["responseCode"] == 200) {
          let array = response["events"];
          let localStorage = LocalStorage.getInstance();
          localStorage.retrieveItem("userId").then(id => {
            if (id != null) {
              userData = {
                personId: id
              };
              api.callApi("api/checkSub", "POST", userData, response => {
                let subEvents = response["subEvents"];
                for (let index = 0; index < subEvents.length; index++) {
                  for (event of array) {
                    if (event.id == subEvents[index].id) {
                      event.subscribed = true;
                    } else {
                      event.subscribed = false;
                    }
                  }
                }
              });
            }
            this.setState({
              refreshing: false,
              loading: false,
              data: array.slice(start, end)
            });
          });
        } else {
          this.setState({
            loading: false
          });
          this.errorMessage(
            'Er is niks gevonden voor "' + this.state.search + '"'
          );
        }
      }
    });
  }

  handelEnd = () => {
    api = Api.getInstance();
    if (end <= this.state.fullArray.length) {
      end += 10;
      start += 10;
      // alert(end + " " + this.state.data.length);
      api.callApi("api/getAllEvents", "POST", {}, response => {
        if (response["responseCode"] != 503) {
          if (response["responseCode"] == 200) {
            this.setState({
              data: [
                ...this.state.data,
                ...response["events"].slice(start, end)
              ]
            });
          }
        } else {
          this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
        }
      });
    }
  };

  render() {
    const Entities = require("html-entities").AllHtmlEntities;
    const entities = new Entities();
    return (
      <ImageBackground
        blurRadius={0}
        source={require("../assets/Bslim_Background.jpg")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
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
            centerElement={"Evenementen"}
            searchable={{
              autoFocus: true,
              placeholder: "Zoeken",
              onChangeText: text => this.setState({ search: text }),
              onSubmitEditing: () => {
                this.handleSearch();
              }
            }}
          />
        </LinearGradient>
        {!this.state.loading && (
          <View>
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => "" + item.id}
              initialNumToRender={4}
              windowSize={21}
              maxToRenderPerBatch={10}
              onEndReachedThreshold={0.5}
              onEndReached={() => this.handelEnd()}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 60 }}
              refreshControl={
                <RefreshControl
                  colors={["#94D600"]}
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                />
              }
              style={{ paddingTop: 10, marginBottom: 55 }}
              renderItem={({ item }) => (
                <View style={styles.container}>
                  <View style={styles.card} elevation={5}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.dispatch(
                            NavigationActions.navigate({
                              routeName: "ProfilePageStack",
                              action: NavigationActions.navigate({
                                routeName: "ProfilePage",
                                params: {
                                  leader: item.leader,
                                  profilePicture: item.photo[0],
                                  leaderDesc: item.leaderDesc
                                }
                              })
                            })
                          )
                        }
                      >
                        <Image
                          source={{ uri: item.photo[0] }}
                          resizeMode="cover"
                          style={{ width: 50, height: 50, borderRadius: 10 }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          marginLeft: 10
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "black"
                          }}
                        >
                          {capitalize.words(
                            entities.decode(item.leader.replace(", ,", " "))
                          )}
                        </Text>
                        <Text style={{ fontSize: 14, color: "black" }}>
                          {item.created}
                        </Text>
                      </View>
                      {this.state.clearance == 1 && (
                        <Icon
                          size={25}
                          name={"pencil"}
                          style={{ color: "grey" }}
                          marginRight={10}
                          onPress={() =>
                            this.props.navigation.navigate("UpdateEvent", {
                              id: item.id,
                              title: capitalize.words(
                                item.name.toString().replace(", ,", " ")
                              ),
                              content: item.desc,
                              img: item.img,
                              location: item.location
                            })
                          }
                        />
                      )}
                      {this.state.clearance == 1 && (
                        <Icon
                          size={25}
                          name={"delete-forever"}
                          style={{ color: "red" }}
                          onPress={() =>
                            Alert.alert(
                              "Verwijderen",
                              "Weet u zeker dat u dit event wil verwijderen?",
                              [
                                {
                                  text: "Annuleren",
                                  onPress: () => console.log("Cancel Pressed!")
                                },
                                {
                                  text: "OK",
                                  onPress: () => {
                                    fetch(
                                      "http://gromdroid.nl/bslim/wp-json/gaauwe/v1/delete-event?id=" +
                                        item.id
                                    );
                                    this._onRefresh();
                                  }
                                }
                              ],
                              { cancelable: false }
                            )
                          }
                        />
                      )}
                    </View>
                    <View
                      style={{
                        backgroundColor: "white",
                        paddingBottom: 25,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                      }}
                    >
                      <TouchableHighlight
                        onPress={() =>
                          this.props.navigation.navigate("EventDetail", {
                            title: capitalize.words(
                              entities.decode(
                                item.name.toString().replace(", ,", " ")
                              )
                            ),
                            subscribed: item.subscribed,
                            id: item.id,
                            profilePicture: item.photo[0],
                            content: item.desc,
                            start: item.begin + " " + item.beginMonth + " 2018",
                            startTime: item.beginTime,
                            end: item.end + " " + item.endMonth + " 2018",
                            endTime: item.endTime,
                            created: item.created,
                            author: capitalize.words(
                              entities.decode(item.leader.replace(", ,", " "))
                            ),
                            link: item.link,
                            img: item.img,
                            qr_code: item.qrCode,
                            location: item.location,
                            participants: item.participants
                          })
                        }
                      >
                        <View>
                          <View>
                            <Image
                              source={{ uri: item.img }}
                              resizeMode="cover"
                              style={{ width: "100%", height: 200 }}
                            />
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                width: "80%"
                              }}
                            >
                              <View
                                style={{
                                  minWidth: 50,
                                  maxHeight: 50,
                                  backgroundColor: "#F27B13",
                                  marginTop: 10,
                                  borderRadius: 5,
                                  marginLeft: 10,
                                  marginRight: 10
                                }}
                              >
                                <View
                                  style={{ flex: 1, flexDirection: "column" }}
                                >
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: 16,
                                      color: "white",
                                      textAlign: "center",
                                      marginTop: 5
                                    }}
                                  >
                                    {item.begin}
                                  </Text>
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: 16,
                                      color: "white",
                                      textAlign: "center"
                                    }}
                                  >
                                    {item.beginMonth}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  marginTop: 10,
                                  marginRight: 10,
                                  marginBottom: 30,
                                  fontWeight: "bold"
                                }}
                              >
                                <Text
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: 18,
                                    color: "black"
                                  }}
                                >
                                  {capitalize.words(
                                    entities.decode(
                                      item.name.toString().replace(", ,", " ")
                                    )
                                  )}
                                </Text>
                                <HTML
                                  style={{ height: 55 }}
                                  tagsStyles={{
                                    p: { textAlign: "left", color: "grey" }
                                  }}
                                  onLinkPress={(evt, href) => {
                                    Linking.openURL(href);
                                  }}
                                  ignoredTags={["img"]}
                                  html={item.desc.substr(0, 165) + "..."}
                                  imagesMaxWidth={
                                    Dimensions.get("window").width
                                  }
                                />
                                <Text
                                  style={{ marginLeft: "60%", color: "black" }}
                                >
                                  Lees verder
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableHighlight>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          alignItems: "center"
                        }}
                      >
                        {!item.subscribed && (
                          <TouchableHighlight
                            onPress={() => {
                              let api = Api.getInstance();
                              let localStorage = LocalStorage.getInstance();
                              localStorage.retrieveItem("userId").then(id => {
                                if (id != null) {
                                  userData = {
                                    eventId: item.id,
                                    personId: id
                                  };
                                  api.callApi(
                                    "api/subToEvent",
                                    "POST",
                                    userData,
                                    response => {
                                      if (response["responseCode"] == 200) {
                                        alert(
                                          "Je hebt je aangemeld voor dit evenement"
                                        );
                                        this.refresh();
                                      } else if (
                                        response["responseCode"] == 400
                                      ) {
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
                              width: "50%",
                              borderRightWidth: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 10,
                              backgroundColor: "#93D500",
                              borderBottomLeftRadius: 10
                            }}
                          >
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              AANMELDEN
                            </Text>
                          </TouchableHighlight>
                        )}
                        {item.subscribed && (
                          <TouchableHighlight
                            onPress={() => {
                              let api = Api.getInstance();
                              let localStorage = LocalStorage.getInstance();
                              localStorage.retrieveItem("userId").then(id => {
                                if (id != null) {
                                  userData = {
                                    eventId: item.id,
                                    personId: id
                                  };
                                  api.callApi(
                                    "api/unSubToEvent",
                                    "POST",
                                    userData,
                                    response => {
                                      if (response["responseCode"] == 200) {
                                        alert(
                                          "Je hebt je afgemeld voor dit evenement"
                                        );
                                        this.refresh();
                                      } else if (
                                        response["responseCode"] == 400
                                      ) {
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
                              width: "50%",
                              borderRightWidth: 1,
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 10,
                              backgroundColor: "#93D500",
                              borderBottomLeftRadius: 10
                            }}
                          >
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              AFMELDEN
                            </Text>
                          </TouchableHighlight>
                        )}
                        <TouchableHighlight
                          onPress={() =>
                            Share.share({
                              message:
                                "Binnenkort organiseert bslim: " +
                                capitalize.words(
                                  item.name.toString().replace(", ,", " ")
                                ) +
                                ". Voor meer informatie ga naar: " +
                                item.link
                            })
                          }
                          style={{
                            width: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            backgroundColor: "#93D500",
                            borderBottomRightRadius: 10
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            DELEN
                          </Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        )}
        {this.state.loading && <PacmanIndicator color="#94D600" />}
      </ImageBackground>
    );
  }
}

// onPress={() =>
//                             this.props.navigation.navigate("UpdateEvent", {
//                               id: item.id,
//                               title: capitalize.words(
//                                 item.name.toString().replace(", ,", " ")
//                               ),
//                               content: item.desc,
//                               img: item.img,
//                               location: item.location
//                             })
//                           }

const styles = StyleSheet.create({
  splashScreen: {
    backgroundColor: "blue",
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20
  },
  card: {
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
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

export default Events;
