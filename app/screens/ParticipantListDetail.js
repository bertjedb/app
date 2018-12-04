import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableHighlight,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../config/api.js";
import LocalStorage from "../config/localStorage.js";
import LinearGradient from "react-native-linear-gradient";
import { DrawerActions, Header } from "react-navigation";
import Swipeable from "react-native-swipeable-row";
import Autocomplete from "react-native-autocomplete-input";
import { TextField } from "react-native-material-textfield";
import { showMessage } from "react-native-flash-message";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

var capitalize = require("capitalize");

const leftContent = <Text>Pull to activate</Text>;

const rightButtons = [
  <TouchableHighlight>
    <Text>Button 1</Text>
  </TouchableHighlight>,
  <TouchableHighlight>
    <Text>Button 2</Text>
  </TouchableHighlight>
];

class ParticipantListDetail extends Component {
  constructor() {
    super();
    this.state = {
      currentlyOpenSwipeable: null,
      refreshed: false,
      participants: [],
      showInfo: false,
      users: [],
      query: "",
      email: "",
      userId: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    eventId = navigation.getParam("eventId", "");
    this.getAllUsers();
    this.refresh(eventId);
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

  getAllUsers() {
    let api = Api.getInstance();

    api.callApi("api/getUsers", "POST", {}, response => {
      if (response["responseCode"] == 200) {
        this.setState({ users: response["users"] });
      }
    });
  }

  addPoint(personId, points, name, eventId) {
    let api = Api.getInstance();
    userData = { id: personId };
    api.callApi("api/addPoint", "POST", userData, response => {
      if (response["responseCode"] == 200) {
        this.successMessage(name + " heeft een stempel erbij gekregen");
        this.refresh(eventId);
      }
    });
  }

  substractPoint(personId, points, name, eventId) {
    let api = Api.getInstance();
    api.callApi("api/substractPoint", "POST", { id: personId }, response => {
      if (response["responseCode"] == 200) {
        this.successMessage(name + " heeft een stempel eraf gekregen");
        this.refresh(eventId);
      }
    });
  }

  resetCard(personId, points, name, eventId) {
    Alert.alert(
      "Kaart verzilveren bevestigen",
      "Weet je zeker dat je de kaart van " + name + " wilt verzilveren?",
      [
        {
          text: "Annuleren",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Bevestigen",
          onPress: () => {
            if (points >= 15) {
              let api = Api.getInstance();
              api.callApi(
                "api/resetStampCard",
                "POST",
                { id: personId },
                response => {
                  if (response["responseCode"] == 200) {
                    this.successMessage(
                      "De kaart van " + name + " is verzilverd!"
                    );
                    this.refresh(eventId);
                  }
                }
              );
            } else {
              this.errorMessage(name + " heeft nog geen 15 stempels!");
            }
          }
        }
      ]
    );
  }

  removeParticipant(eventId, name, personId) {
    Alert.alert(
      "Verwijderen bevestigen",
      "Weet je zeker dat je " +
        name +
        " als deelnemer wilt verwijderen van dit evenement?",
      [
        {
          text: "Annuleren",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Bevestigen",
          onPress: () => {
            let api = Api.getInstance();
            api.callApi(
              "api/unSubToEvent",
              "POST",
              { eventId: eventId, personId: personId },
              response => {
                if (response["responseCode"] == 200) {
                  this.errorMessage(
                    name + " is verwijderd als deelnemer van dit evenement"
                  );
                  this.refresh(eventId);
                }
              }
            );
          }
        }
      ]
    );
  }

  addParticipant(eventId, personId) {
    if (personId === "") {
      alert("Selecteer een deelnemer");
      return;
    }
    let api = Api.getInstance();
    api.callApi(
      "api/subToEvent",
      "POST",
      { eventId: eventId, personId: personId },
      response => {
        if (response["responseCode"] == 200) {
          this.successMessage(
            "Deelnemer is succesvol toegevoegd aan dit evenement"
          );
          this.refresh(eventId);
        } else {
          this.errorMessage("Deze persoon neemt al deel aan dit evenement");
        }
        this.setState({
          query: "",
          email: "",
          userId: ""
        });
      }
    );
  }

  filterData(query) {
    if (query === "") {
      return [];
    }
    const { users } = this.state;
    const regex = new RegExp(`${query.trim()}`, "i");
    return users.filter(user => user.name.search(regex) >= 0);
  }

  refresh(eventId) {
    let api = Api.getInstance();
    api.callApi(
      "api/getParticipants",
      "POST",
      { eventId: eventId },
      response => {
        if (response["responseCode"] == 200) {
          this.setState({
            refreshed: true,
            participants: response["participants"]
          });
        }
      }
    );
  }

  render() {
    const { currentlyOpenSwipeable } = this.state;
    const onOpen = (event, gestureState, swipeable) => {
      console.log("open")
      if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
        currentlyOpenSwipeable.recenter();
      }

      this.setState({ currentlyOpenSwipeable: swipeable });
    };
    const onClose = () => currentlyOpenSwipeable.recenter();
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const eventId = navigation.getParam("eventId", "");
    const { query } = this.state;
    const users = this.filterData(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View
        style={{ backgroundColor: "#f5f5f5", width: "100%", height: "100%" }}
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
            centerElement={"Deelnemers beheren"}
            leftElement={"arrow-left"}
            onLeftElementPress={() => this.props.navigation.goBack()}
            rightElement={"information"}
            onRightElementPress={() =>
              this.setState({ showInfo: !this.state.showInfo })
            }
          />
        </LinearGradient>
        <ScrollView style={styles.container}>
          <View
            style={{
              flexDirection: "column",
              borderRadius: 20,
              margin: 15
            }}
          >
            <Text style={styles.participantText}>
              Deelnemers aan dit evenement ({this.state.participants.length})
            </Text>

            <View style={{ flexDirection: "row" }}>
              <View style={{ height: 55, width: "70%" }}>
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
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputContainerStyle={{ borderWidth: 1 }}
                    style={{ padding: 5 }}
                    listStyle={{
                      borderWidth: 0,
                      height: 125,
                      margin: 0,
                      backgroundColor: "#00000000"
                    }}
                    data={
                      users.length === 1 && comp(query, users[0].name)
                        ? []
                        : users
                    }
                    defaultValue={query}
                    onChangeText={text => this.setState({ query: text })}
                    placeholder="Voeg deelnemer toe"
                    renderSeparator={() => (
                      <View
                        style={{
                          width: "100%",
                          height: 1,
                          backgroundColor: "grey"
                        }}
                      />
                    )}
                    renderItem={({ name, email, id }) => (
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
                            query: name,
                            email: email,
                            userId: id
                          })
                        }
                      >
                        <Text>
                          {name} ({email})
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.addParticipant(eventId, this.state.userId);
                }}
                style={{
                  width: "30%",
                  height: 40,
                  marginLeft: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#FF6700"
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Voeg toe
                </Text>
              </TouchableHighlight>
            </View>

            {this.state.showInfo == true && (
              <View>
                <View style={styles.legendaItem}>
                  <Icon name="plus-circle-outline" size={30} color="#64dd17" />
                  <Text style={{ marginLeft: 10 }}>
                    Geef de deelnemer een stempel
                  </Text>
                </View>

                <View style={styles.legendaItem}>
                  <Icon name="minus-circle-outline" size={30} color="#f44336" />
                  <Text style={{ marginLeft: 10 }}>
                    Verwijder een stempel van deelnemer
                  </Text>
                </View>

                <View style={styles.legendaItem}>
                  <Icon name="gift" size={30} color="#4fc3f7" />
                  <Text style={{ marginLeft: 10 }}>
                    Verzilver de kaart van een deelnemer
                  </Text>
                </View>

                <View style={styles.legendaItem}>
                  <Icon name="account-minus" size={30} color="#f44336" />
                  <Text style={{ marginLeft: 10 }}>
                    Verwijder een deelnemer van dit evenement
                  </Text>
                </View>

                <View style={styles.legendaItem}>
                  <Icon name="gesture-swipe-left" size={30} color="#4fc3f7" />
                  <Icon name="gesture-swipe-right" size={30} color="#4fc3f7" />
                  <Text style={{ marginLeft: 10 }}>
                    Swipe deelnemers om acties uit te voeren
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              backgroundColor: "black",
              height: 2,
              marginTop: "2%",
              marginBottom: "2%"
            }}
          />
          <FlatList
            data={this.state.participants}
            style={{ marginBottom: "20%" }}
            renderItem={({ item }) => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white"
                }}
              >
                <Swipeable
                  leftButtonWidth={60}
                  leftButtons={[
                    <TouchableOpacity
                      style={[
                        styles.leftSwipeItem,
                        { backgroundColor: "#4fc3f7" }
                      ]}
                      onPress={() => {
                        this.resetCard(
                          item.id,
                          item.points,
                          item.name,
                          eventId
                        );
                        this.state.currentlyOpenSwipeable.recenter();
                      }}
                    >
                      <Icon name="gift" size={25} />
                    </TouchableOpacity>,
                    <TouchableOpacity
                      style={[
                        styles.leftSwipeItem,
                        { backgroundColor: "#f44336" }
                      ]}
                      onPress={() => {
                        this.substractPoint(
                          item.id,
                          item.points,
                          item.name,
                          eventId
                        );
                        this.state.currentlyOpenSwipeable.recenter();
                      }}
                    >
                      <Icon name="minus-circle-outline" size={25} />
                    </TouchableOpacity>,
                    <TouchableOpacity
                      style={[
                        styles.leftSwipeItem,
                        { backgroundColor: "#64dd17" }
                      ]}
                      onPress={() => {
                        this.addPoint(item.id, item.points, item.name, eventId);
                        this.state.currentlyOpenSwipeable.recenter();
                      }}
                    >
                      <Icon name="plus-circle-outline" size={25} />
                    </TouchableOpacity>
                  ]}
                  rightButtons={[
                    <TouchableOpacity
                      style={[
                        styles.rightSwipeItem,
                        { backgroundColor: "#f44336" }
                      ]}
                      onPress={() => {
                        this.removeParticipant(eventId, item.name, item.id);
                        this.state.currentlyOpenSwipeable.recenter();
                      }}
                    >
                      <Icon name="account-minus" size={25} />
                    </TouchableOpacity>
                  ]}
                  onRightButtonsOpenRelease={onOpen}
                  onRightButtonsCloseRelease={onClose}
                  onLeftButtonsOpenRelease={onOpen}
                  onLeftButtonsCloseRelease={onClose}
                >
                  <View style={[styles.listItem]}>
                    <Text style={styles.text}>
                      {capitalize.words(item.name)} |
                    </Text>
                    <Text style={styles.points}> Stempels : {item.points}</Text>
                  </View>
                </Swipeable>
                <View style={{ backgroundColor: "#f5f5f5", height: 4 }} />
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  listItem: {
    flexDirection: "row",
    height: 40,
    marginLeft: "5%",
    alignItems: "center"
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  header: {
    fontSize: 20,
    color: "black",
    marginTop: 5,
    marginLeft: "15%",
    marginBottom: 20
  },
  text: {
    fontSize: 15,
    color: "black"
  },
  points: {
    fontSize: 15,
    color: "black"
  },
  legendaItem: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  participantText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: "2%"
  },
  searchSection: {
    flex: 1,
    height: "30%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  searchIcon: {
    padding: 10
  }
});

export default ParticipantListDetail;
