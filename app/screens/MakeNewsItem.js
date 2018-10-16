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
import { Button } from 'react-native-material-ui';
import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImgToBase64 from 'react-native-image-base64';

export default class MakeNewsItem extends Component {

  constructor() {
    super();
	this.state = {
		title: '',
  	content: '',
    pickedImage: { uri: '' },
    imgPicked: false,
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

  createWPArticle(){
	  fetch("http://gromdroid.nl/bslim/wp-json/gaauwe/v1/create-post", {
		  method: 'POST',
		  headers: new Headers({
			  'Accept': 'application/json',
  'Content-Type': 'application/json'
		    }),
			body: JSON.stringify({
            title: this.state.title,
            content: '<p>' + this.state.content + '</p><img src="' + this.state.img + '" alt="Image" />',
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

  createArticle() {

  	if(this.state.title != '' &&
       this.state.title.length <= 30 &&
  	   this.state.content != '' &&
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
				//this.createWPArticle();
				let localStorage = LocalStorage.getInstance();
	  			let points = localStorage.retrieveItem('userId').then((id) => {
	  			if(id != null) {
	  				let userData = {
	  					title: this.state.title,
	  					content: this.state.content,
              img: this.state.img
	  				}
	                let api = Api.getInstance();
	  				api.callApi('api/createNewsItem', 'POST', userData, response => {
	        		    if(response['responseCode'] == 200) {
	                        this.setState({
	                            title: '',
	                            content: '',
	                            pickedImage: { uri: '' },
                              img: '',
	                        });
	                        this.successMessage("Er is een nieuw artikel aangemaakt!");
	        		    } else {
	                        console.log(response);
	        		    	this.errorMessage("Er is wat fout gegaan");
	        		    }
	        		});

	            }});
			})

   			.catch((error) => {
   				callBack(error);
   			})
    } else if(this.state.content != '' &&
       this.state.pickedImage.uri != '' &&
       this.state.title.length > 30){
         this.errorMessage("De titel mag maximaal 30 characters lang zijn!")
       }

    else {
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
				<View style={styles.container}>
					<View style={styles.cardGreen} elevation={5}>
						<Text style={{margin: 15, fontWeight: 'bold', fontSize: 24, color: 'white'}}>
          					Nieuws artikel aanmaken
          				</Text>
          				<View style={{backgroundColor: 'white', paddingLeft: 15, paddingRight: 15, paddingBottom: 15, paddingTop: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,}}>
          				<Text style={{marginTop: 10}}>
          					Hier kun je een nieuws artikel aanmaken
          				</Text>
							<TextField
								textColor='green'
             					tintColor='green'
             					baseColor='green'
		  						label="Titel"
          						value={ this.state.title }
          						onChangeText={ title => this.setState({title}) }
							/>

							<TextField
								textColor='green'
             					tintColor='green'
             					baseColor='green'
		  						label="Content"
          						value={ this.state.content }
          						onChangeText={ content => this.setState({content}) }
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
      					onPress={() => this.createArticle()}
  					  />
						</View>
					</View>
				</View>
        		<FlashMessage position="top" />
			</ImageBackground>
    );
  }
}
