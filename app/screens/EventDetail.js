import React, {
    Component
} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
	StyleSheet,
	ImageBackground,
	Dimensions,
	Share,
	Linking,
	Platform,
	WebView,
	TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions, Header } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import stylesCss from '../assets/css/style.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ScannerQR from './ScannerQR.js';
import ConfettiView from 'react-native-confetti-view';
import CardFlip from 'react-native-card-flip';
import Api from '../config/api.js';
import Maps from '../config/maps.js';

import LocalStorage from '../config/localStorage.js';
import HTML from 'react-native-render-html';
import ImageSlider from 'react-native-image-slider';
import {PacmanIndicator} from 'react-native-indicators';
import MyWebView from 'react-native-webview-autoheight';
import LinearGradient from 'react-native-linear-gradient';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

const MapHtml = require('../assets/mapHTML.html');


class EventDetail extends Component {



constructor() {
	super();
	this.state = {
		map: true,
		title: '',
		content: '',
		url: '',
		start: '',
		end: '',
		author: '',
		loading: false,
		deelnemer: false,
		scroll: true
	}
	let days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
	let months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
}

componentDidMount() {
	const { navigation } = this.props;
	this.setState({	eventId: navigation.getParam('id', ''),
					title: navigation.getParam('title', ''),
					profilePicture: navigation.getParam('profilePicture', ''),
					author: navigation.getParam('author', ''),
					content: navigation.getParam('content', ''),
					url: navigation.getParam('url', ''),
					start: navigation.getParam('start', ''),
					end: navigation.getParam('end', ''),
					created: navigation.getParam('created', ''),
					link: navigation.getParam('link', ''),
					img: navigation.getParam('img', ''),
					location: navigation.getParam('location', ''),
					subscribed: navigation.getParam('subscribed', '')
				});
  }

