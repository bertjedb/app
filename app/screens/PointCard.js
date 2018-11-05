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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions, NavigationActions, Header } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import stylesCss from '../assets/css/style.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerQR from './ScannerQR.js';
import ConfettiView from 'react-native-confetti-view';
import CardFlip from 'react-native-card-flip';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage } from "react-native-flash-message";

import {
  COLOR,
  ThemeContext,
  getTheme,
  Toolbar,
  Card,
  Button
} from "react-native-material-ui";

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

class PointCard extends Component {
  static navigationOptions = {
    title: "Bslim",
    headerStyle: {
      backgroundColor: "#93D500"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };

  constructor() {
    super();
    this.state = {
      card: null,
      cameraActive: false,
      points: null
    };
    this.refreshCard();
  }

  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
    this.onLoad();
    this.props.navigation.addListener("willFocus", this.onLoad);
  }

  onLoad = () => {
    this.refreshCard();
  };

   errorMessage(msg){
    showMessage({
        message: msg,
        type: "danger",
        duration: 3000,
      });
  }

  refreshCard() {
    let localStorage = LocalStorage.getInstance();
    let api = Api.getInstance();
    api.getPoints();
    let points = localStorage.retrieveItem('points').then((points) => {
        if(points != null) {
            this.setState({card: this.fillCard(points)});
        } else {
            this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
        }

    })
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }

  getFile(id, total) {
    if (id <= total) {
      return (
        <View style={stylesCss.stampFilled}>
          <Image
            style={stylesCss.stamp}
            source={require("../assets/points/1.png")}
          />
          <Image
            style={stylesCss.stamp}
            source={require("../assets/points/Check.png")}
          />
        </View>
      );
    }

    switch (id) {
      case 1:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/1.png")}
          />
        );
        break;
      case 2:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/2.png")}
          />
        );
        break;
      case 3:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/3.png")}
          />
        );
        break;
      case 4:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/4.png")}
          />
        );
        break;
      case 5:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/5.png")}
          />
        );
        break;
      case 6:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/6.png")}
          />
        );
        break;
      case 7:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/7.png")}
          />
        );
        break;
      case 8:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/8.png")}
          />
        );
        break;
      case 9:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/9.png")}
          />
        );
        break;
      case 10:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/10.png")}
          />
        );
        break;
      case 11:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/11.png")}
          />
        );
        break;
      case 12:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/12.png")}
          />
        );
        break;
      case 13:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/13.png")}
          />
        );
        break;
      case 14:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/14.png")}
          />
        );
        break;
      case 15:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/15.png")}
          />
        );
        break;
      default:
        return (
          <Image
            style={stylesCss.stampFilled}
            source={require("../assets/points/1.png")}
          />
        );
    }
  }

  fillCard(numOfStamps) {
    let holderArray = [];
    let count = 1;

    for (let row = 0; row < 5; row++) {
      holderArray.push(
        <View key={15 - count} style={stylesCss.pointCardColumn}>
          <View style={stylesCss.pointCardRow}>
            {this.getFile(count, numOfStamps)}
            {this.getFile(count + 1, numOfStamps)}
            {this.getFile(count + 2, numOfStamps)}
          </View>
        </View>
      );
      count = count + 3;
    }
    return holderArray;
  }

  render() {
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
          <Toolbar centerElement="Stempelkaart" />
        </LinearGradient>
        <CardFlip style={styles.cardContainer} ref={card => (this.card = card)}>
          <TouchableOpacity activeOpacity={1} style={styles.container}>
            <View style={styles.card} elevation={5}>
              <Text
                style={{
                  marginTop: 15,
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#3bb222"
                }}
              >
                Stempelkaart
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#3bb222"
                }}
              >
                Scan een QR-code voor een stempel
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  height: Dimensions.get("window").height - 320,
                  width: Dimensions.get("window").width - 40,
                  borderRadius: 10,
                  alignItems: "center"
                }}
              >
                {this.state.card}
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ cameraActive: true });
                  this.card.flip();
                  this.refreshCard();
                }}
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  height: 65,
                  width: 65,
                  backgroundColor: "#3bb222",
                  borderRadius: 50,
                  shadowOffset: { width: 0, height: 13 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  // android (Android +5.0)
                  elevation: 5
                }}
              >
                <Icon
                  onPress={() => {
                    this.setState({ cameraActive: true });
                    this.card.flip();
                    this.refreshCard();
                  }}
                  name="camera"
                  style={{ margin: 15 }}
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.container}>
            <View style={styles.card} elevation={5}>
              <Text
                style={{
                  marginTop: 15,
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#3bb222"
                }}
              >
                Scanner
              </Text>
              <Text
                style={{
                  marginBottom: 10,
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#3bb222"
                }}
              >
                Scan een QR-code voor een stempel
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  height: Dimensions.get("window").height - 320,
                  width: Dimensions.get("window").width - 40,
                  borderRadius: 10,
                  alignItems: "center"
                }}
              >
                {this.state.cameraActive && <ScannerQR />}
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ cameraActive: false });
                  this.card.flip();
                  this.refreshCard();
                }}
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  height: 65,
                  width: 65,
                  backgroundColor: "#FF6700",
                  borderRadius: 50,
                  shadowOffset: { width: 0, height: 13 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  // android (Android +5.0)
                  elevation: 5
                }}
              >
                <Icon
                  onPress={() => {
                    this.setState({ cameraActive: false });
                    this.card.flip();
                    this.refreshCard();
                  }}
                  name="close"
                  style={{ margin: 15 }}
                  size={35}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </CardFlip>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  cardUM: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5
  },
  card1: {
    backgroundColor: "#FE474C"
  },
  card2: {
    backgroundColor: "#FEB12C"
  },
  label: {
    lineHeight: 470,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent"
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 135
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: Dimensions.get("window").height - 210,
    width: Dimensions.get("window").width - 40,
    margin: 10,
    marginBottom: 40,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // android (Android +5.0)
    elevation: 3
  },

  SectionStyleTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  SectionStyleBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
	ImageStyle: {
	    margin: 5,
	    alignItems: 'center'
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

export default PointCard;
