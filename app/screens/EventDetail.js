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
	Animated,
	ListView,

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
import ImageOverlay from "react-native-image-overlay";
import * as Animatable from 'react-native-animatable';

import {
    COLOR,
    ThemeContext,
    getTheme,
    Toolbar,
    Card,
    Button,
} from 'react-native-material-ui';

const MapHtml = require('../assets/mapHTML.html');
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Header.HEIGHT;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

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
	  scroll: true,
	  scrollOpacity: 'rgba(148, 214, 10, 0)',
	  scrollHeight: '40%',
	  scrollBlur: 0,
	  scrollY: new Animated.Value(0),
  }
  let days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  let months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

}
handleScroll(event) {
	this.setState({
		scrollOpacity: 'rgba(148, 214, 10, '+ this.state.scrollY/150+')',
		scrollHeight:  ''+ ((((event.nativeEvent.contentOffset.y/150))*40) +40) +'%',
		scrollBlur: (event.nativeEvent.contentOffset.y/450),
	})
}

  render() {
	  const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

	  let map = Maps.getInstance()
	  const { navigation } = this.props;

	  const title = navigation.getParam('title', '');
	  const content = navigation.getParam('content', '');
	  const url = navigation.getParam('url', '');
	  const start = navigation.getParam('start', '');
	  const end = navigation.getParam('end', '');
	  const created = navigation.getParam('created', '');
	  const author = navigation.getParam('author', '');
	  const profilePicture = navigation.getParam('profilePicture', '');
	  const link = navigation.getParam('link', '');
	  const img = navigation.getParam('img', '');
	  const location = navigation.getParam('location', '');
	  /*
	  const participants = navigation.getParam("participants", "");
	      const ds = new ListView.DataSource({
	        rowHasChanged: (r1, r2) => r1 !== r2
	      });
	  this.state = {
	        dataSource: ds.cloneWithRows(participants)
	      };
		  */
    return(
		<View style={{width: '100%', height: '100%', backgroundColor: '#DCDCDC'}}>
		<Animated.View
		style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
		>
		<ImageOverlay source={require('../assets/basketbal_kids_bslim.jpg')} overlayColor='black' overlayAlpha={0.3} containerStyle={{height: '100%',}}/>
		<Animated.View style={{position: 'absolute', top: 225, left: 20, opacity: this.state.scrollY.interpolate({
  		inputRange: [0, 250],
  		outputRange: [1, 0]
  	})}}>
		<Text style={{fontSize: 32, fontWeight: 'bold', color: 'white', paddingBottom: 10}}>Basketbal</Text>

		</Animated.View>

		</Animated.View>
		<Animated.View style={[styles.headerTitle, {
          opacity: this.state.scrollY.interpolate({
			inputRange: [0, 150],
			outputRange: [0, 1]
		}),
	}]}>
	<Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', position: 'absolute',
	top: 15,
	left: 50,}}>Basketbal</Text>
	</Animated.View>
	<Toolbar
		style={styles.headerTitle}
		iconSet="MaterialCommunityIcons"
		centerElement=""
		leftElement={("arrow-left")}
		rightElement={("share-variant")}
		onLeftElementPress={() => this.props.navigation.goBack()}
	/>
			<Animated.ScrollView style={styles.cardContainer} scrollEventThrottle={16}
			scrollEventThrottle={1}
	  onScroll={Animated.event(
		[{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
		{
            listener: (event)=>{
				this.setState({
					scrollOpacity: 'rgba(148, 214, 10, '+ event.nativeEvent.contentOffset.y/150+')',
				})
            },
            useNativeDriver: true
        }
	  )}>
            <Animatable.View delay={0} animation="lightSpeedIn" iterationCount={1} style={styles.cardTop} elevation={5}>

                  <View style={styles.cardTitle} elevation={5}>
  					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, marginBottom: 0, width: '100%'}}>
  					<Image
  						source={{uri: profilePicture}}
  						resizeMode="cover"
  						style={{width: 50, height: 50, borderRadius: 50}}
  					/>
  						<View style={{flex: 1, flexDirection: 'column', marginLeft: 10}}>
  							<Text
  							style={{
  								fontWeight: 'bold',
  								fontSize: 18,
  								color: 'black'
  							}}>
  								{author}
  							</Text>
  							<Text style={{fontSize: 14, color: 'black'}}>
  								{created}
  							</Text>
  						</View>
  					</View>
                  </View>
  				<View style={{backgroundColor: '#DCDCDC', width: '94%', height: 1, margin: 10}}/>
				<View style={{flexDirection: 'row', alignItems: 'center',}}>
				<Image
					source={require('../assets/klimmen_kids_bslim.jpg')}
					resizeMode="cover"
					style={{width: 50, height: 50, borderRadius: 10, margin: 10, marginRight: 0}}
				/>
				<Image
					source={require('../assets/frisbee_kids_bslim.jpg')}
					resizeMode="cover"
					style={{width: 50, height: 50, borderRadius: 10, margin: 10, marginRight: 0}}
				/>
				<Image
					source={require('../assets/basketbal_kids_bslim.jpg')}
					resizeMode="cover"
					style={{width: 50, height: 50, borderRadius: 10, margin: 10, marginRight: 0}}
				/>
				<Image
					source={require('../assets/sport_kids_bslim.jpg')}
					resizeMode="cover"
					style={{width: 50, height: 50, borderRadius: 10, margin: 10, marginRight: 0}}
				/>
				<ImageBackground
					blurRadius={3}
					style={{width: 50, height: 50, borderRadius: 10, margin: 10, marginRight: 0}}
					imageStyle={{ borderRadius: 10 }}
					source={require('../assets/klimmen_kids_bslim.jpg')}
				>
					<View style={{justifyContent: 'center', alignItems:'center',borderRadius: 10, with: '100%', height: '100%', backgroundColor:'rgba(0,0,0,.3)'}}>
						<Text fontSize='18' style={{color: 'white'}}>+4</Text>
					</View>
				</ImageBackground>
				</View>

  				<View style={{backgroundColor: '#DCDCDC', width: '94%', height: 1, margin: 10}}/>

  				<View>
  				<Text style={{color: 'black', fontSize: 20, padding: 10}}>Kom jij ook?</Text>
  				<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
  					<Button
  						style={{
  							container: {
  								margin: 10,
  								padding: 5,
  									borderRadius: 10,
  									backgroundColor: '#18CE3A'
  							},
  							text: {
  								color: 'white'
  							}
  						}}
  						text="Aanmelden"
  						/>

  				</View>
  				</View>
              </Animatable.View>
			  <Animatable.View delay={500} animation="lightSpeedIn" iterationCount={1} style={styles.card} elevation={5}>
			  <Text style={{color: 'grey', fontSize: 20, padding: 10}}>Info</Text>
			  <View style={{flexDirection: 'row', alignItems: 'center',}}>
			  <Icon size={24} name={ 'calendar' } style={{ color: 'grey', paddingRight: 10, paddingLeft: 10}} />
			  <Text style={{fontSize: 16, color: 'grey'}}>26 Okt 2018</Text>
			  </View>
			  <View style={{flexDirection: 'row', alignItems: 'center',}}>
			  <Icon size={24} name={ 'map-marker' } style={{ color: 'grey', paddingRight: 10,  paddingLeft: 10}} />
			  <Text style={{fontSize: 16, color: 'grey'}}>Peizerweg 48</Text>
			  </View>
                    <HTML onLinkPress={(evt, href) => { Linking.openURL(href); }} containerStyle={{marginLeft: 10, marginRight: 10}} ignoredTags={['img']} html={content} imagesMaxWidth={Dimensions.get('window').width } />
                </Animatable.View>
				<Animatable.View delay={1000} animation="lightSpeedIn" iterationCount={1} style={styles.cardBottom} elevation={5}>

				<View  style={{width: '100%', height: 200, borderRadius: 10, overflow: 'hidden'}}>
				<MyWebView
				source={{html: map.getMap(location)}}
				  style={{flex: 1, width: '100%', height: 200, borderRadius: 10, overflow: 'hidden'}}
				 />
				</View>
				                  </Animatable.View>
								  <Animatable.View
						            delay={500}
						            animation="lightSpeedIn"
						            iterationCount={1}
						            style={styles.card}
						            elevation={5}
						          >
								  {/*
						            <ListView
						              style={styles.participantContainer}
						              dataSource={this.state.dataSource}
						              renderRow={rowData => (
						                <View>
						                  <View
						                    style={{
						                      borderBottomColor: "black",
						                      borderBottomWidth: 1
						                    }}
						                  >
						                    <Text style={styles.text}>{rowData}</Text>
						                  </View>
						                </View>
						              )}
						            />
									*/}
						          </Animatable.View>
            </Animated.ScrollView>

		</View>
    );
  }
}



