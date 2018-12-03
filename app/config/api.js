import React from "react";
import LocalStorage from "./localStorage.js";
import { NetInfo } from "react-native";

export default class Api {
  static instance = null;

  url = "http://gaauwe.nl:5000/";

  static getInstance() {
    if (Api.instance == null) {
      Api.instance = new Api();
    }

    return Api.instance;
  }

  getPoints() {
    let localStorage = LocalStorage.getInstance();
    localStorage.retrieveItem("userId").then(id => {
      if (id != null) {
        userData = {
          id: id
        };
        this.callApi("api/checkPoints", "POST", userData, response => {
          if (response["responseCode"] != 503) {
            localStorage.storeItem("points", response["points"][0]);
          } else {
            localStorage.storeItem("points", null);
          }
        });
      }
    });
  }

  callApi(action, method, data, callBack = response => console.log(response)) {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type != "none") {
        if (method == "GET") {
          fetch(this.url + action, {
            method: method,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(responseJson => callBack(responseJson))
            .catch(error => {
              callBack(error);
            });
        } else if (method == "POST") {
          fetch(this.url + action, {
            method: method,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(responseJson => callBack(responseJson))
            .catch(error => {
              callBack(error);
            });
        }
      }
    });
  }
}
