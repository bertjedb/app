import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Divider,
    ScrollView,
    Button,
    ListView,
	TouchableHighlight,
	Share,
	Dimensions,
	RefreshControl
} from 'react-native';
import {DrawerActions, NavigationActions, Header} from 'react-navigation';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import {COLOR, ThemeContext, getTheme, Toolbar, Card,Checkbox, Drawer} from 'react-native-material-ui';
import stylesCss from '../assets/css/style.js';
import Modal from "react-native-modal";
import HTML from 'react-native-render-html';
import {BarIndicator} from 'react-native-indicators';
import {PacmanIndicator} from 'react-native-indicators';

import Api from '../config/api.js';
import LocalStorage from '../config/localStorage.js';
import BottomSheet from "react-native-js-bottom-sheet";
import LinearGradient from 'react-native-linear-gradient';
import LocalStorage from "../config/localStorage";



var capitalize = require('capitalize')

const uiTheme = {
    palette: {
        primaryColor: '#3bb222',
    },
    toolbar: {
        container: {
            height: 60,
        },
    },
};

let months = {'Jan': 'Jan',
              'Feb': 'Feb',
              'Mar': 'Mrt',
              'Apr': 'Apr',
              'May': 'Mei',
              'Jun': 'Jun',
              'Jul': 'Jul',
              'Aug': 'Aug',
              'Sep': 'Sep',
              'Oct': 'Okt',
              'Nov': 'Nov',
              'Dec': 'Dec'};


class Events extends Component {

