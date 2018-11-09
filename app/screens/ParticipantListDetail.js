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
  TouchableHighlight
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Api from "../config/api.js";
import LocalStorage from "../config/localStorage.js";
import LinearGradient from "react-native-linear-gradient";
import { DrawerActions, Header } from "react-navigation";
import Swipeable from "react-native-swipeable-row";

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
      refreshed: false
    };
  }

  handleScroll = () => {
    const { currentlyOpenSwipeable } = this.state;

    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    eventId = navigation.getParam("eventId", "");
    this.refresh(eventId);
  }

  addPoint(personId, points, name, eventId) {
    let api = Api.getInstance();
    userData = { id: personId };
    api.callApi("api/addPoint", "POST", userData, response => {
      if (response["responseCode"] == 200) {
        alert("Punt erbai");
        this.refresh(eventId);
      }
    });
  }

  substractPoint(personId, points, name, eventId) {
    let api = Api.getInstance();
    api.callApi("api/substractPoint", "POST", { id: personId }, response => {
      if (response["responseCode"] == 200) {
        alert("Dat is pech, punt weg");
        this.refresh(eventId);
      }
    });
  }

  resetCard(personId, points, name, eventId) {
    let api = Api.getInstance();
    api.callApi("api/resetStampCard", "POST", { id: personId }, response => {
      if (response["responseCode"] == 200) {
        points -= 15;
        alert(
          "Kaart van " +
            capitalize.words(name) +
            " is verzilverd! " +
            name +
            " heeft nu " +
            points +
            " stempels"
        );
        this.refresh(eventId);
      }
    });
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
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({ currentlyOpenSwipeable: swipeable });
      },
      onClose: () => this.setState({ currentlyOpenSwipeable: null })
    };
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const eventId = navigation.getParam("eventId", "");

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
          />
        </LinearGradient>
        <ScrollView style={styles.container}>
          <View
            style={{
              height: "20%",
              flexDirection: "column",
              borderRadius: 20,
              marginBottom: "2%"
            }}
          >
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
          </View>
          <FlatList
            data={this.state.participants}
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
                      onPress={() =>
                        this.resetCard(item.id, item.points, item.name, eventId)
                      }
                    >
                      <Icon name="gift" size={25} />
                    </TouchableOpacity>,
                    <TouchableOpacity
                      style={[
                        styles.leftSwipeItem,
                        { backgroundColor: "#f44336" }
                      ]}
                      onPress={() =>
                        this.substractPoint(
                          item.id,
                          item.points,
                          item.name,
                          eventId
                        )
                      }
                    >
                      <Icon name="minus-circle-outline" size={25} />
                    </TouchableOpacity>,
                    <TouchableOpacity
                      style={[
                        styles.leftSwipeItem,
                        { backgroundColor: "#64dd17" }
                      ]}
                      onPress={() =>
                        this.addPoint(item.id, item.points, item.name, eventId)
                      }
                    >
                      <Icon name="plus-circle-outline" size={25} />
                    </TouchableOpacity>
                  ]}
                  rightContent={
                    <View
                      style={[
                        styles.rightSwipeItem,
                        { backgroundColor: "#4fc3f7" }
                      ]}
                    >
                      <Text>Pull action</Text>
                    </View>
                  }
                  onLeftButtonsOpenRelease={(
                    event,
                    gestureState,
                    swipeable
                  ) => {
                    if (
                      currentlyOpenSwipeable &&
                      currentlyOpenSwipeable !== swipeable
                    ) {
                      currentlyOpenSwipeable.recenter();
                    }

                    this.setState({ currentlyOpenSwipeable: swipeable });
                  }}
                  onLeftButtonsCloseRelease={() =>
                    this.setState({ currentlyOpenSwipeable: null })
                  }
                >
                  <View style={[styles.listItem]}>
                    <Text style={styles.text}>
                      {capitalize.words(item.name)}
                    </Text>
                    <Text style={styles.points}> Stempels : {item.points}</Text>
                  </View>
                  <View style={{ backgroundColor: "#f5f5f5", height: 4 }} />
                </Swipeable>
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
    paddingTop: 10,
    flexDirection: "column",
    marginBottom: "10%"
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
  }
});

export default ParticipantListDetail;
