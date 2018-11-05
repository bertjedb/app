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
  View
} from "react-native";
import { Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import HTML from "react-native-render-html";
import Api from "../config/api.js";
import LinearGradient from "react-native-linear-gradient";
import LocalStorage from "../config/localStorage";
import {PacmanIndicator} from 'react-native-indicators';
import { showMessage } from "react-native-flash-message";
import { FluidNavigator, Transition } from "react-navigation-fluid-transitions";

var capitalize = require("capitalize");
var startNum = 0;
var endNum = 2;
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
      search: "",
      loading: true,
      check: false,
      sleeping: false
    };
    let api = Api.getInstance()
    api.callApi('api/getAllEvents', 'POST', {}, response => {
        if(response['responseCode'] != 503) {
            if(response['responseCode'] == 200) {
             let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            let array = response['events'];
            for(let index=0; index < array.length; index++) {
                array[index]['subscribed'] = false
                let localStorage = LocalStorage.getInstance();
                localStorage.retrieveItem('userId').then((id) => {
                    if(id != null) {
                        userData = {
                            "eventId": response['events'][index]['id'],
                            "personId": id
                        }
                        api.callApi('api/checkSub', 'POST', userData, response => {
                            array[index]['subscribed'] = response['found']
                        });
                    }
                    this.setState({
                        uploading: false,
                        loading: false,
                        dataSource: ds.cloneWithRows(array),
                    });
                });
              }
              this.setState({
                uploading: false,
                loading: false,
                data: response["events"].slice(start, end),
                fullArray: response["events"]
              });
            }
      } else {
        this.setState({ sleeping: true });
        setTimeout(() => {
          this.setState({ sleeping: false, loading: false });
        }, 3000);
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
    endNum = 2;
    start = startNum;
    end = endNum;
    if (!this.state.sleeping) {
      let api = Api.getInstance();
      api.callApi("api/getAllEvents", "POST", {}, response => {
        if (response["responseCode"] != 503) {
          if (response["responseCode"] == 200) {
            let array = response["events"];
            for (let index = 0; index < array.length; index++) {
              let localStorage = LocalStorage.getInstance();
              localStorage.retrieveItem("userId").then(id => {
                if (id != null) {
                  userData = {
                    eventId: response["events"][index]["id"],
                    personId: id
                  };
                  api.callApi("api/checkSub", "POST", userData, response => {
                    array[index]["subscribed"] = response["found"];
                    this.setState({
                      uploading: false,
                      refreshing: false,
                      loading: false,
                      data: array.slice(start, end)
                    });
                    let array = response['events'];
                    for(let index=0; index < array.length; index++) {
                        array[index]['subscribed'] = false
                        let localStorage = LocalStorage.getInstance();
                        localStorage.retrieveItem('userId').then((id) => {
                            if(id != null) {
                                userData = {
                                    "eventId": response['events'][index]['id'],
                                    "personId": id
                                }
                                api.callApi('api/checkSub', 'POST', userData, response => {
                                    array[index]['subscribed'] = response['found'];
                                    this.setState({
                                        uploading: false,
                                        refreshing: false,
                                        loading: false,
                                        dataSource: ds.cloneWithRows(array),
                                    });
                                });
                            }
                        });
                    }
                  });
                }
              });
            }
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
  }

  handleSearch() {
    let api = Api.getInstance();
    userData = {
      searchString: this.state.search
    };
    api.callApi("api/searchEvent", "POST", userData, response => {
      if (response["responseCode"] != 503) {
        if (response["responseCode"] == 200) {
          let array = response["events"];
          for (let index = 0; index < array.length; index++) {
            array[index]["subscribed"] = false;
            let localStorage = LocalStorage.getInstance();
            localStorage.retrieveItem("userId").then(id => {
              if (id != null) {
                userData = {
                  eventId: response["events"][index]["id"],
                  personId: id
                };
                api.callApi("api/checkSub", "POST", userData, response => {
                  array[index]["subscribed"] = response["found"];
                  this.setState({
                    uploading: false,
                    data: array,
                    loading: false
                  });
                });
              }
            });
          }
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

  handelEnd = () => {
    api = Api.getInstance();
    if (end <= this.state.fullArray.length) {
      end += 2;
      start += 2;
      // alert(end + " " + this.state.data.length);
      api.callApi("api/getAllEvents", "POST", {}, response => {
        console.log(response);
        if (response["responseCode"] == 200) {
          this.setState({
            data: [...this.state.data, ...response["events"].slice(start, end)]
          });
        }
      });
    }
  };

  render() {
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
              keyExtractor={item => item.title}
              initialNumToRender={2}
              // windowSize={2}
              // maxToRenderPerBatch={4}
              onEndReachedThreshold={0.6}
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
                      <Image
                        source={{ uri: item.photo[0] }}
                        resizeMode="cover"
                        style={{ width: 50, height: 50, borderRadius: 10 }}
                      />
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
                          {capitalize.words(item.leader)}
                        </Text>
                        <Text style={{ fontSize: 14, color: "black" }}>
                          {item.created}
                        </Text>
                      </View>
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
                              item.name.toString().replace(", ,", " ")
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
                              item.leader.replace(", ,", " ")
                            ),
                            link: item.link,
                            img: item.img,
                            location: item.location,
                            participants: item.participants
                          })
                        }
                      >
                        <Transition shared={item.id}>
                          <Image
                            source={{ uri: item.img }}
                            resizeMode="cover"
                            style={{ width: "100%", height: 200 }}
                          />
                        </Transition>
                      </TouchableHighlight>
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
                          <View style={{ flex: 1, flexDirection: "column" }}>
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
                              item.name.toString().replace(", ,", " ")
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
                            imagesMaxWidth={Dimensions.get("window").width}
                          />
                        </View>
                      </View>

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
                              width: "33%",
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
                              width: "33%",
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
                          </TouchableHighlight> )}
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
                            width: "33%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 10,
                            backgroundColor: "#93D500",
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            DELEN
                          </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                                onPress={() =>
                                  this.props.navigation.navigate("EventDetail", {
                                    id: item.id,
                                    title: capitalize.words(
                                      item.name.toString().replace(", ,", " ")
                                    ),
                                    profilePicture: item.photo[0],
                                    content: item.desc,
                                    start:
                                      item.begin +
                                      " " +
                                      item.beginMonth +
                                      " " +
                                      item.beginTime,
                                    end:
                                      item.end +
                                      " " +
                                      item.endMonth +
                                      " " +
                                      item.endTime,
                                    created: item.created,
                                    author: capitalize.words(
                                      item.leader
                                    ),
                                    link: item.link,
                                    img: item.img,
                                    location: item.location,
                                    subscribed: item.subscribed
                                  })
                                }
                                style={{
                                    width: "34%",
                                    borderLeftWidth: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 10,
                                    backgroundColor: "#93D500",
                                    borderBottomRightRadius: 10
                                }}
                            >
                                <Text
                                    style={{ color: "white", fontWeight: "bold" }}
                                >
                                    LEES MEER...
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
