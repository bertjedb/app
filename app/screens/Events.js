import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ListView,
  TouchableHighlight,
  Share,
  Dimensions,
  RefreshControl
} from "react-native";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Checkbox,
  Drawer
} from "react-native-material-ui";
import stylesCss from "../assets/css/style.js";
import HTML from "react-native-render-html";
import { BarIndicator } from "react-native-indicators";
import Api from "../config/api.js";
import LinearGradient from "react-native-linear-gradient";
import LocalStorage from "../config/localStorage";
import {PacmanIndicator} from 'react-native-indicators';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

var capitalize = require("capitalize");

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
        search: '',
        refreshing: false,
        search: '',
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
            }
        } else {
            this.setState({sleeping: true})
            setTimeout(() => {
                this.setState({sleeping: false, loading: false})
            }, 3000);
            }
            this.setState({
              uploading: false,
              dataSource: ds.cloneWithRows(array)
            });
          });
        }
      }
    });
  }

  hideSplashScreen() {
    this.setState({
      splashScreenVisible: false
    });
  }

  errorMessage(msg){
    showMessage({
        message: msg,
        type: "danger",
        duration: 3000,
      });
  }

  componentDidMount() {
    this.onLoad();
    this.props.navigation.addListener('willFocus', this.onLoad)
  }

  onLoad = () => {
    this.refresh();
  };

  _onRefresh = () => {
    this.setState({refreshing: true, sleeping: false, loading: true});
    this.refresh();
  };

    refresh(){
        if(!this.state.sleeping) {
            let api = Api.getInstance()
            api.callApi('api/getAllEvents', 'POST', {}, response => {
            if(response['responseCode'] != 503) {
                if(response['responseCode'] == 200) {
                     let ds = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2
                    });
                    let array = response['events'];
                    for(let index=0; index < array.length; index++) {
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
                }
            } else {
                this.setState({sleeping: true})
                setTimeout(() => {
                    this.setState({sleeping: false})
                }, 3000);
                this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
            }
        });
        } 
    }

  handleSearch() {
    let api = Api.getInstance();
    userData = {
      searchString: this.state.search
    };
    api.callApi("api/searchEvent", "POST", {}, response => {
        if(response['responseCode'] != 503) {
            if (response["responseCode"] == 200) {
                let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
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
                                    dataSource: ds.cloneWithRows(array),
                                    loading: false
                                });
                            });
                        }
                    });
                }
            }
        } else {
                this.setState({sleeping: true})
                setTimeout(() => {
                    this.setState({sleeping: false})
                }, 3000);
                this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
            }
        });
    }

    render() {
        return(
        <ImageBackground
        blurRadius={0}
        source={require("../assets/background.jpg")}
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
            {this.state.dataSource != null && (
              <ListView
                contentContainerStyle={{ paddingTop: 20 }}
                refreshControl={
                  <RefreshControl
                    colors={["#94D600"]}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
                dataSource={this.state.dataSource}
                style={{ paddingTop: 10, marginBottom: 55 }}
                renderRow={rowData => (
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
                          source={{ uri: rowData.photo[0] }}
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
                            {capitalize.words(rowData.leader[0][0]) +
                              " " +
                              capitalize.words(rowData.leader[2][0])}
                          </Text>
                          <Text style={{ fontSize: 14, color: "black" }}>
                            {rowData.created}
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
                                rowData.name.toString().replace(", ,", " ")
                              ),
                              profilePicture: rowData.photo[0],
                              content: rowData.desc,
                              start:
                                rowData.begin +
                                " " +
                                rowData.beginMonth +
                                " " +
                                rowData.beginTime,
                              end:
                                rowData.end +
                                " " +
                                rowData.endMonth +
                                " " +
                                rowData.endTime,
                              created: rowData.created,
                              author: capitalize.words(
                                rowData.leader[0][0].replace(", ,", " ")
                              ),
                              link: rowData.link,
                              img: rowData.img,
                              location: rowData.location
                            })
                          }
                        >
                          <Image
                            source={{ uri: rowData.img }}
                            resizeMode="cover"
                            style={{ width: "100%", height: 200 }}
                          />
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
                                {rowData.begin}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 16,
                                  color: "white",
                                  textAlign: "center"
                                }}
                              >
                                {rowData.beginMonth}
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
                                rowData.name.toString().replace(", ,", " ")
                              )}
                            </Text>
                            <HTML
                              tagsStyles={{
                                p: { textAlign: "left", color: "grey" }
                              }}
                              onLinkPress={(evt, href) => {
                                Linking.openURL(href);
                              }}
                              ignoredTags={["img"]}
                              html={rowData.desc}
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
                          {!rowData.subscribed && (
                            <TouchableHighlight
                              onPress={() => {
                                let api = Api.getInstance();
                                let localStorage = LocalStorage.getInstance();
                                localStorage.retrieveItem("userId").then(id => {
                                  if (id != null) {
                                    userData = {
                                      eventId: rowData.id,
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
                                    this.props.navigation.navigate(
                                      "LoginScreen"
                                    );
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
                          {rowData.subscribed && (
                            <TouchableHighlight
                              onPress={() => {
                                let api = Api.getInstance();
                                let localStorage = LocalStorage.getInstance();
                                localStorage.retrieveItem("userId").then(id => {
                                  if (id != null) {
                                    userData = {
                                      eventId: rowData.id,
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
                                    this.props.navigation.navigate(
                                      "LoginScreen"
                                    );
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
                                    rowData.name.toString().replace(", ,", " ")
                                  ) +
                                  ". Voor meer informatie ga naar: " +
                                  rowData.link
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
                            <Text
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              DELEN
                            </Text>
                          </TouchableHighlight>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        )}
        {this.state.loading && <PacmanIndicator color="#94D600" />}
        <FlashMessage position="top" style={{marginTop: Header.HEIGHT}}/>
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
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
