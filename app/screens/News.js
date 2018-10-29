import React, {Component} from 'react';
import {
    Alert,
    Animated,
    Button,
    Dimensions,
    Divider,
    FlatList,
    Image,
    ImageBackground,
    ListView,
    RefreshControl,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from 'react-native';
import { DrawerActions, NavigationActions, Header } from 'react-navigation';
import usernameImg from '../assets/Username.png';
import passwordImg from '../assets/Password.png';
import { FormInput } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-material-textfield';
import BottomSheet from 'react-native-js-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {PacmanIndicator} from 'react-native-indicators';
import FlashMessage, {showMessage} from "react-native-flash-message";
import {Toolbar} from 'react-native-material-ui';
import Api from '../config/api.js';

var startNum = 0;
var endNum = 2;
var start = startNum;
var end = endNum;

var filterOptions = [
    {
        icon: (
            <Text style={{ fontWeight: "bold" }}>
                Filter op evenementen met begeleider
            </Text>
        )
    }
];

var checks = [];

class News extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: null,
            adminArray: [],
            checkMap: new Map(),
            loading: true,
            refreshing: false,
            sleeping: false,
            data: [],
            slicedArray: [],
            fullArray: []
        }

        let api = Api.getInstance();
        api.callApi("api/getAllNewsItems", "GET", {}, response => {
            if (response["responseCode"] != 503) {
                if (response["responseCode"] == 200) {

                    this.setState({
                        data: response['news'].slice(start, end),
                        fullArray: response['news'],
                        loading: false
                    });
                }
            } else {
                this.setState({sleeping: true});
                setTimeout(() => {
                    this.setState({sleeping: false, loading: false});
                }, 3000);
            }
        });


    }


    componentDidMount() {
        // this.onLoad();
        // this.props.navigation.addListener('willFocus', this.onLoad)
    }

    errorMessage(msg) {
        showMessage({
            message: msg,
            type: "danger",
            duration: 3000,
        });
    }

    onLoad = () => {
        this.refresh();
    }

    handleSearch() {
        this.setState({loading: true})
        let api = Api.getInstance();
        userData = {
            searchString: this.state.search
        }
        api.callApi('api/searchNews', 'POST', userData, response => {
            if (response['responseCode'] != 503) {
                if (response['responseCode'] == 200) {

                    this.setState({
                        firstLoading: false,
                        data: response['news'],
                        uploading: false,
                        loading: false
                    });
                }
            } else {
                this.setState({sleeping: true})
                setTimeout(() => {
                    this.setState({sleeping: false})
                }, 3000);
                this.errorMessage("Zorg ervoor dat u een internet verbinding heeft")
            }
        });
    }

  _onRefresh = () => {
    this.setState({ refreshing: true, sleeping: false, loading: true });
    this.refresh();
  };

    refresh() {
        startNum = 0;
        endNum = 2;
        start = startNum;
        end = endNum;
        if (!this.state.sleeping) {
            let api = Api.getInstance();
            api.callApi("api/getAllNewsItems", "GET", {}, response => {
                if (response["responseCode"] != 503) {
                    if (response["responseCode"] == 200) {

                        this.setState({
                            firstLoading: false,
                            data: response['news'].slice(start, end),
                            fullArray: response['news'],
                            uploading: false,
                            loading: false
                        });
                    }
                } else {
                    this.setState({sleeping: true});
                    setTimeout(() => {
                        this.setState({sleeping: false});
                    }, 3000);
                    this.errorMessage("Zorg ervoor dat u een internet verbinding heeft");
                }
            });
        }
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
    }

    handelEnd = () => {
        let api = Api.getInstance();
        if (end <= this.state.fullArray.length) {
            end += 2;
            start += 2;
            // alert(end + " " + this.state.data.length);
            api.callApi('api/getAllNewsItems', 'GET', {}, response => {
                console.log(response);
                if (response['responseCode'] == 200) {

                    this.setState({

                        data: [...this.state.data, ...response['news'].slice(start, end)]

                    });
                }
            });
        }

    };

    handelEnd = () => {
        let api = Api.getInstance();
        if (end <= this.state.fullArray.length) {
            end += 2;
            start += 2;
            // alert(end + " " + this.state.data.length);
            api.callApi('api/getAllNewsItems', 'GET', {}, response => {
                console.log(response);
                if (response['responseCode'] == 200) {

                    this.setState({

                        data: [...this.state.data, ...response['news'].slice(start, end)]

                    });
                }
            });
        }

    };

    render() {
        return (
            <ImageBackground blurRadius={0} source={require('../assets/Bslim_Background.jpg')}
                             style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>
                <LinearGradient
                    colors={['#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201', '#94D600', '#76C201']}
                    style={{height: Header.HEIGHT}}
                >
                    <Toolbar
                        centerElement={"Nieuws"}
                        searchable={{
                            autoFocus: true,
                            placeholder: 'Zoeken',
                            onChangeText: (text) => this.setState({search: text}),
                            onSubmitEditing: () => {
                                this.handleSearch()
                            }
                        }}
                    />
                </LinearGradient>
                {!this.state.loading &&
                <View>

                    <FlatList
                        data={this.state.data}
                        keyExtractor={item => item.title}
                        initialNumToRender={2}
                        // windowSize={2}
                        // maxToRenderPerBatch={4}
                        onEndReachedThreshold={0.6}
                        onEndReached={() => this.handelEnd()}
                        contentContainerStyle={{paddingTop: 20, paddingBottom: 60}}
                        refreshControl={
                            <RefreshControl
                                colors={['#94D600']}
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        style={{paddingTop: 10, marginBottom: 55}}
                        renderItem={({item}) => (
                            <View style={styles.container}>
                                <View style={styles.card} elevation={5}>
                                    <View style={{
                                        backgroundColor: 'rgba(52, 52, 52, 0,8)',
                                        paddingBottom: 0,
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                    }}>
                                        <TouchableHighlight
                                            onPress={() => this.props.navigation.navigate('NewsDetail', {
                                                title: item.title,
                                                content: item.desc,
                                                link: item.link,
                                                img: item.url
                                            })}>
                                            <ImageBackground
                                                source={{uri: item.url}}
                                                resizeMode="cover"
                                                imageStyle={{borderRadius: 10}}
                                                style={{width: '100%', height: 250,}}>
                                                <View style={{
                                                    height: '38%',
                                                    width: '100%',
                                                    backgroundColor: '#00000080',
                                                    position: "absolute",
                                                    bottom: 0,
                                                    borderRadius: 10
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        margin: 20,
                                                        marginTop: 7,
                                                        marginBottom: 40
                                                    }}>
                                                        <Text
                                                            style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>
                                                            {item.title}
                                                        </Text>
                                                    </View>
                                                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 10}}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 15,
                                                            color: '#BDBDBD',
                                                            position: "absolute",
                                                            right: 10
                                                        }}>
                                                            lees verder
                                                        </Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>
                                        </TouchableHighlight>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,

                                        }}>
                                        </View>
                                    </View>
                                </View>
                            </View>)}
                    />
                </View>}
                {this.state.loading &&
                <PacmanIndicator color='#94D600'/>
                }
                <FlashMessage position="top" style={{marginTop: Header.HEIGHT}}/>
            </ImageBackground>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
		justifyContent: 'center',
        marginBottom: 15,

    },

    card: {
		color: 'rgba(52, 52, 52, 1.0)',
		margin: 10,
        marginBottom:10,
	    // android (Android +5.0)
	    elevation: 3,
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
    color: 'rgba(52, 52, 52, 1.0)',
  },
})


export default News;
