import React, { Component } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
  Dimensions,
  Navigator,
  Platform,
  ListView,
  ActivityIndicator
} from "react-native";

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import {TextField} from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import * as mime from 'react-native-mime-types';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import { NavigationActions } from 'react-navigation';

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
    primaryColor: COLOR.green500
  },
  toolbar: {
    container: {
      height: 60
    }
  }
};

class ScannerQR extends Component {
  constructor() {
    super();
    this.state = {
      firstLoading: true,
      dataSource: null,
      imageSource: null,
      progress: 0,
      fileName: "",
      fileExtension: null,
      mimeType: null,
      filePath: null,
      filePathRaw: null,
      qrState: false,
      pointCount: 0,
      scannerReactivate: true
    };
  }

  //Here we get the list with images because componentDidMount is always called before the view is rendered
  componentDidMount() {
    //Hide yellow warnings in the App
    console.disableYellowBox = true;
  }

  checkQR(response) {
    this.setState({
      scannerReactivate: false
    });
    userData = {
      qrCode: response.data
    };
    let api = Api.getInstance();
    api.callApi("api/eventByCode", "POST", userData, response => {
      if (response.responseCode == "200") {
        let localStorage = LocalStorage.getInstance();
        localStorage
          .retrieveItem("userId")
          .then(id => {
            sendData = {
              eventId: response.eventId,
              personId: id
            };
            api.callApi("api/qrEvent", "POST", sendData, response => {
              if (response["responseCode"] == "200") {
                alert("Je hebt een stempel erbij gekregen!");
                api.getPoints();
              } else {
                alert("Deze code heb je al gescannend");
              }
            });
          })
          .catch(error => {
            //this callback is executed when your Promise is rejected
            console.log("Promise is rejected with error: " + error);
          });
      } else {
        alert("Deze stempel is niet geldig");
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <QRCodeScanner
          reactivate={this.state.scannerReactivate}
          reactivateTimeout={3000}
          showMarker={true}
          onRead={response => this.checkQR(response)}
          cameraStyle={{
            height: Dimensions.get("window").height - 410,
            width: Dimensions.get("window").width - 40,
            marginLeft: 20,
            marginTop: 20
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textViewTitle: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default ScannerQR;
