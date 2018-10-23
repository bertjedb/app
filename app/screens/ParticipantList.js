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
  TouchableHighlight,
  ListView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SwipeListView } from "react-native-swipe-list-view";
import PropTypes from "prop-types";
import { DrawerActions, NavigationActions, Header } from "react-navigation";
import { Toolbar } from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import Accordion from "@ercpereda/react-native-accordion";
import Swipeout from "react-native-swipeout";

var swipeoutBtns = [
  {
    text: "Button"
  }
];

class ParticipantList extends Component {
  constructor() {
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      map: true,
      activeSections: [],
      listViewData: {
        0: { key: "0", text: "Gaauwe" },
        1: { key: "1", text: "Jelmer" },
        2: { key: "2", text: "Bert" },
        3: { key: "3", text: "Wouter" }
      }
    };
    console.log(this.state.listViewData);
  }

  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  deleteRow(rowMap, rowKey) {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.listViewData];
    const prevIndex = this.state.listViewData.findIndex(
      item => item.key === rowKey
    );
    newData.splice(prevIndex, 1);
    this.setState({ listViewData: newData });
  }

  render() {
    const leftContent = <Text>Pull to activate</Text>;

    const rightButtons = [
      <TouchableHighlight>
        <Text>Button 1</Text>
      </TouchableHighlight>,
      <TouchableHighlight>
        <Text>Button 2</Text>
      </TouchableHighlight>
    ];

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
            centerElement={"Deelnemers"}
            leftElement={"arrow-left"}
            onLeftElementPress={() =>
              this.props.navigation.dispatch(NavigationActions.back())
            }
          />
        </LinearGradient>
        <View style={styles.cardContainer}>
          <Swipeout right={swipeoutBtns}>
            <View>
              <Text>Swipe me left</Text>
            </View>
          </Swipeout>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  rowFront: {
    alignItems: "center",
    backgroundColor: "#b0bec5",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 50
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  backTextWhite: {
    color: "#FFF"
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backLeftBtn: {
    backgroundColor: "#FF6700",
    paddingLeft: 25,
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  cardContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",

    paddingBottom: 150
  },
  listItem: {
    height: 75,
    alignItems: "center",
    justifyContent: "center"
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 10
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10
  }
});

export default ParticipantList;