    constructor() {
        super() ;

        this.state = {
            dataSource: null,
            eventArray: [],
            modalVisible: false,
            adminArray: [],
            checkMap: new Map(),
            search: '',
            refreshing: false,
            search: '',
            loading: true,
            check: false
        };

        let api = Api.getInstance()
        api.callApi('api/getAllEvents', 'POST', {}, response => {
            if(response['responseCode'] == 200) {
                 let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });

                let array = response['events'];
                for(let index=0; index < array.length; index++) {
                    let localStorage = LocalStorage.getInstance();
                    localStorage.retrieveItem('userId').then((id) => {
                        if(id != null) {
                            userData = {
                                "eventId": response['events'][index]['id'],
                                "personId": id
                            }
                            api.callApi('api/checkSub', 'POST', userData, response => {
                                array[index]['subscribed'] = response['found']
                            });
                        }
                        this.setState({
                            uploading: false,
                            dataSource: ds.cloneWithRows(array),
                        });
                    });
                }

            }
        });
    }

  hideSplashScreen() {
    this.setState({
      splashScreenVisible: false
    });
  }

  componentDidMount() {
    //
    // setTimeout(function(){
    //   this.hideSplashScreen();
    // }, 5000)
    setTimeout(() => {
      this.setState({loading: false})
    }, 5000);
    this.onLoad();
    this.props.navigation.addListener('willFocus', this.onLoad)
    this.getAdmins();
  }

    onLoad = () => {
    this.refresh();
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.refresh();
  }

    refresh(){
        let api = Api.getInstance()
        api.callApi('api/getAllEvents', 'POST', {}, response => {
            if(response['responseCode'] == 200) {
                 let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                let array = response['events'];
                for(let index=0; index < array.length; index++) {
                    let localStorage = LocalStorage.getInstance();
                    localStorage.retrieveItem('userId').then((id) => {
                        if(id != null) {
                            userData = {
                                "eventId": response['events'][index]['id'],
                                "personId": id
                            }
                            api.callApi('api/checkSub', 'POST', userData, response => {
                                array[index]['subscribed'] = response['found'];
                                this.setState({
                                    uploading: false,
                                    dataSource: ds.cloneWithRows(array),
                                });
                            });
                        }
                    });
                }
            }
        });
    }
    showFilter() {
		this.setState({modalVisible: !this.state.modalVisible});
    };

 


 handleSearch() {
    let api = Api.getInstance();
    userData = {
        searchString: this.state.search
    }
    api.callApi('api/searchEvent', 'POST', {}, response => {
            if(response['responseCode'] == 200) {
                 let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                let array = response['events'];
                for(let index=0; index < array.length; index++) {
                    let localStorage = LocalStorage.getInstance();
                    localStorage.retrieveItem('userId').then((id) => {
                        if(id != null) {
                            userData = {
                                "eventId": response['events'][index]['id'],
                                "personId": id
                            }
                            api.callApi('api/checkSub', 'POST', userData, response => {
                                array[index]['subscribed'] = response['found'];
                                this.setState({
                                    uploading: false,
                                    dataSource: ds.cloneWithRows(array),
                                });
                            });
                        }
                    });
                }
            }
        });

  getAdmins() {
    api = Api.getInstance();
    api.callApi('api/getAllAdmins', 'POST', {}, response => {
      if(response['responseCode'] == 200) {
            // for(admin in response['admins']){
            //   console.log("ADMIN :::::::::::" + admin)
            //   this.adminArray.push(admin);
            // }
            // }
            // return response['admins'];
          this.setState({
            adminArray: response['admins']
          })
          this.initFilterOptions();

        }
      })
  }

    render() {
        return(
          <View>
				{this.state.loading &&
					<BarIndicator color='white' />

				}
				{!this.state.loading &&
          <ImageBackground  blurRadius={0} source={require('../assets/background.jpg')} style={{width: '100%', height: '100%'}}>
            <LinearGradient
              colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201','#94D600', '#76C201', '#94D600', '#76C201']}
              style={{ height: Header.HEIGHT}}
             >
              <Toolbar
                  centerElement={"Evenementen"}
                  searchable={{
                      autoFocus: true,
                      placeholder: 'Zoeken',
                      onChangeText: (text) => this.setState({search : text}),
                      onSubmitEditing: () => {this.handleSearch()}
                  }}
              />
            </LinearGradient>
				<View >
        <View style={{marginTop: 120, borderRadius: 10, margin: 0, height: '100%', backgroundColor: 'white'}}>
          <View>
            </View>
                {
                    this.state.dataSource != null &&
                    <ListView
					   contentContainerStyle={{paddingTop: 20}}
						refreshControl={
					          <RefreshControl
							  colors={['#94D600']}
					            refreshing={this.state.refreshing}
					            onRefresh={this._onRefresh}
					          />
					        }
                        dataSource={this.state.dataSource}
						style={{paddingTop: 10, marginBottom: 55}}
                        renderRow={(rowData) =>
                           <View style={styles.container}>
                                <View style={styles.card} elevation={5}>


                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10}}>
									<Image
										source={{uri: rowData.photo[0]}}
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
                                                {capitalize.words(rowData.leader[0][0]) + ' ' + capitalize.words(rowData.leader[2][0])}
                                            </Text>
                                            <Text style={{fontSize: 14, color: 'black'}}>
                                                {rowData.created}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        backgroundColor: 'white',
                                        paddingBottom: 25,
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}>
                                        <TouchableHighlight
                                            onPress={() => this.props.navigation.navigate('EventDetail', {
                                                title: capitalize.words(rowData.name.toString().replace(', ,', ' ')),
                                                profilePicture: rowData.photo[0],
                                                content: rowData.desc,
                                                start: rowData.begin + ' ' + rowData.beginMonth + ' ' + rowData.beginTime,
                                                end: rowData.end + ' ' + rowData.endMonth + ' ' + rowData.endTime,
                                                created: rowData.created,
                                                author: capitalize.words(rowData.leader[0][0].replace(', ,', ' ')),
                                                link: rowData.link,
                                                img: rowData.img,
                                                location: rowData.location,
                                            })}
                                        >
                                        <Image
                                            source={{uri: rowData.img}}
                                            resizeMode="cover"
                                            style={{width: '100%', height: 200}}
                                        />
                                        </TouchableHighlight>
                                        <View style={{flex: 1, flexDirection: 'row', width: '80%'}} >
                                            <View style={{
                                                minWidth: 50,
                                                maxHeight: 50,
                                                backgroundColor: '#F27B13',
                                                marginTop: 10,
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                marginRight: 10
                                            }}>
                                                <View style={{flex: 1, flexDirection: 'column'}}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 16,
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        marginTop: 5
                                                    }}>
                                                        {rowData.begin}
                                                    </Text>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 16,
                                                        color: 'white',
                                                        textAlign: 'center'
                                                    }}>
                                                        { months[rowData.beginMonth]}
                                                    </Text>
                                                </View>

                                            </View>
                                            <View style={{
												                        marginTop: 10,
                                                marginRight: 10,
                                                marginBottom: 30,
                                                fontWeight: 'bold'
                                            }}>
                                                <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
												{capitalize.words(rowData.name.toString().replace(', ,', ' '))}
                                                </Text>
												<HTML tagsStyles={{ p: { textAlign: 'left', color: 'grey' } }} onLinkPress={(evt, href) => { Linking.openURL(href); }} ignoredTags={['img']} html={rowData.desc} imagesMaxWidth={Dimensions.get('window').width } />

                                            </View>

                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
				                            alignItems: 'center',
                                        }}>

										{ !rowData.subscribed && <TouchableHighlight
										  onPress={() => {
                                                    let api = Api.getInstance()
                                                    let localStorage = LocalStorage.getInstance();
                                                    localStorage.retrieveItem('userId').then((id) => {
                                                        if(id != null) {
                                                            userData = {
                                                            "eventId": rowData.id,
                                                            "personId": id
                                                        }
                                                        api.callApi('api/subToEvent', 'POST', userData, response=>{
                                                            if(response['responseCode'] == 200) {
                                                                alert("Je hebt je aangemeld voor dit evenement")
                                                                this.refresh();
                                                            } else if(response['responseCode'] == 400) {
                                                                alert("Je bent al aangemeld");
                                                            } else {
                                                                alert("Er is wat fout gegaan");
                                                            }
                                                        });
                                                        } else {
                                                            this.props.navigation.navigate('LoginScreen')
                                                        }    
                                                    });
								                }
                                            }
										  style={{width: '50%', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#93D500', borderBottomLeftRadius: 10}}>

										    <Text style={{color: 'white', fontWeight: 'bold'}} >AANMELDEN</Text>
										</TouchableHighlight> }
                                        { rowData.subscribed && <TouchableHighlight
                                          onPress={() => {
                                                    let api = Api.getInstance()
                                                    let localStorage = LocalStorage.getInstance();
                                                    localStorage.retrieveItem('userId').then((id) => {
                                                        if(id != null) {
                                                            userData = {
                                                            "eventId": rowData.id,
                                                            "personId": id
                                                        }
                                                        api.callApi('api/unSubToEvent', 'POST', userData, response=>{
                                                            if(response['responseCode'] == 200) {
                                                                alert("Je hebt je afgemeld voor dit evenement");
                                                                this.refresh();
                                                            } else if(response['responseCode'] == 400) {
                                                                alert("Je bent al afgemeld");
                                                            } else {
                                                                alert("Er is wat fout gegaan");
                                                            }
                                                        });
                                                        } else {
                                                            this.props.navigation.navigate('LoginScreen')
                                                        }  
                                                    });
                                                }
                                            }
                                          style={{width: '50%', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#93D500', borderBottomLeftRadius: 10}}>

                                            <Text style={{color: 'white', fontWeight: 'bold'}} >AFMELDEN</Text>
                                        </TouchableHighlight> }

										<TouchableHighlight
										    onPress={() => Share.share({
			      							    message: 'Binnenkort organiseert bslim: ' + capitalize.words(rowData.name.toString().replace(', ,', ' ')) + '. Voor meer informatie ga naar: ' + rowData.link
			  							  })}
										    style={{width: '50%', justifyContent: 'center', alignItems: 'center', padding: 10, backgroundColor: '#93D500', borderBottomRightRadius: 10}}>

										    <Text style={{color: 'white', fontWeight: 'bold'}}>DELEN</Text>
										</TouchableHighlight>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                }
				</View>

        </View>
        </ImageBackground>

			}
      {this.state.loading &&
				<View style={{paddingBottom: 150, justifyContent: 'center', alignItems: 'center', widht: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: '#94D600'}}>
				<Image  style = {{width: 350, height: 225, marginTop: '10%'}}
							source = {require('../assets/logo.png')}
							/>
				<PacmanIndicator color='white'  />
				</View>
			    }
</View>

        );
    }
}



const styles = StyleSheet.create({
  splashScreen: {
    backgroundColor: 'blue',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay:{
    position: 'absolute',
    top: 58,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  overlay2:{
    position: 'absolute',
    top: 58,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      marginBottom:20
  },
  card: {
      backgroundColor: 'white',
      marginTop:0,
      marginBottom: 20,
      borderRadius: 10,
      marginLeft: 10,
      marginRight: 10,
      shadowOffset: {width: 0, height: 13},
      shadowOpacity: 0.3,
      shadowRadius: 6,

      // android (Android +5.0)
      elevation: 3,
  },
  video: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
  },
  logo: {
      height: 250,
      width: 300,
      resizeMode: 'contain',
  },
  loginButton: {
      margin: 5,
      backgroundColor: '#FF6700',
      padding: 10,
      borderRadius: 10,
      overflow: 'hidden'
  },
  loginButtonText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'white',
  },
})


export default Events;
