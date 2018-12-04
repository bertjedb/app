import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Share,
  TouchableHighlight,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import Api from "../config/api.js";
import { PacmanIndicator } from "react-native-indicators";

var swipeoutBtns = [
  {
    text: "Button"
  }
];

class ParticipantList extends Component {
  constructor() {
    super();
    this.state = { eventArray: [], loading: true };
    let api = Api.getInstance();
    api.callApi("api/getAllEvents", "POST", {}, response => {
      if (response["responseCode"] == 200) {
        this.setState({
          eventArray: response["events"],
          loading: false
        });
      }
    });
  }

  refresh() {
    this.setState({ loading: true });
    let api = Api.getInstance();
    api.callApi("api/getAllEvents", "POST", {}, response => {
      if (response["responseCode"] == 200) {
        this.setState({
          eventArray: response["events"],
          loading: false
        });
      }
    });
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/Bslim_Background.jpg")}
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
            centerElement={"Deelnemers beheren"}
            rightElement="reload"
            onRightElementPress={() => this.refresh()}
          />
        </LinearGradient>
        {!this.state.loading && (
          <View style={styles.container}>
            <FlatList
              data={this.state.eventArray}
              renderItem={({ item }) => (
                <View>
                  <TouchableHighlight
                    style={styles.eventCard}
                    onPress={() =>
                      this.props.navigation.navigate("ParticipantListDetail", {
                        title: item.name,
                        participants: item.participants,
                        eventId: item.id
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        padding: 15
                      }}
                    >
                      <View
                        style={{
                          height: "100%",
                          backgroundColor: "#F27B13",
                          borderRadius: 5
                        }}
                      >
                        <View style={{ flexDirection: "column", padding: 10 }}>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 14,
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
                              fontSize: 14,
                              color: "white",
                              textAlign: "center"
                            }}
                          >
                            {item.beginMonth}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </TouchableHighlight>
                  <View style={{ backgroundColor: "black", height: 1 }} />
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
  container: {
    flex: 1,
    marginBottom: 56
  },

  eventCard: {
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    height: 75,
    width: "100%"
  },
  text: {
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 18,
    color: "black"
  }
});

export default ParticipantList;
