import React from 'react';
import LocalStorage from './localStorage.js';

export default class Api {

	static instance = null;
	url = "http://145.37.145.126:5000/";

	static getInstance() {
		if(Api.instance == null) {
			Api.instance = new Api();
		}

		return Api.instance;
	}

	callApi(action, method, data, callBack = response => console.log(response)) {
		if(method == 'GET'){
			fetch(this.url + action, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
			}).then((response) => response.json())
			.then(responseJson => callBack(responseJson))
			.catch((error) => {
				callBack(error);
			})
		} else if (method == 'POST') {
			fetch(this.url + action, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			}).then((response) => response.json())
			.then(responseJson => callBack(responseJson))
			.catch((error) => {
				callBack(error);
			})
		}
	}

	getPoints() {
		let localStorage = LocalStorage.getInstance();
		localStorage.retrieveItem('userId').then((id) => {
			userData = {
				id: id
			}
			this.callApi('api/checkPoints', 'POST', userData, response => {
				console.log("new points are " + response['points'][0])
				localStorage.storeItem('points', response['points'][0])
			});
		});

	}

	updatePoints(userData) {
		this.callApi('api/eventByCode', 'POST', userData, response => {
            if(response.responseCode == "200") {
                let localStorage = LocalStorage.getInstance();
                localStorage.retrieveItem('userId').then((id) => {
                    sendData = {
                        eventId: response.eventId,
                        personId: id
                    }
                    this.callApi('api/qrEvent', 'POST', sendData, response => {
                        if(response['responseCode'] == "200") {
                            //Idk waarom maar false werkt en true niet. Hierdoor wel de value in scannerQR inverted
                            return true
                        }
                    });
                  }).catch((error) => {
                  //this callback is executed when your Promise is rejected
                  console.log('Promise is rejected with error: ' + error);
                  return false
                  });
            } else {
            	console.log("Could not find qr code")
            	return false
            }
        });
	}
}
