import React, {Component} from "react";

import {
    Dimensions,
    Image,
    ImageBackground,
    ListView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import {Header, NavigationActions} from "react-navigation";
import {Toolbar} from "react-native-material-ui";
import LinearGradient from "react-native-linear-gradient";
import Api from "../config/api";
import LocalStorage from "../config/localStorage";
import { ListItem } from 'react-native-elements'
import HTML from "react-native-render-html";
import { PacmanIndicator } from "react-native-indicators";

var capitalize = require("capitalize");


export default class signInView extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            loading: true,
            empty: true
        }

        let localStorage = LocalStorage.getInstance();
        localStorage.retrieveItem("userId").then(id => {
            let api = Api.getInstance();
            api.callApi("api/getAllSubs", "POST", {'id': id}, response => {
                if (response["responseCode"] != 503) {
                    if (response["responseCode"] == 200) {
                        this.setState({
                            data: response['subs'],
                            loading: false,
                            empty: false
                        });
                    }
                } else {
                    this.setState({
                        data: response['subs'],
                        loading: false
                    });
                }
            });
        }).catch(error => {
            //this callback is executed when your Promise is rejected
            console.log("Promise is rejected with error: " + error);
        });
    }
    render() {
        const Entities = require("html-entities").AllHtmlEntities;
        const entities = new Entities();
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
                        centerElement={"Aanmeldingen"}
                        leftElement={"arrow-left"}
                        onLeftElementPress={() =>
                            this.props.navigation.dispatch(NavigationActions.back())
                        }
                    />
                </LinearGradient>

                <View style={styles.cardContainer}>
                    {!this.state.loading && !this.state.empty &&(
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => "" + item.id}
                        renderItem={({item}) =>  (
                            <ListItem
                                title={<Text>{item.name}</Text>}
                                onPress = {() =>
                                    this.props.navigation.navigate("EventDetail", {
                                        title: capitalize.words(
                                            entities.decode(item.name.toString().replace(", ,", " "))
                                            ),
                                        subscribed: true,
                                        id: item.id,
                                        profilePicture: item.photo[0],
                                        content: item.desc,
                                        start: item.begin + " " + item.beginMonth + " 2018",
                                        startTime: item.beginTime,
                                        end: item.end + " " + item.endMonth + " 2018",
                                        endTime: item.endTime,
                                        created: item.created,
                                        author: capitalize.words(entities.decode(item.leader.replace(", ,", " "))
                                        ),
                                        link: item.link,
                                        img: item.img,
                                        qr_code: item.qrCode,
                                        location: item.location,
                                        participants: item.participants
                                })
                                }

                            />

                        )}

                    />)}
                    {!this.state.loading && this.state.empty && (
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text style={{
                                margin: 15,
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "black"
                                }}>
                                    Je hebt geen aanmeldingen!
                            </Text>
                        </View>
                    )}
                    {this.state.loading && (
                        <PacmanIndicator color="#94D600" />
                    )}
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    rowFront: {
        alignItems: "center",
        backgroundColor: "#b0bec5",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        justifyContent: "center",
        height: 50
    },
    cardContainer: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        paddingBottom: 150
    },

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 5,
    },

});

