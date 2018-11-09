import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Linking,
    ListView,
    Platform,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    WebView,
} from 'react-native';
import {PacmanIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import {Header, NavigationActions} from "react-navigation";
import {Toolbar,} from 'react-native-material-ui';
import * as capitalize from "capitalize";
import stylesCss from "../assets/css/style";
import Api from "../config/api";


const MapHtml = require('../assets/mapHTML.html');


class ProfilePage extends Component {


    constructor() {
        super();
        this.state = {
            data: []
        }

        // let api = Api.getInstance();
        // api.callApi("api/getAllSubs", "POST", {'id': id}, response => {
        //     if (response["responseCode"] != 503) {
        //         if (response["responseCode"] == 200) {
        //
        //             this.setState({
        //                 data: response['subs'],
        //             });
        //         }
        //     } else {
        //         this.setState({
        //             data: response['subs'],
        //         });
        //     }
        // });

    };


    render() {

        const { navigation } = this.props;
        const name = navigation.getParam("leader", "");
        const profilePicture = navigation.getParam("profilePicture", "");
        const leaderDesc = navigation.getParam("leaderDesc", "");

        return (

            <ImageBackground
                blurRadius={3}
                source={require("../assets/sport_kids_bslim.jpg")}
                style={{width: "100%", height: "100%"}}
            >

                <LinearGradient
                    colors={[
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201",
                        "#94D600",
                        "#76C201"
                    ]}
                    style={{height: Header.HEIGHT}}
                >
                    <Toolbar
                        iconSet="MaterialCommunityIcons"
                        centerElement={"Profiel"}
                        leftElement={"arrow-left"}
                        onLeftElementPress={() =>
                            this.props.navigation.dispatch(NavigationActions.back())
                        }
                    />
                </LinearGradient>

                <View style={styles.cardContainer}>
                    <View style={styles.card} elevation={5}>
                        <ScrollView
                            style={{
                                height: Dimensions.get("window").height - 160,
                                borderRadius: 10,
                                width: Dimensions.get("window").width - 50
                            }}>

                            <View

                             >

                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        margin: 10
                                    }}
                                >
                                    <Image

                                        source={{ uri: profilePicture }}
                                        resizeMode="cover"
                                        style={{ width: 50, height: 50, borderRadius: 10 }}

                                    />

                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 18,
                                            color: "black"
                                        }}
                                    >
                                        {capitalize.words(name)}
                                    </Text>
                                </View>


                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "column",
                                        marginLeft: 10
                                    }}
                                >

                                    <Text style={{ fontSize: 14, color: "black" }}>
                                        {leaderDesc}

                                    </Text>
                                </View>
                            </View>


                        </ScrollView>
                    </View>
                </View>


            </ImageBackground>
         );
    }
}


const styles = StyleSheet.create({

    cardContainer: {
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


export default ProfilePage;