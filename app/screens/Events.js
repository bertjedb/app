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
    ListView
} from 'react-native';
import {DrawerActions, NavigationActions} from 'react-navigation';
import UserInput from './UserInput';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-af-video-player'
import { TextField } from 'react-native-material-textfield';
import {COLOR, ThemeContext, getTheme, Toolbar, Card} from 'react-native-material-ui';
import stylesCss from '../assets/css/style.js';

import Api from '../config/api.js';

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

class Events extends Component {

    constructor() {
        super() ;

        this.state = {
            dataSource: null,
            eventArray: []
        };
        let api = Api.getInstance()
        api.callApi('api/getAllEvents', 'POST', {}, response => {
            if(response['responseCode'] == 200) {
                console.log(response);
                 let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({
                    dataSource: ds.cloneWithRows(response['events']),
                });
            }
        });
    }

  componentDidMount() {
    this.onLoad();
    this.props.navigation.addListener('willFocus', this.onLoad)
  }

    onLoad = () => {
    this.refresh();
  }

    refresh(){
        let api = Api.getInstance()
        api.callApi('api/getAllEvents', 'POST', {}, response => {
            if(response['responseCode'] == 200) {
                let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState({
                    firstLoading: false,
                    dataSource: ds.cloneWithRows(response['events']),
                    uploading: false,
                });
            }
            })
    }


    render() {
        return(
            <ImageBackground blurRadius={3} source={require('../assets/sport_kids_bslim.jpg')} style={{width: '100%', height: '100%',paddingBottom:'8%'}}>
                {
                    this.state.dataSource != null &&
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                           <View style={styles.container}>
                                <View style={styles.card} elevation={5}>
                                    <View style={{flex: 1, flexDirection: 'row', margin: 10, marginBottom: 20}}>
                                        <Image
                                            source={{uri:rowData.photo[0]}}
                                            style={{width: 60, height: 60, borderRadius: 10}}
                                        />
                                        <View style={{flex: 1, flexDirection: 'column', marginLeft: 8}}>
                                            <Text style={{
                                                marginBottom: 3,
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: 'black'
                                            }}>
                                                {rowData.leader}
                                            </Text>
                                            <Text style={{fontSize: 16, color: 'black'}}>
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
                                        <Image
                                            source={{uri:rowData.img}}
                                            resizeMode="cover"
                                            style={{width: '100%', height: 200}}
                                        />
                                        <View style={{flex: 1, flexDirection: 'row', width: '80%'}} >
                                            <View style={{
                                                minWidth: '18%',
                                                maxHeight: '60%',
                                                backgroundColor: '#F27B13',
                                                marginTop: 10,
                                                borderRadius: 5,
                                                marginLeft: 5,
                                                marginRight: 5
                                            }}>
                                                <View style={{flex: 1, flexDirection: 'column'}}>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 16,
                                                        color: 'white',
                                                        textAlign: 'center',
                                                        marginTop: 9
                                                    }}>
                                                        {rowData.begin}
                                                    </Text>
                                                    <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 16,
                                                        color: 'white',
                                                        textAlign: 'center'
                                                    }}>
                                                        {rowData.beginMonth}
                                                    </Text>
                                                </View>

                                            </View>
                                            <View style={{
                                                margin: 5,
                                                marginLeft: 1,
                                                marginBottom: 30,
                                                fontWeight: 'bold'
                                            }}>
                                                <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
                                                    {rowData.name}
                                                </Text>
                                                <Text numberOfLines={3} ellipsizeMode="tail" style={{fontSize: 12}}>
                                                    {rowData.desc}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0
                                        }}>
                                            <View
                                                style={{width: '50%', borderRightWidth: 1, borderBottomLeftRadius: 40}}>
                                                <Button color='#93D500' title="Aanmelden" style={{}}/>
                                            </View>
                                            <View style={{width: '50%'}}>
                                                <Button color='#93D500' title="Delen"
                                                        style={{borderBottomRightRadius: 10}}/>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    />
                }

            </ImageBackground>


        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