const styles = StyleSheet.create({

    cardContainer:{
    	height: Dimensions.get('window').height,
    	width: Dimensions.get('window').width,


    },

    card: {
    	backgroundColor: 'white',
		margin: 10,
    	borderRadius: 10,
    	shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

	headerTitle: {
			height: Header.HEIGHT,
			backgroundColor: '#94d60a',
			position: 'absolute',
		    top: 0,
		    left: 0,
		    right: 0,


	},

	header: {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    right: 0,
	    backgroundColor: '#03A9F4',
	    overflow: 'hidden',
	    height: HEADER_MAX_HEIGHT,
	  },

	cardTop: {
    	backgroundColor: 'white',
		marginLeft: 10,
		marginRight: 10,
		marginTop:250,
    	borderRadius: 10,
    	shadowOffset: {width: 0, height: 13},
        shadowOpacity: 0.3,
        shadowRadius: 6,

        // android (Android +5.0)
        elevation: 3,
    },

	cardBottom: {
    	backgroundColor: 'white',
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 65,
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

	participantContainer: {
    margin: "5%",
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fcd6e8",
    height: 500
  },
  participantField: {
    flex: 1,
    margin: "5%",
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "#fff"
  },
  participantRow: {
    flex: 1,
    padding: 12,
    flexDirection: "row"
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  }
})


export default EventDetail;
