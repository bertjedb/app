import { Image } from 'react-native';
import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Onboarding from 'react-native-onboarding-swiper'; // 0.4.0

export default class Intro extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      loc: "",
      begin: "",
      end: "",
      desc: "",
      showBegin: false,
      showEnd: false,
      beginText: "",
      endText: "",
      pickedImage: { uri: "" },
      imgPicked: false
    };
  }

  render() {
    return (
		<Onboarding
		onDone={() => this.props.navigation.dispatch(NavigationActions.back())}
		transitionAnimationDuration={250}
	       pages={[
			   {
  	           backgroundColor: '#8bc34a',
  	           image: <Image style={{height: '100%'}} resizeMode='contain' source={require('../assets/logo.png')} />,
  	           title: 'Bslim',
  	           subtitle: 'De meest geweldige app voor de koelste jeugd.',
  	         },
	         {
	           backgroundColor: '#8bc34a',
	           image: <Icon size={120} name={ 'calendar-range' } style={{ color: 'white' }} />,
	           title: 'Evenementen',
	           subtitle: 'Op de evenementen pagina zie je alle evenementen die Bslim organiseert.',
	         },
	         {
	           backgroundColor: '#8bc34a',
	           image: <Icon size={120} name={ 'account' } style={{ color: 'white' }} />,
	           title: 'Inloggen',
	           subtitle: 'Door op onze app in te loggen kun je stempels verzamelen bij elk Bslim evenement.',
	         },
	         {
	           backgroundColor: '#8bc34a',
	           image: <Icon size={120} name={ 'bell' } style={{ color: 'white' }} />,
	           title: 'Notificaties',
	           subtitle: 'Dankzij de notificaties blijf je altijd op de hoogte.',
	         },
	       ]}
	     />
    );
  }
}
