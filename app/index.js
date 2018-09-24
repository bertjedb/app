import React, { Component } from 'react';
import { MyApp } from './config/router';


class App extends Component {
	constructor(){
		super()
		console.disableYellowBox = true;
	}
  render() {
    return (<MyApp/>)
  }
}

export default App;