  render() {
  	let map = Maps.getInstance()
    return(
		<ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%'}}>
			<LinearGradient
                        colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201','#94D600', '#76C201', '#94D600', '#76C201']}
                        style={{ height: Header.HEIGHT}}
                      >
			<Toolbar
				iconSet="MaterialCommunityIcons"
				centerElement={this.state.title}
				leftElement={("arrow-left")}
				onLeftElementPress={() => this.props.navigation.goBack()}
			/>
			</LinearGradient>
		{this.state.loading &&
			<PacmanIndicator color='white'  />
		}
		{!this.state.loading &&
		  <View style={styles.cardContainer} >
          <View style={styles.card} elevation={5}>
          <ScrollView scrollEnabled={this.state.scroll}
						style={{height: Dimensions.get('window').height -160, borderRadius: 10,}}>
                <View style={styles.cardTitle} elevation={5}>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, width: '100%'}}>
					<Image
						source={{uri: this.state.profilePicture}}
						resizeMode="cover"
						style={{width: 50, height: 50, borderRadius: 10}}
					/>
						<View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
							<Text
							style={{
								fontWeight: 'bold',
								fontSize: 18,
								color: 'black'
							}}>
								{this.state.author}
							</Text>
							<Text style={{fontSize: 14, color: 'black'}}>
								{this.state.created}
							</Text>
						</View>
					</View>
                </View>
				<View style={{widht: '100%', height: 200, paddingBottom: 10}}>
				<Image
					source={{uri: this.state.img}}
					resizeMode="cover"
					style={{width: '100%', height: 200}}
				  />
				</View>


                <HTML onLinkPress={(evt, href) => { Linking.openURL(href); }} containerStyle={{marginLeft: 10, marginRight: 10}} ignoredTags={['img']} html={this.state.content} imagesMaxWidth={Dimensions.get('window').width } />
                <View style={{margin: 10,}}>
					<Text style={{fontWeight: 'bold'}}>
					Begin: {this.state.start}
					</Text>
					<Text style={{fontWeight: 'bold'}}>
					Eind: {this.state.end}
					</Text>
					<Text style={{fontWeight: 'bold'}}>
					Locatie: {this.state.location}
					</Text>

                </View>

				<View  style={{width: '100%', height: 200}}>
				<MyWebView
				source={{html: map.getMap(this.state.location)}}
				  style={{flex: 1, width: '100%', height: 200}}
				 />
				</View>
				<View style={{flexDirection: 'row'}}>
					{ !this.state.subscribed && 
						<Button
								style={{
									container: {
										margin: 10,
											borderRadius: 10,
											backgroundColor: 'green'
									},
									text: {
										color: 'white'
									}
								}}
                              	onPress={() => {
                                	let api = Api.getInstance();
                                	let localStorage = LocalStorage.getInstance();
                                	localStorage.retrieveItem("userId").then(id => {
                                	  if (id != null) {
                                	    userData = {
                                	      eventId: this.state.eventId,
                                	      personId: id
                                	    };
                                	    api.callApi("api/subToEvent","POST",userData, response => {
                                	        if (response["responseCode"] == 200) {
                                	          alert(
                                	            "Je hebt je aangemeld voor dit evenement"
                                	          );
                                	          this.setState({subscribed: true})
                                	        } else if (response["responseCode"] == 400) {
                                	          alert("Je bent al aangemeld");
                                	        } else {
                                	          alert("Er is wat fout gegaan");
                                	        }
                                	      }
                                	    );
                                	  } else {
                                	    this.props.navigation.navigate(
                                	      "LoginScreen"
                                	    );
                                	  }
                                	});
                              }	}
                              text="Aanmelden"
                           />}
                        { this.state.subscribed &&
                            <Button
								style={{
									container: {
										margin: 10,
											borderRadius: 10,
											backgroundColor: 'green'
									},
									text: {
										color: 'white'
									}
								}}
                          		onPress={() => {
                            		let api = Api.getInstance();
                            		let localStorage = LocalStorage.getInstance();
                            		localStorage.retrieveItem("userId").then(id => {
                            		  if (id != null) {
                            		    userData = {
                            		      eventId: this.state.eventId,
                            		      personId: id
                            		    };
                            		    api.callApi("api/unSubToEvent","POST",userData,response => {
                            		        if (response["responseCode"] == 200) {
                            		          alert(
                            		            "Je hebt je afgemeld voor dit evenement"
                            		          );
                            		          this.setState({subscribed: false})
                            		        } else if (
                            		          response["responseCode"] == 400
                            		        ) {
                            		          alert("Je bent al afgemeld");
                            		        } else {
                            		          alert("Er is wat fout gegaan");
                            		        }
                            		      }
                            		    );
                            		  } else {
                            		    this.props.navigation.navigate(
                            		      "LoginScreen"
                            		    );
                            		  }
                            		});
                              }	}
                              text="Afmelden"
                            /> }
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: 'green'
								},
								text: {
									color: 'white'
								}
							}}
						 	text="Delen"
							onPress={() => Share.share({
								message: 'Binnenkort organiseert bslim: ' + this.state.title + '. Voor meer informatie ga naar: ' + this.state.link
  							})} />
						<Button
							style={{
								container: {
									margin: 10,
										borderRadius: 10,
										backgroundColor: 'green'
								},
								text: {
									color: 'white'
								}
							}}
						 	text="Route"
							onPress={() => Linking.openURL(Platform.OS === 'ios' ? 'maps:' : 'geo:' + this.state.lat + ',' + this.state.long)} />
				</View>
			</ScrollView>
            </View>
          </View>
	  }
		</ImageBackground>
    );
  }
}



const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 150

    },

    card: {
    	backgroundColor: 'white',
    	margin: 10,
		marginBottom: 0,
    	borderRadius: 10,
    	shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

    cardTitle: {
        flexDirection: 'row',
		width: Dimensions.get('window').width,
        margin: 0,
        padding: 0,
    },
})


export default EventDetail;
