import React, { Component } from "react";
import {
	TouchableOpacity,
	Text
} from 'react-native';
import { DrawerActions, Header, NavigationActions } from 'react-navigation';
import Api from '../config/api.js';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";

import stylesCss from "../assets/css/style.js";
import LocalStorage from "../config/localStorage.js";
import FBSDK, { LoginManager, GraphRequest, GraphRequestManager, AccessToken } from 'react-native-fbsdk';


export default class facebookLogin extends Component {
  constructor() {
	super();
	this.state = {};
  }

  errorMessage(msg) {
	showMessage({
	  message: msg,
	  type: "danger",
	  duration: 2500
	});
  }

  fbAuth() {
	LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function(result) {
		if (result.isCancelled){
			alert("cancelled")
		} else {
			AccessToken.getCurrentAccessToken().then(
			(data) => {
			  let accessToken = data.accessToken
			  const responseInfoCallback = (error, result) => {
				if (error) {
				  console.log(error)
				} else {
					userData = {
						email: result['email'],
						firstName: result['first_name'],
						lastName: result['last_name']
					}
				  let api = Api.getInstance()
				  api.callApi("facebookLogin", "POST", userData, response => {
					if (response["responseCode"] != 503) {
						if (response["boolean"] == "true") {
		  					let localStorage = LocalStorage.getInstance();
							localStorage.storeItem("succesfull", true);
							localStorage.storeItem("userId", response['userId']);
							localStorage.storeItem("wordpresskey", response['wordpresskey']);
							localStorage.storeItem("clearance", response['clearance']);
						} else {
						  (response) => this.errorMessage(response["msg"]);
						}
					} else {
						() => this.errorMessage(
						  "Zorg ervoor dat u een internet verbinding heeft"
						);
					}             
				  });
				}
			  }

			  const infoRequest = new GraphRequest(
				'/me',
				{
				  accessToken: accessToken,
				  parameters: {
					fields: {
					  string: 'id,email,first_name,last_name'
					}
				  }
				},
				responseInfoCallback
			  );
			  new GraphRequestManager().addRequest(infoRequest).start()
		  });
	  }
	}, function(error) {
		console.log(error)
	});
}

  render() {
	return (
		<TouchableOpacity
			onPress={this.fbAuth()}
			style={{height: "100%", width: "100%", backgroundColor: "blue"}}
		>
		</TouchableOpacity>
	);
  }
}