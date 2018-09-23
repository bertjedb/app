import React from 'react';

export default class Api {

	static instance = null;
	url = "http://gaauwe.nl:5000/";

	static getInstance() {
		if(Api.instance == null) {
			Api.instance = new Api();
		}

		return Api.instance;
	}

	callApi(action, method, data, callBack = response => console.log(response)) {
		fetch(this.url + '/api' + action, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}).then((response) => response.json())
		.then(responseJson => callBack(responseJson))
		.catch((error) => {
			console.log(error);
		})
	}
}