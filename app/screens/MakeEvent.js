import React, {
    Component
} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import styles from '../assets/css/style.js';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import { TextField } from 'react-native-material-textfield';
import { Button, Toolbar } from 'react-native-material-ui';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImgToBase64 from 'react-native-image-base64';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerActions, NavigationActions, Header } from 'react-navigation';

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
		endText: '',
        pickedImage: { uri: '' },
        imgPicked: false
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

  createWPEvent(){
	  fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/create-post", {
		  method: 'POST',
		  headers: new Headers({
			  'Accept': 'application/json',
  'Content-Type': 'application/json'
		    }),
			body: JSON.stringify({
            title: this.state.name,
            content: '<p>' + this.state.desc + '</p><img src="' + this.state.img + '" alt="Image" />',
            start: this.state.begin,
            end: this.state.end,
         }) // <-- Post parameters
		})
		.then((response) => response.text())
		.then((responseText) => {
		  alert(responseText);
		  console.log(this.state.img);
		})
		.catch((error) => {
		    console.error(error);
		});
  }

  createEvent() {
	  let api = Api.getInstance();
	  let localStorage = LocalStorage.getInstance();
	  localStorage.retrieveItem('wordpresskey').then((goals) => {
		this.setState({wordpresskey: goals})
		}).catch((error) => {
		  //this callback is executed when your Promise is rejected
		  console.log('Promise is rejected with error: ' + error);
		});
  	if(this.state.name != '' &&
  	   this.state.begin != '' &&
  	   this.state.end != '' &&
  	   this.state.loc != '' &&
  	   this.state.desc != '' &&
       this.state.pickedImage.uri != '') {
		   RNFetchBlob.fetch('POST', 'http://gromdroid.nl/bslim/wp-json/wp/v2/media', {
				   //// TODO: Real authorization instead of hardcoded base64 username:password
				   'Authorization': "Basic YWRtaW46YnNsaW1faGFuemUh",
				   'Content-Type': + 'image/jpeg',
				   'Content-Disposition': 'attachment; filename=hoi.jpg',
				   // here's the body you're going to send, should be a BASE64 encoded string
				   // (you can use "base64"(refer to the library 'mathiasbynens/base64') APIs to make one).
				   // The data will be converted to "byte array"(say, blob) before request sent.
			   }, RNFetchBlob.wrap(this.state.pickedImage.uri))
			   .then((res) => res.json())
   			.then(responseJson => {
				this.setState({img: responseJson['guid']['raw']})
				this.createWPEvent();
				/*
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
	            img: this.state.img
	  				}
	                let api = Api.getInstance();
	  				api.callApi('api/createEvent', 'POST', userData, response => {
	        		    if(response['responseCode'] == 200) {
	                        this.setState({
	                            name: '',
	                            loc: '',
	                            begin: '',
	                            end: '',
	                            desc: '',
	                            beginText: '',
	                            endText: '',
	                            pickedImage: { uri: '' },
	                            img: ''
	                        });
	                        this.successMessage("Er is een nieuw evenement aangemaakt!");
	        		    } else {
	                        console.log(response);
	        		    	this.errorMessage("Er is wat fout gegaan");
	        		    }
	        		});

	            }});
				*/
			})

   			.catch((error) => {
   				callBack(error);
   			})
		   //this.createWPEvent();
		   /*
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
                    img: this.state.img
  				}
                let api = Api.getInstance();
  				api.callApi('api/createEvent', 'POST', userData, response => {
        		    if(response['responseCode'] == 200) {
                        this.setState({
                            name: '',
                            loc: '',
                            begin: '',
                            end: '',
                            desc: '',
                            beginText: '',
                            endText: '',
                            pickedImage: { uri: '' },
                            img: ''
                        });
                        this.successMessage("Er is een nieuw evenement aangemaakt!");
        		    } else {
                        console.log(response);
        		    	this.errorMessage("Er is wat fout gegaan");
        		    }
        		});

            }});
			*/
  	} else {
  		this.errorMessage("Vul alle velden in aub")
  	}

  }

  handleBegin(dateTime) {
  	minutes = dateTime.getMinutes();
  	if(minutes < 10) {
  		minutes = "0" + minutes
  	}
  	dateString = dateTime.getDate().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getFullYear().toString() + " " +
  				 dateTime.getHours().toString() + ":" + minutes;

  	dateToSend =  dateTime.getFullYear().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getDate().toString() + " " +
  				 dateTime.getHours().toString() + ":" + minutes;
  	this.setState({begin: dateToSend, beginText: dateString});
  	this.hidePicker();
  }

  handleEnd(dateTime) {
  	minutes = dateTime.getMinutes();
  	if(minutes < 10) {
  		minutes = "0" + minutes
  	}
  	dateString = dateTime.getDate().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getFullYear().toString() + " " +
  				 dateTime.getHours().toString() + ":" + minutes;

  	dateToSend =  dateTime.getFullYear().toString() + "-" + (dateTime.getMonth() + 1).toString() + "-" + dateTime.getDate().toString() + " " +
  				 dateTime.getHours().toString() + ":" + minutes;
  	this.setState({end: dateToSend, endText: dateString});
  	this.hidePicker();
  }

  hidePicker() {
  	this.setState({showBegin: false, showEnd: false});
  }


  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 500, maxHeight: 500}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
            pickedImage: {uri: res.uri},
            imgPicked: true,
        });
        ImgToBase64.getBase64String(this.state.pickedImage.uri).then((base64String) => {
			console.log("IMAGE:");
			console.log(base64String);
            this.setState({
                img: base64String
            });
        });
      }
    });
  }
  render() {
    return(
    		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
				<LinearGradient
                    colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201','#94D600', '#76C201', '#94D600', '#76C201']}
                    style={{ height: Header.HEIGHT}}
                  >
          <Toolbar
              iconSet="MaterialCommunityIcons"
              centerElement="Evenement aanmaken"
              leftElement={("arrow-left")}
              onLeftElementPress={() => this.props.navigation.dispatch(NavigationActions.back())}
          />
        </LinearGradient>
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
									Start: {this.state.beginText}
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
                            <TouchableOpacity
                                style={styles.imgSel}
                                onPress={this.pickImageHandler}
                            >
                            <Image
                                style={{width: 100, height: 100}}
                                source={this.state.pickedImage}
                            />
                            </TouchableOpacity>



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
