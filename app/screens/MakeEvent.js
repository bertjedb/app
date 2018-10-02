import React, {
    Component
} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import styles from '../assets/css/style.js';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { TextField } from 'react-native-material-textfield';
import { Button } from 'react-native-material-ui';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class MakeEvent extends Component {

  constructor() {
    super();
	this.state = {
		name: '',
		loc: '',
		begin: '',
		end: '',
		desc: '',
		showBegin: false,
		showEnd: false,
		beginText: '',
		endText: ''
    };
  }

  errorMessage(msg){
    showMessage({
        message: msg,
        type: "danger",
        duration: 2500,
      });
  }

  successMessage(msg){
    showMessage({
        message: msg,
        type: "success",
        duration: 4000,
      });
  }

  createEvent() {
  	if(this.state.name != '' ||
  	   this.state.begin != '' ||
  	   this.state.end != '' ||
  	   this.state.loc != '' ||
  	   this.state.desc != '') {
  			let localStorage = LocalStorage.getInstance();
  			let points = localStorage.retrieveItem('userId').then((id) => {
  			if(id != null) {
  				let userData = {
  					name: this.state.name,
  					begin: this.state.begin,
  					end: this.state.end,
  					location: this.state.loc,
  					description: this.state.desc,
  					leader: id,
  					img: null
  				}
  				let api = Api.getInstance();
  				api.callApi('api/createEvent', 'POST', userData, response => {
        		    if(response['responseCode'] == 200) {
        		    	this.successMessage("Er is een nieuw evenement aangemaakt!");
        		    } else {
        		    	console.log(response);
        		    }
        		});
  			}
  		});
  	} else {
  		this.errorMessage("Vul alle velden in aub")
  	}
  	
  }

  handleBegin(dateTime) {
  	this.setState({begin: dateTime, beginText: moment(Date(dateTime)).format('MM-DD-YYYY H:mm')});
  	this.hidePicker();
  }

  handleEnd(dateTime) {
  	this.setState({end: dateTime, endText: moment(Date(dateTime)).format('MM-DD-YYYY H:mm')})
  	this.hidePicker();
  }

  hidePicker() {
  	this.setState({showBegin: false, showEnd: false});
  }

  render() {
    return(
    		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
				<View style={styles.container}>
					<View style={styles.cardGreen} elevation={5}>
						<Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
          					Evenementen aanmaken
          				</Text>
          				<View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
          				<Text style={{marginTop: 10}}>
          					Hier kun je nieuwe evenementen aanmaken
          				</Text>
							<TextField
								textColor='green'
             					tintColor='green'
             					baseColor='green'
		  						label="Naam van evenement"
          						value={ this.state.name }
          						onChangeText={ name => this.setState({name}) }
							/>
							
							<TouchableOpacity style={styles.datePick} onPress={() => this.setState({showBegin: true})}>
								<Text>
									Begin: {this.state.beginText}
								</Text>
							</TouchableOpacity>

							<DateTimePicker
								isVisible={this.state.showBegin}
								onConfirm={(dateTime) => this.handleBegin(dateTime)}
								onCancel={() => this.hidePicker()}
								mode={'datetime'}
							/>

							<TouchableOpacity style={styles.datePick} onPress={() => this.setState({showEnd: true})}>
								<Text>
									Eind: {this.state.endText}
								</Text>
							</TouchableOpacity>

							<DateTimePicker
								isVisible={this.state.showEnd}
								onConfirm={(dateTime) => this.handleEnd(dateTime)}
								onCancel={() => this.hidePicker()}
								mode={'datetime'}
							/>

							<TextField
								textColor='green'
             					tintColor='green'
             					baseColor='green'
		  						label="Locatie van evenement"
          						value={ this.state.loc }
          						onChangeText={ loc => this.setState({loc}) }
							/>
				
							<TextField
								textColor='green'
             					tintColor='green'
             					baseColor='green'
		  						label="Beschrijving van evenement"
          						value={ this.state.desc }
          						multiline={true}
          						numberOfLines={6}
          						onChangeText={ desc => this.setState({desc}) }
							/>
							<Button
            					style={{container: styles.defaultBtn, text: {color: 'white'}}}
            					raised text="Doorgaan"
            					onPress={() => this.createEvent()}
          					/>
						</View>
					</View>
				</View>
        		<FlashMessage position="top" />
			</ImageBackground>
    );
  }
}